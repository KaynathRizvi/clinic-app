import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/loginPageStyles";

const SERVER =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'
  const router = useRouter();

  const validateField = (field, value) => {
    let msg = "";
    if (field === "email") {
      if (!value.trim()) msg = "Email is required";
      else if (!/@/.test(value)) msg = "Email must contain @";
    }
    if (field === "password") {
      if (!value.trim()) msg = "Password is required";
    }
    setErrors(prev => ({ ...prev, [field]: msg }));
  };

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    validateField(field, value);
    setMessage({ text: "", type: "" }); // clear global message on typing
  };

  const handleLogin = async () => {
    // Validate fields
    validateField("email", email);
    validateField("password", password);

    if (Object.values(errors).some(e => e)) {
      setMessage({ text: "Please fix the errors above.", type: "error" });
      return;
    }

    try {
      const res = await axios.post(`${SERVER}/api/auth/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage({ text: "Login successful! Redirecting...", type: "success" });

      // Navigate after short delay
      setTimeout(() => router.push("/"), 2000);

    } catch (err) {
      setMessage({ text: err.response?.data?.msg || "Login failed", type: "error" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        secureTextEntry
        value={password}
        onChangeText={(text) => handleChange("password", text)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Global message */}
      {message.text ? (
        <Text style={[styles.message, { color: message.type === "error" ? "#ff4d4f" : "#4caf50" }]}>
          {message.text}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/registerPage")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Go Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}