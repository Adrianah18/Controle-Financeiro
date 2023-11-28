import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';


const HomePage = () => {
  return (
    <ImageBackground
      source={require('../screens/siri.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Controle Financeiro</Text>
        <Text style={styles.message}>Tenha controle total das suas finanças.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comece agora</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Tom esverdeado com 50% de opacidade
    padding: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 400,
    color: '#fff', // Cor do texto
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff', // Cor do texto
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
