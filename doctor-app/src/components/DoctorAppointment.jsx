import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import "../styles/DoctorAppointmentStyle.css";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // track which card is open
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      if (!token) return;

      const res = await axios.get(`${SERVER_URL}/api/appointment/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Could not fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading appointments...</p>;

  return (
    <div className="appointments-wrapper">
      <h2>My Appointments</h2>

      {appointments.length === 0 && <p style={{ textAlign: "center" }}>No appointments yet</p>}

      {appointments.map((item, index) => (
        <div className="appointment-card" key={item._id}>
          <div
            className="appointment-header"
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <span>{item.patient?.name || "N/A"}</span>
            <span>Status: {item.status || "Pending"}</span>
          </div>

          <div
            className="appointment-content"
            style={{ display: expanded === index ? "block" : "none" }}
          >
            <p><strong>Email:</strong> {item.patient?.email || "N/A"}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
            {item.status !== "Completed" && (
              <button
                className="complete-btn"
                onClick={() => navigate("/prescription-form", { state: { appointment: item } })}
              >
                Complete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}