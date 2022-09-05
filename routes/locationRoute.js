const express = require('express')

const {
  addCity,
  getCity,
  getCityById,
} = require('../controller/locationController')

const router = express.Router()

router.get('/', getCity)
router.get('/:location_id', getCityById)
router.post('/', addCity)

module.exports = router
