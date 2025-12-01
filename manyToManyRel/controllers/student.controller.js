const Student = require("../models/student.model");
const Enrollment = require("../models/enrollment.model");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndUpdate(id, { isActive: false });

    
    await Enrollment.updateMany(
      { studentId: id },
      { isActive: false }
    );

    res.json({ success: true, message: "Student deleted & enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getStudentCourses = async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await Enrollment.find({
      studentId: id,
      isActive: true
    }).populate({
      path: "courseId",
      match: { isActive: true }
    });

    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
