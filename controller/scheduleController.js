const Schedule = require("../model/Schedule");

module.exports = {
  getAllSchedule: async (req, res) => {
    try {
      const results = await Schedule.get(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  createSchedule: async (req, res) => {
    try {
      const results = await Schedule.createNewSchedule(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getScheduleById: async (req, res) => {
    try {
      const results = await Schedule.getById(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  addNewSchedule: async (req, res) => {
    try {
      const results = await Schedule.createNewSchedule(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const results = await Schedule.update(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const results = await Schedule.remove(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
