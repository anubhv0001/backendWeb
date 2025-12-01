const express = require("express");
const router = express.Router();
const {
  createStudent,
  deleteStudent,
  getStudentCourses
} = require("../controllers/student.controller");

router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.get("/:id/courses", getStudentCourses);

module.exports = router;
