const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
  name: { type: String, minlength: 4, maxlength: 50, required: true },
  mail: { type: String, minlength: 4, required: true },
  pass: { type: String, minlength: 8, maxlength: 200, required: true }
})

const schema = {
  name: Joi.string().min(4).max(50).required(),
  mail: Joi.string().min(4).email().required(),
  pass: Joi.string().min(8).max(200).required()
}

exports.schemaJoiOwner = schema
exports.OwnerSchema = mongoose.model('Owner', OwnerSchema)
