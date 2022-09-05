const express = require("express");
const {
  getAllSchedule,
  getScheduleById,
  createSchedule,
  addNewSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controller/scheduleController");
const router = express.Router();

router.get("/", getAllSchedule);
router.get("/:schedule_id", getScheduleById);
router.post("/", createSchedule);
router.post("/", addNewSchedule);
router.patch("/:schedule_id", updateSchedule);
router.delete("/:schedule_id", deleteSchedule);

module.exports = router;
