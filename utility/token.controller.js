const config = require('config')
const jwt = require('jsonwebtoken')

function generateAccessToken (owner) {
  return jwt.sign(owner, config.get('access'), { expiresIn: '7d' })
}
function generateRefreshToken (owner) {
  return jwt.sign(owner, config.get('refresh'))
}

exports.generateAccessToken = generateAccessToken
exports.generateRefreshToken = generateRefreshToken
