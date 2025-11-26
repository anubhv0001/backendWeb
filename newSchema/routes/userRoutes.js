const express = require("express");
const {
  createUser,
  addAddress,
  getSummary,
  getUserDetails,
  deleteAddress
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);
router.post("/:userId/address", addAddress);
router.get("/summary", getSummary);
router.get("/:userId", getUserDetails);
router.delete("/:userId/address/:addressId", deleteAddress);

module.exports = router;
