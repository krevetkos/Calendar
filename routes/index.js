const ownerRoutes = require('../owner/owner.route')
const eventRoutes = require('../event/event.route')
const roomRoutes = require('../room/room.route')
const express = require('express')
const router = express.Router()
router.use('/owner', ownerRoutes)
router.use('/event', eventRoutes)
router.use('/room', roomRoutes)

module.exports = router
