import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // ✅ Icon package
import styles from "./styles/viewPrescStyle";

const SERVER =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function ViewPrescription() {
  const { appointmentId } = useLocalSearchParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "User not authenticated");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${SERVER}/api/prescriptions/${appointmentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPrescription(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response?.data || err.message);
        Alert.alert(
          "Prescription Not Found",
          "No prescription is available yet for this appointment."
        );
        setLoading(false);
      }
    };

    if (appointmentId) fetchPrescription();
  }, [appointmentId]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading prescription...</Text>
      </View>
    );
  }

  if (!prescription) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No prescription available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      {/* 🔙 Back Arrow */}
      <TouchableOpacity
        onPress={() => router.push("/viewAppointment")}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color="#056c6" />
        <Text style={{ marginLeft: 6, color: "#056c6", fontSize: 16 }}>
          Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Prescription</Text>

      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{prescription.doctorId?.name}</Text>

        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.value}>{prescription.patientId?.name}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>
          {new Date(prescription.createdAt).toLocaleDateString()}
        </Text>

        <Text style={styles.label}>Symptoms:</Text>
        <Text style={styles.value}>{prescription.symptoms}</Text>

        <Text style={styles.label}>Diagnosis:</Text>
        <Text style={styles.value}>{prescription.diagnosis}</Text>

        <Text style={styles.sectionTitle}>Medicines</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {prescription.medicines.map((med) => (
            <View key={med._id} style={styles.pill}>
              <Text style={styles.pillText}>
                {med.name} • {med.dosage} • {med.duration}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Notes:</Text>
        <Text style={styles.value}>{prescription.notes}</Text>
      </View>
    </ScrollView>
  );
}