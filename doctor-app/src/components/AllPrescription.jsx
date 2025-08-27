// src/components/AllPrescription.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";

export default function AllPrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/prescriptions/doctor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert(err.response?.data?.msg || "Could not fetch prescriptions");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token]);

  if (loading) return <p>Loading prescriptions...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        prescriptions.map((presc) => (
          <div
            key={presc._id}
            style={{
              padding: "15px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p><strong>Patient:</strong> {presc.patientId?.name || "N/A"}</p>
            <p><strong>Doctor:</strong> {presc.doctorId?.name || "N/A"}</p>
            <p><strong>Symptoms:</strong> {presc.symptoms}</p>
            <p><strong>Diagnosis:</strong> {presc.diagnosis}</p>
            <p><strong>Notes:</strong> {presc.notes}</p>
            <p><strong>Medicines:</strong></p>
            <ul>
              {presc.medicines.map((med, idx) => (
                <li key={idx}>{med.name} — {med.dosage} — {med.duration}</li>
              ))}
            </ul>
            <p><strong>Date:</strong> {new Date(presc.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
