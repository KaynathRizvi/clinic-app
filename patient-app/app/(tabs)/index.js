import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Homepage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name);
      }
    };
    getUser();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome{userName ? `, ${userName}` : ""}!</Text>
        <Text style={styles.tagline}>Clinix Sphere - Your Digital Health Companion</Text>
      </View>

      {/* Feature Cards */}
      <View style={styles.features}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/bookAppointment")}
        >
          <Image
            source={{ uri: "https://img.icons8.com/color/96/appointment-reminders.png" }}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Book Appointment</Text>
          <Text style={styles.cardDesc}>Schedule your appointment with doctors in just a few taps.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/prescriptionPage")}
        >
          <Image
            // Updated prescription icon URL
            source={{ uri: "https://img.icons8.com/color/96/pills.png" }}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>View Prescriptions</Text>
          <Text style={styles.cardDesc}>Access your digital prescriptions anytime, anywhere.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/viewAppointment")}
        >
          <Image
            source={{ uri: "https://img.icons8.com/color/96/calendar--v1.png" }}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>My Appointments</Text>
          <Text style={styles.cardDesc}>Check your upcoming and past appointments easily.</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Stay healthy. Stay informed. All in one place.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  header: {
    marginTop: 60,
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
  },
  features: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 15,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  footer: {
    marginTop: 30,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});