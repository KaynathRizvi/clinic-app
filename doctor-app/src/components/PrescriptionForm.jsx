import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";

export default function Prescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};
  const token = localStorage.getItem("token");

  const [prescription, setPrescription] = useState({
    symptoms: "",
    diagnosis: "",
    medicines: [{ name: "", dosage: "", duration: "" }],
    notes: "",
  });

  if (!appointment) return <p>No appointment selected!</p>;

  const handleChange = (e, index, field) => {
    if (field === "medicines") {
      const newMeds = [...prescription.medicines];
      newMeds[index][e.target.name] = e.target.value;
      setPrescription({ ...prescription, medicines: newMeds });
    } else {
      setPrescription({ ...prescription, [field]: e.target.value });
    }
  };

  const addMedicine = () => {
    setPrescription({
      ...prescription,
      medicines: [...prescription.medicines, { name: "", dosage: "", duration: "" }],
    });
  };

  const submitPrescription = async (e) => {
  e.preventDefault();
  try {
    const validMedicines = prescription.medicines.filter(
      (med) => med.name && med.dosage && med.duration
    );

    await axios.post(
      `${SERVER_URL}/api/prescriptions`,
      {
        appointmentId: appointment._id,
        doctorId: appointment.doctor?._id,
        patientId: appointment.patient?._id,
        symptoms: prescription.symptoms,
        diagnosis: prescription.diagnosis,
        medicines: validMedicines,
        notes: prescription.notes,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await axios.put(
      `${SERVER_URL}/api/appointment/status/${appointment._id}`,
      { status: "Completed" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    window.alert("Prescription saved and appointment marked as Completed!");
    navigate("/doctor-appointments");

  } catch (err) {
    console.error(err.response?.data || err.message);
    window.alert("Failed to save prescription");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Prescription for {appointment.patient?.name}</h2>
      <form onSubmit={submitPrescription}>
        <div>
          <label>Symptoms:</label>
          <textarea
            value={prescription.symptoms}
            onChange={(e) => handleChange(e, null, "symptoms")}
            required
          />
        </div>

        <div>
          <label>Diagnosis:</label>
          <textarea
            value={prescription.diagnosis}
            onChange={(e) => handleChange(e, null, "diagnosis")}
            required
          />
        </div>

        <div>
          <label>Medicines:</label>
          {prescription.medicines.map((med, idx) => (
            <div key={idx}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={med.name}
                onChange={(e) => handleChange(e, idx, "medicines")}
                required
              />
              <input
                type="text"
                name="dosage"
                placeholder="Dosage"
                value={med.dosage}
                onChange={(e) => handleChange(e, idx, "medicines")}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={med.duration}
                onChange={(e) => handleChange(e, idx, "medicines")}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addMedicine}>Add Medicine</button>
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            value={prescription.notes}
            onChange={(e) => handleChange(e, null, "notes")}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Save Prescription</button>
      </form>
    </div>
  );
}