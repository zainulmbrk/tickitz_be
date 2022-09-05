const showTime = require('../model/showTime')

module.exports = {
  addTimes: async (req, res) => {
    try {
      const results = await showTime.createNewTime(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  getTimes: async (req, res) => {
    try {
      const results = await showTime.get(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  updateTimes: async (req, res) => {
    try {
      const results = await showTime.update(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  deleteTimes: async (req, res) => {
    try {
      const results = await showTime.remove(req, res)
      res.status(201).send(results)
    } catch (error) {
      res.status(400).send(error)
    }
  },
}
