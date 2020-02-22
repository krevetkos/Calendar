const admin = require('firebase-admin')
const config = require('config')
const { EventSchema } = require('../event/event.model')
const { OwnerSchema } = require('../owner/owner.model')
const { RoomSchema } = require('../room/room.model')

admin.initializeApp({
  credential: admin.credential.cert(config.get('fireBase')),
  databaseURL: 'https://test-firebase-63c1c.firebaseio.com'
})
const db = admin.database()

async function createEventFirebase (body) {
  const room = await RoomSchema.findOne({ _id: body.room })
  const owner = await OwnerSchema.findOne({ _id: room.owner })
  const event = await EventSchema.findOne({ googleId: body.googleId })
  body.id = event._id.toString()
  body.roomName = room.name
  db.ref(`tm-calendar/${owner.name}/events`).child(event._id.toString()).set({ ...body })
}
async function updateEventFirebase (body, id) {
  const event = await EventSchema.findOne({ _id: id })
  const room = await RoomSchema.findOne({ _id: event.room })
  const owner = await OwnerSchema.findOne({ _id: room.owner })
  body.roomName = room.name
  db.ref(`tm-calendar/${owner.name}/events`).child(id.toString()).update({ ...body })
}
async function deleteEventFirebase (id) {
  const event = await EventSchema.findOne({ _id: id })
  const room = await RoomSchema.findOne({ _id: event.room })
  const owner = await OwnerSchema.findOne({ _id: room.owner })
  db.ref(`tm-calendar/${owner.name}/events/${id.toString()}`).remove()
}
async function createRoomFirebase (rooms, body) {
  const owner = await OwnerSchema.findOne({ _id: body.owner })
  const room = await RoomSchema.findOne({ name: rooms.name })
  db.ref(`tm-calendar/${owner.name}/rooms`).child(room._id.toString()).set({ name: room.name, color: room.color, id: room._id.toString() })
}
async function updateRoomFirebase (room, body) {
  const owner = await OwnerSchema.findOne({ _id: body.owner })
  db.ref(`tm-calendar/${owner.name}`).child(room._id.toString()).update({ name: room.name, color: room.color })
}
async function deleteRoomFirebase (room) {
  const owner = await OwnerSchema.findOne({ _id: room.owner })
  db.ref(`${owner.name}/${room._id}`).remove()
}

exports.updateRoomFirebase = updateRoomFirebase
exports.createRoomFirebase = createRoomFirebase
exports.deleteRoomFirebase = deleteRoomFirebase
exports.createEventFirebase = createEventFirebase
exports.updateEventFirebase = updateEventFirebase
exports.deleteEventFirebase = deleteEventFirebase
