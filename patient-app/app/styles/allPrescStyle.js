import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f7f6",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#056c6",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
  },
  details: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  label: {
    fontWeight: "600",
    color: "#056c6",
    marginTop: 4,
  },
  value: {
    color: "#333",
    fontSize: 15,
  },
  medicineItem: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
  },
  loading: {
    padding: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#056c6",
  },
});
