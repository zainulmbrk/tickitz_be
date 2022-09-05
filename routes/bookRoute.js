const express = require('express')
const {
  getAllBook,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require('../controller/bookController')
const router = express.Router()
const uploads = require('../helper/multer')
const verifyAuth = require('../helper/verifyAuth')

router.get('/', getAllBook)
router.get('/:book_id', getBookById)
router.post('/', addNewBook)
router.patch('/:book_id', updateBook)
router.delete('/:book_id', deleteBook)

module.exports = router
