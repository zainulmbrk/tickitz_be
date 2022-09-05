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
router.post('/', verifyAuth, uploads.single('image'), addCinema)
router.patch('/:cinema_id', verifyAuth, uploads.single('image'), updateCinema)
router.delete('/:cinema_id', verifyAuth, deleteCinema)

module.exports = router
