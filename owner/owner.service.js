const config = require('config')
const { OwnerSchema } = require('./owner.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { customError } = require('../utility/customErrors')
const { generateAccessToken, generateRefreshToken } = require('../utility/token.controller')

async function OwnerLoginValidation (body) {
  const owner = await OwnerSchema.findOne({ mail: body.mail })
  if (!owner) throw customError.badRequest('Bad Request')
  const validPassword = await bcrypt.compare(body.pass, owner.pass)
  if (!validPassword) throw customError.badRequest('Bad Request')
  return owner
}
async function tokenGenerator (owner) {
  const payload = {
    id: owner._id,
    mail: owner.mail
  }
  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)
  return { accessToken: accessToken, refreshToken: refreshToken }
}
async function loginOwners (body) {
  const owner = await OwnerLoginValidation(body)
  return tokenGenerator(owner)
}

async function createNewOwner (body) {
  const owner = await OwnerSchema.findOne({ mail: body.owner.mail })
  if (owner) throw customError.forbidden('Owner already exist!')
  if ((body.admin === config.get('admin')) && (body.pass === config.get('adminPass'))) {
    body.owner.pass = await bcrypt.hash(body.owner.pass, config.get('salt'))
    await OwnerSchema.create(body.owner)
  }
}

async function refreshValidation (token) {
  if (!token) throw customError.unauthorized('Unauthorized')
}
async function access (refreshToken) {
  const ref = await jwt.verify(refreshToken, config.get('refresh'))
  return generateAccessToken(ref)
}
async function refreshToken (token) {
  await refreshValidation(token)
  const accessToken = await access(token)
  return { accessToken: accessToken }
}

exports.createNewOwner = createNewOwner
exports.loginOwners = loginOwners
exports.refreshToken = refreshToken
