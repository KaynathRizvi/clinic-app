import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/bookApptStyle";   // ✅ import styles

// Expo server config
const SERVER =
  Constants.expoConfig?.extra?.SERVER_URL ||
  Constants.expoConfig?.extra?.DEBUG_SERVER_URL;

export default function BookAppointment() {
  const navigation = useNavigation();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${SERVER}/api/doctors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data);
      } catch (err) {
        console.log("Fetch doctors error:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to fetch doctors.");
      }
    };

    fetchDoctors();
  }, []);

  const handleBook = async () => {
    if (!selectedDoctor || !date) {
      Alert.alert("Error", "Please select a doctor and date.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const res = await axios.post(
        `${SERVER}/api/appointment/book`,
        { doctorId: selectedDoctor._id, date: date.toISOString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert(
        "Success",
        res.data?.msg || "Appointment booked successfully!",
        [{ text: "OK", onPress: () => navigation.navigate("index") }],
        { cancelable: false }
      );

      setSelectedDoctor(null);
    } catch (err) {
      console.log("Booking Error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Doctor:</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.doctorItem,
              selectedDoctor?._id === item._id && styles.selectedDoctor,
            ]}
            onPress={() => setSelectedDoctor(item)}
          >
            <Text style={styles.doctorText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.heading}>Pick Date:</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === "ios");
            if (selectedDate) setDate(selectedDate);
          }}
          minimumDate={new Date()}
        />
      )}

      {/* Custom styled button instead of default <Button> */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}