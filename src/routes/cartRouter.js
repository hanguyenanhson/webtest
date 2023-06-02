const cartController = require('../controller/cartController')
const express = require('express')
const router = express.Router()
router.post('/cart/:_id',cartController.addToCart)
 router.get('/cart', cartController.getCart)
 router.delete('/cart/:_id/delete',cartController.deleteFromCart)
module.exports = router