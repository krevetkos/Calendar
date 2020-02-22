const { createRooms, updateRooms, getRoom, deleteRooms } = require('./room.service')
module.exports = { createRoom, updateRoom, getRooms, deleteRoom }

async function createRoom (req, res, next) {
  try {
    res.json(await createRooms(req.body, req.body.owner))
  } catch (e) {
    next(e)
  }
}

async function updateRoom (req, res, next) {
  try {
    res.json(await updateRooms(req.body, req.params.id))
  } catch (e) {
    next(e)
  }
}

async function getRooms (req, res, next) {
  try {
    res.json(await getRoom())
  } catch (e) {
    next(e)
  }
}

async function deleteRoom (req, res, next) {
  try {
    res.json(await deleteRooms(req.params.id))
  } catch (e) {
    next(e)
  }
}
