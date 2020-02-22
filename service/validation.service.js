const Joi = require('joi')

function validateRequest (event, schema) {
  return (Joi.validate(event, schema))
}

exports.validate = validateRequest
