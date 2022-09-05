const Genres = require("../model/Genres");

module.exports = {
  addGenres: async (req, res) => {
    try {
      const results = await Genres.add(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getGenres: async (req, res) => {
    try {
      const results = await Genres.get(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateGenres: async (req, res) => {
    try {
      const results = await Genres.update(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteGenres: async (req, res) => {
    try {
      const results = await Genres.remove(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
