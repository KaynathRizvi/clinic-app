import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

export default function Contact() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.text}>We’d love to hear from you! Reach us at:</Text>

      <Text style={styles.label}>📧 Email:</Text>
      <TouchableOpacity onPress={() => Linking.openURL("mailto:support@clinixsphere.com")}>
        <Text style={styles.link}>support@clinixsphere.com</Text>
      </TouchableOpacity>

      <Text style={styles.label}>📞 Phone:</Text>
      <TouchableOpacity onPress={() => Linking.openURL("tel:+1234567890")}>
        <Text style={styles.link}>+1 234 567 890</Text>
      </TouchableOpacity>

      <Text style={styles.label}>📍 Address:</Text>
      <Text style={styles.text}>
        123 Health Street,{"\n"} Wellness City, 10101
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", color: "#007bff", marginBottom: 15 },
  text: { fontSize: 16, color: "#333", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#444" },
  link: { fontSize: 16, color: "#007bff", marginBottom: 10 },
});
