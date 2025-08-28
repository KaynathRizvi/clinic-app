import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import styles from "../styles/viewApptStyle";

const SERVER = Constants.expoConfig?.extra?.SERVER_URL || Constants.expoConfig?.extra?.DEBUG_SERVER_URL;

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "User not authenticated. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${SERVER}/api/appointment/view`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        console.log("Appointments Fetch Error:", err.response?.data || err.message);
        Alert.alert("Error", err.response?.data?.msg || "Could not fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]
    );
  };

  const handleViewPrescription = (appointmentId) => {
    router.push({
      pathname: "/viewPrescription",
      params: { appointmentId }, // pass appointmentId as query param
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading appointments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={() => toggleExpand(item._id)}
            >
              <Text style={styles.dropdownHeaderText}>
                {item.doctor?.name || "N/A"}
              </Text>
              <Text style={styles.dropdownHeaderText}>
                {item.status || "Pending"}
              </Text>
            </TouchableOpacity>

            {expandedIds.includes(item._id) && (
              <View style={styles.dropdownContent}>
                <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>

                {item.status && item.status.toLowerCase() !== "pending" ? (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: "#007bff",
                      padding: 10,
                      borderRadius: 8,
                    }}
                    onPress={() => handleViewPrescription(item._id)}
                  >
                    <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
                      View Prescription
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ marginTop: 10, fontStyle: "italic", color: "#888" }}>
                    Prescription not yet available
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No appointments found
          </Text>
        }
      />
    </View>
  );
}
