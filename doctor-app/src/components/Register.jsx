import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import "../styles/RegisterStyle.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validate individual field
  const validateField = (field, value) => {
    let message = "";
    switch (field) {
      case "name":
        if (!value.trim()) message = "Name is required!";
        break;
      case "email":
        if (!value.trim()) message = "Email is required!";
        else if (!value.includes("@")) message = "Email must include '@'.";
        break;
      case "password":
        if (!value) message = "Password is required!";
        else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value))
          message = "Password must be 8+ chars, include 1 uppercase & 1 special char.";
        break;
      case "confirmPassword":
        if (!value) message = "Confirm your password!";
        else if (value !== password) message = "Passwords do not match!";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess("");

    // Validate all fields before submit
    const allFieldsValid = ["name", "email", "password", "confirmPassword"].every((field) => {
      validateField(field, eval(field)); // eval() used for brevity here
      return !errors[field];
    });

    if (!allFieldsValid) return;

    setLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/api/auth/register`, {
        name,
        email,
        password,
        role: "doctor",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("doctorName", res.data.user.name);
      localStorage.setItem("doctorId", res.data.user.id);

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      setErrors({ api: err.response?.data?.msg || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Registration</h2>

        {errors.api && <div className="form-error">{errors.api}</div>}
        {success && <div className="form-success">{success}</div>}

        <form onSubmit={handleRegister}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateField("name", e.target.value);
              }}
              placeholder="Enter your name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              placeholder="Enter your email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              placeholder="Enter your password"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value);
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => (window.location.href = "/")}>Login here</span>
        </p>
      </div>
    </div>
  );
}