const { RoomSchema } = require('./room.model')
const { isRoomExist, roomCreateValidation, roomUpdateValidation } = require('./room.validation.service')

async function createRooms (body, ownerId) {
  await roomCreateValidation(body, ownerId)
  return RoomSchema.create(body)
}
async function updateRooms (body, id) {
  await roomUpdateValidation(body, id)
  return RoomSchema.update({ _id: id }, { ...body })
}
async function getRoom () {
  return RoomSchema.find()
}
async function deleteRooms (id) {
  await isRoomExist(id)
  return RoomSchema.deleteOne({ _id: id })
}

exports.createRooms = createRooms
exports.updateRooms = updateRooms
exports.getRoom = getRoom
exports.deleteRooms = deleteRooms
