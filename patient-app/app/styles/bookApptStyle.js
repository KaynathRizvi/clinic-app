import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#333",
  },
  doctorItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Android shadow
  },
  selectedDoctor: {
    backgroundColor: "#cce5ff",
    borderColor: "#056c6c",
  },
  doctorText: {
    fontSize: 16,
    color: "#222",
  },
  input: {
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  bookButton: {
    marginTop: 20,
    backgroundColor: "#056c6c",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
