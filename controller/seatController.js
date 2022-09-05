const Seattype = require("../model/Seattype");

module.exports = {
  addSeat: async (req, res) => {
    try {
      const results = await Seattype.add(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getSeat: async (req, res) => {
    try {
      const results = await Seattype.get(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
