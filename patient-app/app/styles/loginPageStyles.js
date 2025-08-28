import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#056c6c',
        padding: 15,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    link: {
        marginTop: 15,
        textAlign: 'center',
        color: '#056c6c'
    },
     error: {
    color: "#ff4d4f",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default styles;
