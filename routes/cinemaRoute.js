const express = require('express')

const {
  addCinema,
  getCinema,
  updateCinema,
  deleteCinema,
} = require('../controller/cinemaController')
const uploads = require('../helper/multer')
const verifyAuth = require('../helper/verifyAuth')

const router = express.Router()

router.get('/', getCinema)
router.post('/', verifyAuth.verifyAuthAdmin, uploads, addCinema)
router.patch('/:cinema_id', verifyAuth.verifyAuthAdmin, uploads, updateCinema)
router.delete('/:cinema_id', verifyAuth.verifyAuthAdmin, deleteCinema)

module.exports = router
