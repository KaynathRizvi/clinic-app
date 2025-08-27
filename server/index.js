// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (allow requests from all origins for dev)
app.use(cors());

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authroute");
app.use("/api/auth", authRoutes);

const appointmentRoutes = require("./routes/appointment");
app.use("/api/appointment", appointmentRoutes);

const prescriptionRoutes = require("./routes/prescription");
app.use("/api/prescriptions", prescriptionRoutes);

app.use("/api/doctors", require("./routes/doctors"));


// Test root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
