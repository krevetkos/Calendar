const { RoomSchema } = require('./room.model')
const { calendarList } = require('../google-events/index')
const { deleteRoomFirebase, updateRoomFirebase, createRoomFirebase } = require('../utility/fireBase')

async function updateRoomsWithGoogle (google, mongo, body) {
  if (google.length !== mongo.length) {
    return
  }
  for (let i = 0; i < google.length; i++) {
    const exist = mongo.find(e => e.calendarId === google[i].calendarId)
    if (exist) {
      if (google[i].name !== exist.name || google[i].color !== exist.color) {
        await RoomSchema.updateOne({ _id: exist._id }, { ...google[i] })
        const room = RoomSchema.findOne({ name: google[i].name })
        await updateRoomFirebase(room, body)
      }
    } else { return }
  }
}

async function syncGoogleRooms (body) {
  const googleRooms = await calendarList()
  const mongoRooms = await RoomSchema.find()
  await updateRoomsWithGoogle(googleRooms, mongoRooms, body)
  if (googleRooms.length >= mongoRooms.length) {
    for (let i = 0; i < googleRooms.length; i++) {
      const room = mongoRooms.find(e => e.calendarId === googleRooms[i].calendarId)
      if (!room) {
        googleRooms[i].owner = body.owner
        await RoomSchema.create(googleRooms[i])
        await createRoomFirebase(googleRooms[i], body)
      }
    }
  } else {
    for (let i = 0; i < mongoRooms.length; i++) {
      const exist = googleRooms.find(e => e.calendarId === mongoRooms[i].calendarId)
      if (!exist) {
        await deleteRoomFirebase(mongoRooms[i])
        await RoomSchema.deleteOne({ _id: mongoRooms[i]._id })
      }
    }
  }
}

exports.syncGoogleRooms = syncGoogleRooms
