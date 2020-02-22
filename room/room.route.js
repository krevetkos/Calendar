const express = require('express')
const router = express.Router()
const roomController = require('./room.controller')
const { tokenValidation } = require('../middleware/tokenValidation')

router.post('/', tokenValidation, roomController.createRoom)
router.put('/:id', tokenValidation, roomController.updateRoom)
router.get('/', tokenValidation, roomController.getRooms)
router.delete('/:id', tokenValidation, roomController.deleteRoom)

module.exports = router
