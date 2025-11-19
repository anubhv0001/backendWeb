const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

const roleCheck = require("../middlewares/roleCheckMiddleware");

// Everyone (admin + hr)
router.get("/", roleCheck(["admin", "hr"]), getAllEmployees);

// Admin only
router.post("/", roleCheck(["admin"]), addEmployee);

// Admin + HR
router.put("/:id", roleCheck(["admin", "hr"]), updateEmployee);

// Admin only
router.delete("/:id", roleCheck(["admin"]), deleteEmployee);

module.exports = router;
