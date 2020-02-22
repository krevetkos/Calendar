const config = require('config')
const jwt = require('jsonwebtoken')
const { customError } = require('../utility/customErrors')
const { generateAccessToken } = require('../utility/token.controller')
async function tokenValidation (req, res, next) {
  try {
    const access = req.headers.access
    const refresh = req.headers.refresh
    if (!access) throw customError.unauthorized('Unauthorized')
    await jwt.verify(access, config.get('access'),
      async function (err) {
        if (err) {
          if (err.message === 'jwt expired') {
            if (!refresh) throw customError.unauthorized('Unauthorized')
            await jwt.verify(refresh, config.get('refresh'),
              function (err) {
                try {
                  if (err) throw customError.forbidden('Access denied.')
                  const jwtDecode = jwt.decode(refresh)
                  res.set({ accessToken: generateAccessToken(jwtDecode) })
                  next()
                } catch (e) {
                  next(e)
                }
              })
          } else {
            throw customError.forbidden('Access denied')
          }
        } else {
          next()
        }
      })
  } catch (e) {
    next(e)
  }
}

exports.tokenValidation = tokenValidation
