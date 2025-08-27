const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/AppointmentModel");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    // Validation
    if (!req.user?.id) return res.status(401).json({ msg: "User not authenticated" });
    if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId))
      return res.status(400).json({ msg: "Invalid doctorId" });
    if (!date || isNaN(new Date(date).getTime()))
      return res.status(400).json({ msg: "Invalid date" });

    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date: new Date(date),
    });

    await newAppointment.save();
    res.status(201).json({ msg: "Appointment booked", appointment: newAppointment });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/view", authMiddleware, async (req, res) => {
  try {
    // Find appointments for logged-in user
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name email") // populate doctor name and email
      .sort({ date: -1 }); // latest first

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/doctor", authMiddleware, async (req, res) => {
  try {
    // Ensure user is a doctor
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Access denied. Only doctors can view this." });
    }

    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate("patient", "name email") // Show patient name and email
      .sort({ date: -1 }); // latest first

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/appointment/status/:id
router.put("/status/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ msg: "Status is required" });

    // Find the appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ msg: "Appointment not found" });

    // Optional: Ensure only the doctor assigned can update
    if (req.user.role !== "doctor" || appointment.doctor.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ msg: "Status updated", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
