// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "40px" }}>Doctor Dashboard</h1>

      <div style={gridStyle}>
        <div style={cardStyle} onClick={() => navigate("/doctor-appointments")}>
          <h2>Appointments</h2>
          <p>View all your scheduled appointments</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/all-prescriptions")}>
          <h2>Prescription</h2>
          <p>Create or view prescriptions</p>
        </div>

        <div style={cardStyle} onClick={handleLogout}>
          <h2>Logout</h2>
          <p>Sign out from your account</p>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  width: "100%",
  maxWidth: "900px",
};

const cardStyle = {
  padding: "30px",
  backgroundColor: "#007bff",
  color: "white",
  borderRadius: "12px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "transform 0.2s, background-color 0.2s",
  textAlign: "center",
};

cardStyle[':hover'] = {
  transform: "translateY(-5px)",
  backgroundColor: "#0056b3",
};
