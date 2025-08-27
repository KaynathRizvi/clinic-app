// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import DoctorAppointments from "./components/DoctorAppointment";
import PrescriptionForm from "./components/PrescriptionForm";
import AllPrescription from "./components/AllPrescription";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/prescription-form" element={<PrescriptionForm />} />
        <Route path="/all-prescriptions" element={<AllPrescription />} />
      </Routes>
    </Router>
  );
}
