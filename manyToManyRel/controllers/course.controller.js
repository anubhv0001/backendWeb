const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await Course.findByIdAndUpdate(id, { isActive: false });

    
    await Enrollment.updateMany(
      { courseId: id },
      { isActive: false }
    );

    res.json({ success: true, message: "Course deleted & enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const students = await Enrollment.find({
      courseId: id,
      isActive: true
    }).populate({
      path: "studentId",
      match: { isActive: true }
    });

    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
