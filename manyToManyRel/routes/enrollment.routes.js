const express = require("express");
const router = express.Router();
const { enrollStudent } = require("../controllers/enrollment.controller");

router.post("/enroll", enrollStudent);

module.exports = router;
