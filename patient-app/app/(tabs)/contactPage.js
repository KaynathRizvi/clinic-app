import { View, Text, Linking, TouchableOpacity } from "react-native";
import styles from "../styles/contactPageStyle";

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