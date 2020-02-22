const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema
const Types = mongoose.Types

const EventSchema = new Schema({
  googleId: { type: String, minlength: 26, maxlength: 26 },
  title: { type: String },
  message: { type: String },
  room: { type: Types.ObjectId, minlength: 24, maxlength: 24, ref: 'Room', required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  members: { type: Array },
  updated: { type: Date }
})

const schema = {
  googleId: Joi.string().min(26).max(26),
  title: Joi.string(),
  message: Joi.string(),
  room: Joi.string().min(24).max(24).required(),
  start: Joi.date().required(),
  end: Joi.date().required(),
  members: Joi.array(),
  updated: Joi.date()
}

exports.schemaJoiEvent = schema
exports.EventSchema = mongoose.model('Event', EventSchema)
