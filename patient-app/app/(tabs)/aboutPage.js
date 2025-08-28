import { View, Text, ScrollView } from "react-native";
import styles from "../styles/aboutPageStyles"; // import external styles

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