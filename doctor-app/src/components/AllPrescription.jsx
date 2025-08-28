import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import "../styles/AllPrescriptionStyle.css";

export default function AllPrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null); // which dropdown is open
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
    <div className="prescriptions-wrapper">
      <h2>All Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        prescriptions.map((presc, idx) => (
          <div className="prescription-card" key={presc._id}>
            <div
              className="prescription-header"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>{presc.patientId?.name || "N/A"}</span>
              <span>{new Date(presc.createdAt).toLocaleDateString()}</span>
            </div>
            {openIndex === idx && (
              <div className="prescription-content">
                <p><strong>Doctor:</strong> {presc.doctorId?.name || "N/A"}</p>
                <p><strong>Symptoms:</strong> {presc.symptoms}</p>
                <p><strong>Diagnosis:</strong> {presc.diagnosis}</p>
                <p><strong>Notes:</strong> {presc.notes}</p>
                <p><strong>Medicines:</strong></p>
                <ul>
                  {presc.medicines.map((med, i) => (
                    <li key={i}>{med.name} — {med.dosage} — {med.duration}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
