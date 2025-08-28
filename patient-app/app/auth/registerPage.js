import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import styles from "../styles/registerPageStyle";

const SERVER =
  Constants.expoConfig?.extra?.SERVER_URL ||
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'
  const router = useRouter();
  const role = "patient";

  // Validation function
  const validateField = (field, value) => {
    let msg = "";

    switch (field) {
      case "name":
        if (!value.trim()) msg = "Name is required";
        break;
      case "email":
        if (!value.trim()) msg = "Email is required";
        else if (!/@/.test(value)) msg = "Email must contain @";
        break;
      case "password":
        if (!value) msg = "Password is required";
        else if (value.length < 8) msg = "Password must be at least 8 characters";
        else if (!/[A-Z]/.test(value)) msg = "Password must have at least one uppercase letter";
        else if (!/[!@#$%^&*]/.test(value)) msg = "Password must have at least one special character";
        break;
      case "confirmPassword":
        if (!value) msg = "Confirm password is required";
        else if (value !== password) msg = "Passwords do not match";
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: msg }));
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "name": setName(value); break;
      case "email": setEmail(value); break;
      case "password": setPassword(value); break;
      case "confirmPassword": setConfirmPassword(value); break;
    }
    validateField(field, value);
    setMessage({ text: "", type: "" }); // clear global message when user types
  };

  const handleRegister = async () => {
    // Run all validations
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    // If any field has error, prevent submission
    if (Object.values(errors).some(e => e)) {
      setMessage({ text: "Please fix the errors above.", type: "error" });
      return;
    }

    try {
      const res = await axios.post(`${SERVER}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage({ text: "Registration successful! Redirecting...", type: "success" });

      // Optionally navigate after a short delay
      setTimeout(() => router.push("/"), 2000);

    } catch (err) {
      setMessage({ text: err.response?.data?.msg || "Something went wrong", type: "error" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={(text) => handleChange("name", text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Global message */}
      {message.text ? (
        <Text style={[styles.message, { color: message.type === "error" ? "#ff4d4f" : "#4caf50" }]}>
          {message.text}
        </Text>
      ) : null}

      <TouchableOpacity onPress={() => router.push("/auth/loginPage")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Go Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}