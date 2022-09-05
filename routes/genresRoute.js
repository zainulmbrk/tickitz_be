const express = require("express");

const {
  addGenres,
  getGenres,
  updateGenres,
  deleteGenres,
} = require("../controller/genresController");

const router = express.Router();

router.get("/", getGenres);
router.post("/", addGenres);
router.patch("/:genre_id", updateGenres);
router.delete("/:genre_id", deleteGenres);

module.exports = router;
