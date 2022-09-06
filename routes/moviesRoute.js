const express = require('express')
const {
  getAllMovies,
  // getAll,
  getMoviesDetails,
  addNewMovies,
  updateMovies,
  deleteMovies,
} = require('../controller/moviesController')
const uploads = require('../helper/multer')
const verifyAuth = require('../helper/verifyAuth')
const router = express.Router()

router.get('/', getAllMovies)
// router.get("/", getAll);
router.get('/:movies_id', getMoviesDetails)
router.post('/', verifyAuth.verifyAuthAdmin, uploads, addNewMovies)
router.patch('/:movies_id', verifyAuth.verifyAuthAdmin, uploads, updateMovies)
router.delete('/:movies_id', verifyAuth.verifyAuthAdmin, deleteMovies)

module.exports = router
