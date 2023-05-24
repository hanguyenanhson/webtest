const cartController = require('../controller/cartController')
const express = require('express')
const router = express.Router()
router.post('/cart/:_id',cartController.addToCart)
module.exports = router