const Cinema = require('../model/Cinema')
const fs = require('fs')
module.exports = {
  addCinema: async (req, res) => {
    try {
      const reqModifer = {
        ...req,
        body: { ...req.body, image: req.filename },
      }
      const results = await Cinema.add(reqModifer, res)
      return res.status(201).send(results)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  },
  getCinema: async (req, res) => {
    try {
      const results = await Cinema.get(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  updateCinema: async (req, res) => {
    try {
      if (req.file) {
        reqModifer = {
          ...req,
          body: { ...req.body, image: req.file.filename },
        }
      } else {
        reqModifer = {
          ...req,
          body: { ...req.body },
        }
      }
      const results = await Cinema.update(reqModifer, res)
      return res.status(201).send(results)
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  },

  deleteCinema: async (req, res) => {
    try {
      const results = await Cinema.remove(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
}
