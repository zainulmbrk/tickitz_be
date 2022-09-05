const express = require('express')

const {
  addTimes,
  getTimes,
  updateTimes,
  deleteTimes,
} = require('../controller/showTimeController')

const router = express.Router()

router.get('/', getTimes)
router.post('/', addTimes)
router.patch('/', updateTimes)
router.delete('/:time_id', deleteTimes)

module.exports = router
