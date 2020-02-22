const { EventSchema } = require('./event.model')
const { RoomSchema } = require('../room/room.model')
const { OwnerSchema } = require('../owner/owner.model')
const { listEvents, deleteEvent } = require('../google-events/index')
const { createEventFirebase, updateEventFirebase, deleteEventFirebase } = require('../utility/fireBase')
const { syncGoogleRooms } = require('../room/room.googlesync.service')
const { createEventsAfterValidation } = require('./event.service')

async function unique (google) {
  const uniqueArray = []
  for (let i = 0; i < google.length; i++) {
    const exist = uniqueArray.find(e => e.googleId === google[i].googleId)
    if (!exist) uniqueArray.push(google[i])
  }
  return uniqueArray
}
async function create (body) {
  const room = await RoomSchema.findOne({ name: body.room })
  body.room = room._id.toString()
  await EventSchema.create(body)
  await createEventFirebase(body)
}
async function deleteNotUnique (googleId, rooms) {
  const room = await RoomSchema.findOne({ name: rooms })
  return deleteEvent(googleId, room.calendarId)
}
async function createNotUnique (body, rooms) {
  const room = await RoomSchema.findOne({ name: rooms })
  body.room = room._id.toString()
  return createEventsAfterValidation(body)
}
async function splitGoogleEvent (event) {
  const rooms = event.room.split(', ')
  const { googleId, room, ...body } = event
  for (let i = 0; i < rooms.length; i++) {
    await deleteNotUnique(googleId, rooms[i])
  }
  for (let i = 0; i < rooms.length; i++) {
    await createNotUnique(body, rooms[i])
  }
}

async function syncCreateGoogleEvents (google, mongoDb) {
  const uniqueArray = await unique(google)
  for (let i = 0; i < uniqueArray.length; i++) {
    const eventCreated = mongoDb.find(e => e.googleId === uniqueArray[i].googleId)
    if (!eventCreated) {
      if (!uniqueArray[i].room) {
        await deleteEvent(uniqueArray[i].googleId, 'primary')
      } else {
        if (uniqueArray[i].room.split(', ').length === 1) {
          await create(uniqueArray[i])
        } else {
          await splitGoogleEvent(uniqueArray[i])
        }
      }
    }
  }
}
async function syncUpdateGoogleEvents (google, mongoDb) {
  const uniqueArray = await unique(google)
  for (let i = 0; i < uniqueArray.length; i++) {
    const event = mongoDb.find(e => e.googleId === uniqueArray[i].googleId)
    const eventUpdated = new Date(event.updated) - new Date(uniqueArray[i].updated)
    if (eventUpdated) {
      if (uniqueArray[i].room.split(', ').length > 1) {
        await splitGoogleEvent(uniqueArray[i])
      } else {
        const { room, ...body } = uniqueArray[i]
        const rooms = await RoomSchema.findOne({ name: room })
        body.room = rooms._id
        await EventSchema.updateOne({ googleId: uniqueArray[i].googleId }, { ...body })
        await updateEventFirebase(body, event._id)
      }
    }
  }
}
async function syncDeleteGoogleEvents (google, mongoDb) {
  if (mongoDb.length > google.length) {
    for (let i = 0; i < mongoDb.length; i++) {
      const eventDeleted = google.find(e => e.googleId === mongoDb[i].googleId)
      if (!eventDeleted) {
        await deleteEventFirebase(mongoDb[i]._id.toString())
        await EventSchema.deleteOne({ _id: mongoDb[i]._id })
      }
    }
  }
}
async function syncGoogleEvents () {
  const googleEvents = await listEvents()
  if (googleEvents) {
    const mongoDb = await EventSchema.find()
    await syncCreateGoogleEvents(googleEvents, mongoDb)
    const googleEventsUpd = await listEvents()
    const mongoDbUpd = await EventSchema.find()
    await syncUpdateGoogleEvents(googleEventsUpd, mongoDbUpd)
    await syncDeleteGoogleEvents(googleEventsUpd, mongoDbUpd)
  }
}
async function googleSync (body) {
  await syncGoogleRooms(body)
  return syncGoogleEvents()
}
(() => {
  setInterval(async function googleSync () {
    const owner = await OwnerSchema.findOne()
    if (owner) {
      syncGoogleRooms({ owner: owner._id })
      syncGoogleEvents()
    }
  }, 300000)
})()

exports.googleSync = googleSync
exports.syncGoogleEvents = syncGoogleEvents
