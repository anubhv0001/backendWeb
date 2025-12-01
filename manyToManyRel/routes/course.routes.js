const express = require("express");
const router = express.Router();
const {
  createCourse,
  deleteCourse,
  getCourseStudents
} = require("../controllers/course.controller");

router.post("/", createCourse);
router.delete("/:id", deleteCourse);
router.get("/:id/students", getCourseStudents);

module.exports = router;
