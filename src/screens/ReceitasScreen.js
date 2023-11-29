import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

const ReceitasScreen = () => {
  const [receitas, setReceitas] = useState([]);
  const [novaReceita, setNovaReceita] = useState({
    nome: '',
    valor: '',
    dataRecebimento: '',
    informacaoAdicional: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadReceitas();
  }, []);

  const saveReceitas = async (receitas) => {
    try {
      const jsonReceitas = JSON.stringify(receitas);
      await AsyncStorage.setItem('receitas', jsonReceitas);
    } catch (error) {
      console.error('Erro ao salvar receitas:', error);
    }
  };

  const loadReceitas = async () => {
    try {
      const jsonReceitas = await AsyncStorage.getItem('receitas');
      if (jsonReceitas) {
        const parsedReceitas = JSON.parse(jsonReceitas);
        setReceitas(parsedReceitas);
      }
    } catch (error) {
      console.error('Erro ao carregar receitas:', error);
    }
  };

  const handleAdicionarReceita = () => {
    const { nome = '', valor = '', dataRecebimento = '', informacaoAdicional = '' } = novaReceita;
    console.log('Estado Atual de novaReceita:', novaReceita);
    // Validação para campos obrigatórios
    if (!nome.trim() || !valor.trim() || !dataRecebimento.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos obrigatórios.');
      return;
    }


    if (editIndex !== null) {
      const updatedReceitas = [...receitas];
      updatedReceitas[editIndex] = novaReceita;
      setReceitas(updatedReceitas);
      setEditIndex(null);
      saveReceitas(updatedReceitas);
    } else {
      const updatedReceitas = [...receitas, novaReceita];
      setReceitas(updatedReceitas);
      saveReceitas(updatedReceitas);
    }

    // Reinicie os valores dos campos
    setNovaReceita({
      nome: '',
      valor: '',
      dataRecebimento: '',
      informacaoAdicional: '',
    });
  };

  const handleEditarReceita = (index) => {
    const receitaEditada = receitas[index];
    setNovaReceita(receitaEditada);
    setEditIndex(index);
  };

  const handleExcluirReceita = (index) => {
    const novasReceitas = [...receitas];
    novasReceitas.splice(index, 1);
    setReceitas(novasReceitas);
    setEditIndex(null);
    saveReceitas(novasReceitas);
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Receitas</Text>
      <View style={styles.form}>
        <Text style={styles.label}>
          Nome da Receita<Text style={styles.asterisco}>*</Text>:
        </Text>
        <TextInput
          style={styles.input}
          value={novaReceita.nome}
          onChangeText={(text) => setNovaReceita((prev) => ({ ...prev, nome: text }))}
          
          placeholder="Digite o nome da receita"
          placeholderTextColor="#888888"
        />

        <Text style={styles.label}>
          Valor<Text style={styles.asterisco}>*</Text>:
        </Text>
        <TextInputMask
          style={styles.input}
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: '',
          }}
          value={novaReceita.valor}
          onChangeText={(text) => setNovaReceita((prevState) => ({ ...prevState, valor: text }))}
          placeholder="Digite o valor total"
        />
        <Text style={styles.label}>
          Data de Recebimento<Text style={styles.asterisco}>*</Text>:
        </Text>
        <TextInputMask
          style={styles.input}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#888888"
          value={novaReceita.dataRecebimento}
          onChangeText={(text) => setNovaReceita((prev) => ({ ...prev, dataRecebimento: text }))}
        />

        <Text style={styles.label}>Informação Adicional:</Text>
        <TextInput
          style={styles.input}
          value={novaReceita.informacaoAdicional}
          onChangeText={(text) => setNovaReceita((prev) => ({ ...prev, informacaoAdicional: text }))}
          placeholder="Informação adicional"
          placeholderTextColor="#888888"
        />

        <Button
          title={editIndex !== null ? 'Salvar Edição' : 'Adicionar Receita'}
          onPress={handleAdicionarReceita}
        />
      </View>

      <Text style={styles.heading}>Receitas Adicionadas</Text>

      {receitas.map((item, index) => (
        <View style={styles.expenseItem} key={index}>
          <Text style={styles.expenseText}>
  <Text style={styles.recipeName}>{item.nome}</Text>
  {' - '}
  <Text style={styles.recipeValue}>R$ {item.valor}</Text>
  {'\nRecebimento: '}
  <Text style={styles.recipeDate}>{item.dataRecebimento}</Text>
  {'\nInformação: '}
  <Text style={styles.recipeInfo}>{item.informacaoAdicional}</Text>
</Text>
<View style={styles.botoesAcao}>
  <TouchableOpacity onPress={() => handleEditarReceita(index)}>
    <View style={styles.editButton}>
      <Text style={styles.textoBotaoAcao}>Editar</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleExcluirReceita(index)}>
    <View style={styles.deleteButton}>
      <Text style={styles.textoBotaoAcao}>Excluir</Text>
    </View>
  </TouchableOpacity>
</View>
{index < receitas.length - 1 && <View style={styles.recipeSeparator} />}

        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    padding: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expenseItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  expenseText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  botoesAcao: {
    flexDirection: 'row',
  },
  textoBotaoAcao: {
    color: '#fff',
  },
  asterisco: {
    color: 'red',
  },
  recipeSeparator: {
    borderBottomWidth: 3,
    borderBottomColor: '#d1d1d1',
    marginVertical: 10,
  },
  recipeName: {
    fontWeight: 'bold',
  },
  recipeValue: {
    color: '#27ae60', // ou qualquer outra cor desejada
  },
  recipeDate: {
    fontStyle: 'italic',
  },
  recipeInfo: {
    color: '#888888',
  },
  recipeSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    marginVertical: 10,
  },
  
});

export default ReceitasScreen;
