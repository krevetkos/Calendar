const { EventSchema } = require('./event.model')
const { RoomSchema } = require('../room/room.model')
const { deleteEvent, insertEvents, listEvents, updateGoogleEvents } = require('../google-events/index')
const { createEventFirebase, updateEventFirebase, deleteEventFirebase } = require('../utility/fireBase')
const { eventCreateValidation, eventUpdateValidation, compareWithGoogle, isEventExist } = require('./event.validation.service')
const { createEventSentMail, updateEventSentMail, deleteEventSentMail } = require('./event.mail.service')

async function createEventsAfterValidation (body) {
  const room = await RoomSchema.findOne({ _id: body.room })
  const calendarId = room.calendarId
  const { id, updated } = await insertEvents(body, calendarId)
  body.googleId = id
  body.updated = updated
  const event = await EventSchema.create(body)
  await createEventFirebase(body)
  createEventSentMail(event, room.name)
  return event
}
async function createEvents (body) {
  await eventCreateValidation(body)
  await compareWithGoogle(body)
  return createEventsAfterValidation(body)
}

async function updateEvents (body, id) {
  await eventUpdateValidation(body, id)
  const event = await EventSchema.findOne({ _id: id })
  const room = await RoomSchema.findOne({ _id: event.room })
  body.googleId = event.googleId
  await compareWithGoogle(body)
  if (event.room.toString() !== body.room.toString()) {
    await deleteEvents(id)
    return createEvents(body)
  }
  const updated = await updateGoogleEvents(body, event.googleId, room.calendarId)
  body.updated = updated
  await updateEventFirebase(body, id)
  updateEventSentMail(event, room.name)
  return EventSchema.updateOne({ _id: id }, { ...body })
}

async function getEvent () {
  return listEvents()
}

async function deleteEvents (id) {
  await isEventExist(id)
  await deleteEventFirebase(id)
  const event = await EventSchema.findOne({ _id: id })
  const room = await RoomSchema.findOne({ _id: event.room })
  await deleteEvent(event.googleId, room.calendarId)
  deleteEventSentMail(event, room.name)
  return EventSchema.deleteOne({ _id: id })
}

exports.createEventsAfterValidation = createEventsAfterValidation
exports.createEvents = createEvents
exports.updateEvents = updateEvents
exports.getEvent = getEvent
exports.deleteEvents = deleteEvents
