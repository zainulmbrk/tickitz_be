const express = require("express")
const authController = require('../controller/authController')
// const uploads = require('../helper/multer')

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)




module.exports = router 