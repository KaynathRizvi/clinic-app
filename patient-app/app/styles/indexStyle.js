import { StyleSheet } from 'react-native';

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
    color: "#056c6c",
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
    color: "#056c6c",
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

export default styles;
