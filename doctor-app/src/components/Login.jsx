import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import "../styles/LoginStyle.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Validate individual field
  const validateField = (field, value) => {
    let message = "";
    switch (field) {
      case "email":
        if (!value.trim()) message = "Email is required!";
        else if (!value.includes("@")) message = "Email must include '@'.";
        break;
      case "password":
        if (!value) message = "Password is required!";
        else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value))
          message = "Password must be 8+ chars, include 1 uppercase & 1 special char.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validateForm = () => {
    validateField("email", email);
    validateField("password", password);
    return !errors.email && !errors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${SERVER_URL}/api/auth/login`, { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("doctorName", res.data.user.name);
      localStorage.setItem("doctorId", res.data.user.id);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setErrors({ api: err.response?.data?.msg || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>

        {errors.api && <div className="form-error">{errors.api}</div>}
        {success && <div className="form-success">{success}</div>}

        <form onSubmit={handleLogin}>
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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
}
