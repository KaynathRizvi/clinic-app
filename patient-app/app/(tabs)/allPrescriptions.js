import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/allPrescStyle";

const SERVER =
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL ||
  Constants.expoConfig?.extra?.SERVER_URL;

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // track open dropdown

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

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

  if (loading)
    return <Text style={styles.loading}>Loading prescriptions...</Text>;

  return (
    <FlatList
      data={prescriptions}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isExpanded = expandedId === item._id;
        return (
          <View style={styles.card}>
            {/* Dropdown Header */}
            <TouchableOpacity
              style={styles.header}
              onPress={() =>
                setExpandedId(isExpanded ? null : item._id)
              }
            >
              <Text style={styles.doctorName}>
                Dr. {item.doctorId?.name || "N/A"}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.dateText}>
                  {new Date(item.createdAt).toLocaleDateString()}{" "}
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#056c6"
                  style={{ marginLeft: 6 }}
                />
              </View>
            </TouchableOpacity>

            {/* Dropdown Content */}
            {isExpanded && (
              <View style={styles.details}>
                <Text style={styles.label}>Patient:</Text>
                <Text style={styles.value}>{item.patientId?.name || "N/A"}</Text>

                <Text style={styles.label}>Symptoms:</Text>
                <Text style={styles.value}>{item.symptoms}</Text>

                <Text style={styles.label}>Diagnosis:</Text>
                <Text style={styles.value}>{item.diagnosis}</Text>

                <Text style={styles.label}>Medicines:</Text>
                {item.medicines.map((m, i) => (
                  <Text key={i} style={styles.medicineItem}>
                    • {m.name} | {m.dosage} | {m.duration}
                  </Text>
                ))}

                {item.notes ? (
                  <>
                    <Text style={styles.label}>Notes:</Text>
                    <Text style={styles.value}>{item.notes}</Text>
                  </>
                ) : null}
              </View>
            )}
          </View>
        );
      }}
    />
  );
}
