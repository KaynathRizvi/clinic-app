import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Appointments</h2>

      {appointments.length === 0 && <p>No appointments yet</p>}

      {appointments.map((item) => (
        <div
          key={item._id}
          style={{
            padding: "15px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p><strong>Patient:</strong> {item.patient?.name || "N/A"}</p>
          <p><strong>Email:</strong> {item.patient?.email || "N/A"}</p>
          <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {item.status || "Pending"}</p>

          {item.status !== "Completed" && (
            <button
              style={{ marginTop: "10px" }}
              onClick={() => navigate("/prescription-form", { state: { appointment: item } })}
            >
              Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
