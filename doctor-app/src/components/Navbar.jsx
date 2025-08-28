import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/NavbarStyle.css";

export default function Navbar({ doctorName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("doctorId");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span
          className="navbar-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          ClinicApp
        </span>
      </div>

      <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <a onClick={() => navigate("/dashboard")}>Home</a>
        <a onClick={() => navigate("/about")}>About Us</a>
        <a onClick={() => navigate("/contact")}>Contact</a>
        <a onClick={() => navigate("/doctor-appointments")}>Appointments</a>
        <a onClick={() => navigate("/all-prescriptions")}>Prescriptions</a>
      </div>

      <div className="navbar-right">
        <span className="doctor-name">{doctorName}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}