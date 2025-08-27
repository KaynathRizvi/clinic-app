const express = require("express");
const User = require("../models/UserModel");
const authMiddleware = require("../middleware/auth"); // JWT auth
const router = express.Router();

// GET /api/doctors - return all doctors
router.get("/", authMiddleware, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }, "_id name email");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
