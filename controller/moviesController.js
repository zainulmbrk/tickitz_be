// controller = tempat dimana kita menghubungkan antara client dan database
const Movies = require('../model/Movies')
const fs = require('fs')

module.exports = {
  getAllMovies: async (req, res, next) => {
    try {
      const results = await Movies.get(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
  getAll: async (req, res) => {
    try {
      const results = await Movies.getAll(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
  getMoviesDetails: async (req, res) => {
    try {
      const results = await Movies.getDetails(req, res)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
  addNewMovies: async (req, res) => {
    // console.log(req.file, 'filename from uploads')
    try {
      const reqModifer = {
        ...req,
        body: { ...req.body, cover: req.file.filename },
      }
      const results = await Movies.add(reqModifer, res)
      return res.status(201).send(results)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  },
  updateMovies: async (req, res) => {
    try {
      let reqModifer = {
        ...req,
      }
      if (req.file) {
        reqModifer = {
          ...req,
          body: { ...req.body, cover: req.file.filename },
        }
      }
      const results = await Movies.update(reqModifer, res)
      return res.status(201).send(results)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  },
  deleteMovies: async (req, res) => {
    try {
      const results = await Movies.remove(req, res)
      return res.status(201).send(results)
    } catch (error) {
      return res.status(400).send(error)
    }
  },
}
