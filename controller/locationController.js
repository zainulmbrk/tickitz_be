const Location = require('../model/Location')

module.exports = {
  addCity: async (req, res) => {
    try {
      const results = await Location.add(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  getCity: async (req, res) => {
    try {
      const results = await Location.get(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  getCityById: async (req, res) => {
    try {
      const results = await Location.getById(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
}
