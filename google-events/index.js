const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const config = require('config')
const credentials = config.get('google.installed')
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const token = require('./token')
const TOKEN_PATH = 'token.json'
const { getRoom } = require('../room/room.service')

if (!credentials) console.log('Error loading client secret file')
function authorize () {
  const { clientSecret, clientId, redirectUris } = credentials
  let oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0])
  if (!token) {
    oAuth2Client = getAccessToken(oAuth2Client)
    return oAuth2Client
  }
  oAuth2Client.setCredentials(token)
  return oAuth2Client
}

function getAccessToken (oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      return oAuth2Client
    })
  })
};

async function calendarList () {
  const auth = authorize()
  const calendar = google.calendar({ version: 'v3', auth })
  const getCalendars = async function () {
    const calList = await calendar.calendarList.list({})
    return calList.data.items.map(e => {
      return {
        name: e.summaryOverride || e.summary,
        calendarId: e.id,
        color: e.backgroundColor
      }
    })
  }
  const calendarAll = await getCalendars()
  return calendarAll
}
async function calendarMembers (members) {
  const validMembers = []
  if (members) {
    const rooms = await getRoom()
    for (let i = 0; i < members.length; i++) {
      if (members[i].email) {
        const valid = rooms.find(e => e.calendarId.toString() === members[i].email.toString())
        if (!valid) {
          validMembers.push(members[i])
        }
      }
    }
  }
  return validMembers
}

async function listEvents (roomCalendarId = 0) {
  const auth = authorize()
  const listEvent = async (eventId) => {
    const calendar = google.calendar({ version: 'v3', auth })
    const cal = await calendar.events.list({
      calendarId: eventId,
      timeMin: (new Date(new Date() - (1000 * 60 * 60 * 24))).toISOString(),
      maxResults: 1000,
      singleEvents: true,
      orderBy: 'startTime'
    })
    return cal.data.items
  }
  const listAllEvents = []
  if (!roomCalendarId) {
    const listCalendar = await calendarList()
    for (let i = 0; i < listCalendar.length; i++) {
      const calendar = await listEvent(listCalendar[i].calendarId)
      listAllEvents.push(...calendar)
    }
  } else {
    const calendar = await listEvent(roomCalendarId)
    listAllEvents.push(...calendar)
  }
  return listAllEvents.map((event) => {
    return {
      googleId: event.id,
      title: event.summary || '',
      message: event.description || '',
      room: event.location,
      start: event.start.dateTime,
      end: event.end.dateTime,
      members: event.attendees || [],
      updated: event.updated
    }
  })
};

async function insertEvents (body, calendarId) {
  const auth = authorize()
  const calendar = google.calendar({ version: 'v3', auth })
  const attendees = await calendarMembers(body.members)
  const event = {
    summary: body.title,
    description: body.message,
    start: { dateTime: body.start },
    end: { dateTime: body.end },
    attendees: attendees
  }

  const insertedData = async () => {
    const data = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event
    }
    )
    return data
  }
  const data = await insertedData()
  const { id, updated } = data.data
  return { id, updated }
};

async function updateEvents (body, googleId, calendarId) {
  const auth = authorize()
  const calendar = google.calendar({ version: 'v3', auth })
  const attendees = await calendarMembers(body.members)
  const event = {
    summary: body.title,
    description: body.message,
    start: { dateTime: body.start },
    end: { dateTime: body.end },
    attendees: attendees
  }
  const updateData = async () => {
    const data = await calendar.events.update({
      auth: auth,
      calendarId: calendarId,
      eventId: googleId,
      resource: event
    })
    return data
  }
  const data = await updateData()
  return data.data.updated
}

async function deleteEvent (eventId, calendarId) {
  const auth = authorize()
  const calendar = google.calendar({ version: 'v3', auth })
  calendar.events.delete({
    auth: auth,
    calendarId: calendarId,
    eventId: eventId
  }, (err) => {
    if (err) return console.log(err)
  })
}

exports.calendarList = calendarList
exports.authorize = authorize
exports.updateGoogleEvents = updateEvents
exports.deleteEvent = deleteEvent
exports.insertEvents = insertEvents
exports.listEvents = listEvents
