// src/components/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${SERVER_URL}/api/auth/register`, {
        name,
        email,
        password,
        role: "doctor", // fixed role for doctor registration
      });

      // Save token and doctor info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("doctorName", res.data.user.name);
      localStorage.setItem("doctorId", res.data.user.id);

      alert("Registration successful!");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Doctor Registration</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 20px" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
