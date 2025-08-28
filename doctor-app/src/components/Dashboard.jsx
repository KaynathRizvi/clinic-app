// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaPrescriptionBottleAlt, FaSignOutAlt } from "react-icons/fa";
import "../styles/DashboardStyle.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // Get doctor name from localStorage
  const doctorName = localStorage.getItem("doctorName") || "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("doctorId");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <h1>Hii, Doctor {doctorName}</h1> {/* Greeting with doctor name */}

      <div className="dashboard-grid">
        <div
          className="dashboard-card card-appointments"
          onClick={() => navigate("/doctor-appointments")}
        >
          <FaCalendarCheck className="card-icon" />
          <h2>Appointments</h2>
          <p>View scheduled appointments</p>
        </div>

        <div
          className="dashboard-card card-prescriptions"
          onClick={() => navigate("/all-prescriptions")}
        >
          <FaPrescriptionBottleAlt className="card-icon" />
          <h2>Prescription</h2>
          <p>Access patients prescriptions</p>
        </div>

        <div className="dashboard-card card-logout" onClick={handleLogout}>
          <FaSignOutAlt className="card-icon" />
          <h2>Logout</h2>
          <p>Sign out from your account</p>
        </div>
      </div>
    </div>
  );
}