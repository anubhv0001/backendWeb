const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !student.isActive)
      return res.status(400).json({ error: "Student not active" });

    if (!course || !course.isActive)
      return res.status(400).json({ error: "Course not active" });

    const enrollment = await Enrollment.create({ studentId, courseId });

    res.status(201).json({ success: true, enrollment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
