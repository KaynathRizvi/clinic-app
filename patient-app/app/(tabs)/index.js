import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/indexStyle";

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
