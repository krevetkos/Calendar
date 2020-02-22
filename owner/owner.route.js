const express = require('express')
const router = express.Router()
const ownerController = require('./owner.controller')
router.post('/login', ownerController.loginOwner)
router.post('/refresh', ownerController.refresh)
router.post('/create', ownerController.createOwner)
module.exports = router
