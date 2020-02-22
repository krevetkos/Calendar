const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const { RoomSchema, schemaJoiRoom } = require('./room.model')
const { OwnerSchema } = require('../owner/owner.model')
const { validate } = require('../service/validation.service')
const { customError } = require('../utility/customErrors')

async function isOwnerExist (ownerId) {
  const owner = await OwnerSchema.findOne({ _id: ObjectId(ownerId) })
  if (!owner) throw customError.notFound('Owner Not Found')
}
async function roomCreateValidation (body, ownerId) {
  const { error } = validate(body, schemaJoiRoom)
  if (error) throw customError.badRequest('Bad Request')
  await isOwnerExist(body.owner)
}
async function isParamsValid (id) {
  if (id.length !== 24) throw customError.notFound('Room Not Found')
}
async function isRoomExist (id) {
  await isParamsValid(id)
  const room = await RoomSchema.findOne({ _id: id })
  if (!room) throw customError.notFound('Room Not Found')
}
async function roomUpdateValidation (body, id) {
  const { error } = validate(body, schemaJoiRoom)
  if (error) throw customError.badRequest('Bad Request')
  await isRoomExist(id)
  await isOwnerExist(body.owner)
}

exports.isRoomExist = isRoomExist
exports.roomCreateValidation = roomCreateValidation
exports.roomUpdateValidation = roomUpdateValidation
