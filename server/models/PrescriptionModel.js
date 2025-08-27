const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);