// src/screens/PrescriptionPage.jsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER = Constants.expoConfig.extra.DEBUG_SERVER_URL;

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        // Fetch prescriptions for the logged-in user (patient or doctor)
        const res = await axios.get(`${SERVER}/api/prescriptions/patient`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPrescriptions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prescriptions:", err.message);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <Text style={styles.loading}>Loading prescriptions...</Text>;

  return (
    <FlatList
      data={prescriptions}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>Doctor: {item.doctorId?.name || "N/A"}</Text>
          <Text>Patient: {item.patientId?.name || "N/A"}</Text>
          <Text>Symptoms: {item.symptoms}</Text>
          <Text>Diagnosis: {item.diagnosis}</Text>
          {item.medicines.map((m, i) => (
            <Text key={i}>
              Medicine: {m.name} | Dosage: {m.dosage} | Duration: {m.duration}
            </Text>
          ))}
          <Text>Notes: {item.notes}</Text>
          <Text>Date: {new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  loading: {
    padding: 20,
    fontSize: 16,
  },
});