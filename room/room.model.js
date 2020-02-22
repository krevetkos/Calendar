const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema
const Types = mongoose.Types

const RoomSchema = new Schema({
  calendarId: { type: String, required: true },
  name: { type: String, maxlength: 50, required: true },
  owner: { type: Types.ObjectId, ref: 'Owner', required: true },
  color: { type: String }
})

const schema = {
  calendarId: Joi.string().required(),
  name: Joi.string().max(50).required(),
  owner: Joi.string().max(24).min(24).required(),
  color: Joi.string()
}

exports.schemaJoiRoom = schema
exports.RoomSchema = mongoose.model('Room', RoomSchema)
