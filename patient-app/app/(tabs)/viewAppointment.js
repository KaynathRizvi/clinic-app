import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER = Constants.expoConfig?.extra?.DEBUG_SERVER_URL || Constants.expoConfig?.extra?.SERVER_URL;

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <View style={styles.card}>
            <Text>Doctor: {item.doctor?.name || "N/A"}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Text>Status: {item.status || "Pending"}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});