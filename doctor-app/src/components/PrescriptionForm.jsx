import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import "../styles/PrescriptionStyle.css";

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

  const [showModal, setShowModal] = useState(false);

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

  const removeMedicine = (index) => {
    const newMeds = prescription.medicines.filter((_, i) => i !== index);
    setPrescription({ ...prescription, medicines: newMeds });
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

      // Show modal instead of alert
      setShowModal(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
      window.alert("Failed to save prescription");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/doctor-appointments");
  };

  return (
    <div className="prescription-wrapper">
      <h2>Prescription for {appointment.patient?.name}</h2>
      <form className="prescription-form" onSubmit={submitPrescription}>
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

        <div className="medicine-container">
          <label>Medicines:</label>
          {prescription.medicines.map((med, idx) => (
            <div className="medicine-row" key={idx}>
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
              {idx > 0 && (
                <button
                  type="button"
                  className="remove-medicine-btn"
                  onClick={() => removeMedicine(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-medicine-btn"
            onClick={addMedicine}
          >
            Add Medicine
          </button>
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            value={prescription.notes}
            onChange={(e) => handleChange(e, null, "notes")}
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Prescription
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Prescription saved successfully!</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
