const { loginOwners, refreshToken, createNewOwner } = require('./owner.service')
module.exports = { loginOwner, refresh, createOwner }

async function loginOwner (req, res, next) {
  try {
    res.json(await loginOwners(req.body))
  } catch (e) {
    next(e)
  }
}
async function refresh (req, res, next) {
  try {
    res.json(await refreshToken(req.body.token))
  } catch (e) {
    next(e)
  }
}

async function createOwner (req, res, next) {
  try {
    res.json(await createNewOwner(req.body))
  } catch (e) {
    next(e)
  }
}
