 const express = require('express')
 const router = express.Router()
 const newsController = require('../controller/newsController')

 router.put('/update', newsController.update)
 router.get('/news',newsController.index)
 router.get('/',newsController.post)
 router.get('/female',newsController.getByGender)
 router.get('/:_id',newsController.getItems)
 
 module.exports = router