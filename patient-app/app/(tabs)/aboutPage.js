import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        Welcome to Clinix Sphere!{"\n\n"}
        We are a digital healthcare platform connecting patients and doctors
        seamlessly.{"\n\n"}
        🚑 Patients can book appointments anytime, anywhere.{"\n"}
        👨‍⚕️ Doctors can manage schedules and provide digital prescriptions.{"\n\n"}
        Our mission is to make healthcare more accessible and hassle-free.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", color: "#007bff", marginBottom: 15 },
  text: { fontSize: 16, color: "#333", lineHeight: 22 },
});
