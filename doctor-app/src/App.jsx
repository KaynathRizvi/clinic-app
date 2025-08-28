import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import DoctorAppointments from "./components/DoctorAppointment";
import PrescriptionForm from "./components/PrescriptionForm";
import AllPrescription from "./components/AllPrescription";
import About from "./components/About";
import Contact from "./components/Contact";
import "./styles/AppStyle.css";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/prescription-form" element={<PrescriptionForm />} />
          <Route path="/all-prescriptions" element={<AllPrescription />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}