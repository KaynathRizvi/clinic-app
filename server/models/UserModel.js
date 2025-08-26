const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// ✅ Define the model
const User = mongoose.model("User", userSchema);

// ✅ Export the model
module.exports = User;
