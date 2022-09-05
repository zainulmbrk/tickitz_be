// controller = tempat dimana kita menghubungkan antara client dan database
const Book = require("../model/Book");

module.exports = {
  getAllBook: async (req, res) => {
    try {
      const results = await Book.get(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getBookById: async (req, res) => {
    try {
      const results = await Book.getById(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addNewBook: async (req, res) => {
    try {
      const results = await Book.add(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateBook: async (req, res) => {
    try {
      const results = await Book.update(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(404).send(error);
      console.log(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const results = await Book.remove(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
