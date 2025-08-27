import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Determine server URL from Expo config
const SERVER =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      const res = await axios.post(`${SERVER}/api/auth/login`, {
        email,
        password,
      });

      // Save token in AsyncStorage
      await AsyncStorage.setItem("token", res.data.token);
      
      // Save user info in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      Alert.alert("Success", "Login successful");
      console.log("Token:", res.data.token); // save this later with AsyncStorage

      // Navigate to home/dashboard after login
      router.push("/"); // you can create a home page later
    } catch (err) {
      Alert.alert("Error", err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/registerPage")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.link}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  link: { marginTop: 15, textAlign: "center", color: "#007bff" },
});
