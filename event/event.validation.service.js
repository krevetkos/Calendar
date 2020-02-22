const { EventSchema, schemaJoiEvent } = require('./event.model')
const { RoomSchema } = require('../room/room.model')
const { validate } = require('../service/validation.service')
const { customError } = require('../utility/customErrors')
const { listEvents } = require('../google-events/index')

async function isRoomExist (roomId) {
  const room = await RoomSchema.findOne({ _id: roomId })
  if (!room) throw customError.notFound('Room Not Found')
}
async function eventCreateValidation (body) {
  const { error } = validate(body, schemaJoiEvent)
  if (error) throw customError.badRequest('Bad Request')
  await isRoomExist(body.room)
}
async function isParamsValid (id) {
  if (id.length !== 24) throw customError.notFound('Event Not Found')
}
async function isEventExist (id) {
  await isParamsValid(id)
  const event = await EventSchema.findOne({ _id: id })
  if (!event) throw customError.notFound('Event Not Found')
}
async function eventUpdateValidation (body, id) {
  await isEventExist(id)
  const { error } = validate(body, schemaJoiEvent)
  if (error) throw customError.badRequest('Bad Request')
  await isRoomExist(body.room)
}
async function findFreeTime (body, google) {
  if (!google.length) {
    return body
  }
  for (let i = 0; i < google.length; i++) {
    if ((Date.parse(google[i].end) <= Date.parse(body.start)) || (google[i].googleId === body.googleId)) {
      if (!google[i + 1]) {
        return body
      } else {
        if (Date.parse(google[i + 1].start) >= Date.parse(body.end)) {
          return body
        }
      }
    }
    if (Date.parse(google[0].start) >= Date.parse(body.end)) {
      return body
    }
  }
}
async function compareWithGoogle (body) {
  const room = await RoomSchema.findOne({ _id: body.room })
  const google = await listEvents(room.calendarId)
  const freeTime = await findFreeTime(body, google)
  if (!freeTime) throw customError.badRequest('No free time')
}

exports.eventCreateValidation = eventCreateValidation
exports.isEventExist = isEventExist
exports.eventUpdateValidation = eventUpdateValidation
exports.compareWithGoogle = compareWithGoogle
