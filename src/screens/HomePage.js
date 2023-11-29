import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Adiciona esta linha
import ExpenseTracker from '../screens/ExpenseTracker'; // Certifique-se de que o caminho está correto

const HomePage = () => {
  const navigation = useNavigation(); // Adiciona esta linha

  const navigateToExpenseTracker = () => {
    navigation.navigate('Fixas'); // Nome da tela no Navigator
  };

  return (
    <ImageBackground
      source={require('../screens/siri.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Controle Financeiro</Text>
        <Text style={styles.message}>Tenha controle total das suas finanças.</Text>
        <TouchableOpacity style={styles.button} onPress={navigateToExpenseTracker}>
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
    marginBottom: 350,
    color: '#2E4623', // Cor do texto
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2E4623', // Cor do texto
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
