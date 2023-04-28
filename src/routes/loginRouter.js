const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')
router.get('/logout', loginController.handleLogout)
router.get('/login', loginController.login)
router.post('/login',loginController.handleLogin)
router.get('/register',loginController.register)
router.post('/register',loginController.handleRegister)
module.exports = router