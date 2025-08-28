// routes/prescription.js
const express = require("express");
const mongoose = require("mongoose");
const Prescription = require("../models/PrescriptionModel");
const Appointment = require("../models/AppointmentModel");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST /api/prescriptions - create a new prescription
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, symptoms, diagnosis, medicines, notes } = req.body;

    if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ msg: "Invalid appointmentId" });
    }

    if (!symptoms || !diagnosis || !medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ msg: "Please provide symptoms, diagnosis, and medicines" });
    }

    // Find the appointment to get doctor and patient
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ msg: "Appointment not found" });

    // Ensure the logged-in user is the doctor of this appointment
    if (appointment.doctor.toString() !== req.user.id) {
      return res.status(403).json({ msg: "You are not authorized to add a prescription for this appointment" });
    }

    // Create prescription
    const prescription = new Prescription({
      appointmentId,
      doctorId: req.user.id,
      patientId: appointment.patient,
      symptoms,
      diagnosis,
      medicines,
      notes,
    });

    await prescription.save();

    // Update appointment status to Completed
    appointment.status = "Completed";
    await appointment.save();

    res.status(201).json({ msg: "Prescription created", prescription });
  } catch (err) {
    console.error("Prescription Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/doctor", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const prescriptions = await Prescription.find({ doctorId: req.user.id })
      .populate("patientId", "name email")
      .populate("doctorId", "name email")
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/prescriptions/me - fetch prescriptions for logged-in patient
router.get("/patient", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({ msg: "Access denied. Only patients can access their prescriptions." });
    }

    const prescriptions = await Prescription.find({ patientId: req.user.id })
      .populate("doctorId", "name email")
      .populate("patientId", "name email")  // populate doctor info
      .sort({ createdAt: -1 });

    res.json(prescriptions);
  } catch (err) {
    console.error("Error fetching prescriptions:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/prescriptions/:appointmentId - fetch prescription for a specific appointment
router.get("/:appointmentId", authMiddleware, async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ msg: "Invalid appointmentId" });
    }

    const prescription = await Prescription.findOne({ appointmentId })
      .populate("doctorId", "name email")
      .populate("patientId", "name email");

    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found for this appointment" });
    }

    // Ensure the logged-in user is either the patient or the doctor
    if (
      prescription.patientId._id.toString() !== req.user.id &&
      prescription.doctorId._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(prescription);
  } catch (err) {
    console.error("Error fetching prescription:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;