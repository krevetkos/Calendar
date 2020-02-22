const express = require('express')
const router = express.Router()
const { tokenValidation } = require('../middleware/tokenValidation')
const eventController = require('./event.controller')

router.post('/', tokenValidation, eventController.createEvent)
router.delete('/:id', tokenValidation, eventController.deleteEvent)
router.put('/:id', tokenValidation, eventController.updateEvent)
router.get('/', tokenValidation, eventController.getEvents)
router.post('/sync', tokenValidation, eventController.syncGoogle)

module.exports = router
