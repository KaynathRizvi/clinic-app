import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#b8e5e5ff',
    borderRadius: 8,
    marginVertical: 5,
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#045757ff',
  },
  dropdownContent: {
  padding: 15,
  backgroundColor: '#f0fffeff', // soft light blue
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#cce0ff', // light border
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 4, // adds subtle shadow on Android
},
});

export default styles;
