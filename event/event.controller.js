const { createEvents, updateEvents, getEvent, deleteEvents } = require('./event.service')
const { googleSync } = require('./event.googlesync.service')
module.exports = { createEvent, updateEvent, getEvents, deleteEvent, syncGoogle }

async function createEvent (req, res, next) {
  try {
    res.json(await createEvents(req.body))
  } catch (e) {
    next(e)
  }
}

async function updateEvent (req, res, next) {
  try {
    res.json(await updateEvents(req.body, req.params.id))
  } catch (e) {
    next(e)
  }
}

async function getEvents (req, res, next) {
  try {
    res.json(await getEvent())
  } catch (e) {
    next(e)
  }
}

async function deleteEvent (req, res, next) {
  try {
    res.json(await deleteEvents(req.params.id))
  } catch (e) {
    next(e)
  }
}

async function syncGoogle (req, res, next) {
  try {
    res.json(await googleSync(req.body))
  } catch (e) {
    next(e)
  }
}
