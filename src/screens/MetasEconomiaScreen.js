import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const MetasEconomiaScreen = () => {
  const [metas, setMetas] = useState([]);
  const [novaMeta, setNovaMeta] = useState({
    nome: '',
    valorTotal: '',
    dataLimite: '',
    dataInicio: '',
    valorEconomizado: 0,
    contribuicao: '',
  });
  const [mensagemContribuicao, setMensagemContribuicao] = useState('');
  const [indiceEdicao, setIndiceEdicao] = useState(null);

  const handleAdicionarMeta = () => {
    if (!novaMeta.nome || !novaMeta.valorTotal || !novaMeta.dataLimite || !novaMeta.dataInicio) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const valorTotalNumerico = parseFloat(novaMeta.valorTotal.replace('R$', '').replace('.', '').replace(',', '.'));
    const novaMetaComContribuicao = { ...novaMeta, contribuicao: 0, valorTotal: valorTotalNumerico };
    
    if (indiceEdicao !== null) {
      const novasMetas = [...metas];
      novasMetas[indiceEdicao] = novaMetaComContribuicao;
      setMetas(novasMetas);
      setIndiceEdicao(null);
      setMensagemContribuicao('Meta atualizada');
    } else {
      setMetas((prevMetas) => [...prevMetas, novaMetaComContribuicao]);
      setMensagemContribuicao('Meta adicionada');
    }

    setNovaMeta({
      nome: '',
      valorTotal: '',
      dataLimite: '',
      dataInicio: '',
      valorEconomizado: 0,
      contribuicao: 0,
    });
  };

  const handleAdicionarContribuicao = (index) => {
    const novasMetas = [...metas];
    const contribuicaoNumerica = parseFloat(novasMetas[index].contribuicao);
  
    if (isNaN(contribuicaoNumerica)) {
      Alert.alert('Valor inválido', 'Insira um valor numérico válido para a contribuição.');
      return;
    }
  
    novasMetas[index].valorEconomizado += contribuicaoNumerica;
  
    const valorTotalNumerico = parseFloat(novasMetas[index].valorTotal);
  
    if (!isNaN(valorTotalNumerico) && valorTotalNumerico > 0) {
      novasMetas[index].progresso = (novasMetas[index].valorEconomizado / valorTotalNumerico) * 100;
    } else {
      novasMetas[index].progresso = 0;
    }
  
    console.log('Metas antes da atualização:', metas);
    console.log('Índice:', index);
    console.log('Contribuição Numerica:', contribuicaoNumerica);
    console.log('Valor Total Numerico:', valorTotalNumerico);
    console.log('Valor Economizado:', novasMetas[index].valorEconomizado);
    console.log('Progresso:', novasMetas[index].progresso);
  
    setMetas(novasMetas);
    setMensagemContribuicao('Contribuição adicionada');
  };

  const handleEditarMeta = (index) => {
    const metaParaEditar = metas[index];
    setNovaMeta(metaParaEditar);
    setIndiceEdicao(index);
  };

  const handleExcluirMeta = (index) => {
    const novasMetas = [...metas];
    novasMetas.splice(index, 1);
    setMetas(novasMetas);
    setMensagemContribuicao('Meta excluída');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Metas de Economia</Text>
      <View style={styles.form}>
        <Text style={styles.label}>
          Nome da Meta<Text style={styles.asterisco}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da meta"
          value={novaMeta.nome}
          onChangeText={(text) => setNovaMeta({ ...novaMeta, nome: text })}
        />
        <Text style={styles.label}>
          Valor Total<Text style={[styles.asterisco, styles.redText]}>*</Text>
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
          value={novaMeta.valorTotal}
          onChangeText={(text) => setNovaMeta({ ...novaMeta, valorTotal: text })}
          placeholder="Digite o valor total"
        />
        <Text style={styles.label}>
          Data Limite<Text style={styles.asterisco}>*</Text>
        </Text>
        <TextInputMask
          style={styles.input}
          type={'datetime'}
          options={{
            format: 'MM/YYYY',
          }}
          value={novaMeta.dataLimite}
          onChangeText={(text) => setNovaMeta({ ...novaMeta, dataLimite: text })}
          placeholder="MM/AAAA"
        />
        <Text style={styles.label}>
          Data de Início<Text style={styles.asterisco}>*</Text>
        </Text>
        <TextInputMask
          style={styles.input}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={novaMeta.dataInicio}
          onChangeText={(text) => setNovaMeta({ ...novaMeta, dataInicio: text })}
          placeholder="DD/MM/AAAA"
        />
        <Button title="Adicionar/Editar Meta" onPress={handleAdicionarMeta} />
      </View>

      {/* Lista de Metas de Economia */}

      <Text style={styles.heading}>Lista de Metas de Economia:</Text>
      {metas.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.metaDetail}>Nome: {item.nome}</Text>
          <Text style={[styles.metaDetail, styles.redText]}>Valor Total: R$ {item.valorTotal}</Text>
          <Text style={styles.metaDetail}>Data Limite: {item.dataLimite}</Text>
          <Text style={styles.metaDetail}>Data de Início: {item.dataInicio}</Text>
          <Text style={[styles.metaDetail, styles.greenText]}>
            Valor Economizado: R$ {item.valorEconomizado}
          </Text>
          <Text style={styles.progressText}>
            Progresso: {item.progresso ? item.progresso.toFixed(2) : '0.00'}%
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Contribuição"
            value={item.contribuicao.toString()}
            onChangeText={(text) => {
              setMensagemContribuicao('');
              const novasMetas = [...metas];
              novasMetas[index].contribuicao = text;
              setMetas(novasMetas);
            }}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => handleAdicionarContribuicao(index)}
            style={styles.touchableOpacity}
          >
            <View style={styles.editButton}>
              <Text style={styles.textoBotaoAcao}>Adicionar Contribuição</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditarMeta(index)} style={styles.touchableOpacity}>
            <View style={styles.editButton}>
              <Text style={styles.textoBotaoAcao}>Editar Meta</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleExcluirMeta(index)} style={styles.touchableOpacity}>
            <View style={styles.deleteButton}>
              <Text style={styles.textoBotaoAcao}>Excluir Meta</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      {mensagemContribuicao ? (
        <Text style={[styles.mensagem, styles.redText]}>{mensagemContribuicao}</Text>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
  },
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metaDetail: {
    marginBottom: 5,
    fontWeight: 'bold',
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
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333333',
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  asterisco: {
    color: 'red',
    marginLeft: 2,
  },
  mensagem: {
    fontWeight: 'bold',
  },
  touchableOpacity: {
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  textoBotaoAcao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#ac9437',  // Cor desejada para o progresso
    fontWeight: 'bold',
  },
});

export default MetasEconomiaScreen;
