import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFazenda } from '../../Context/FazendaContext'; 
import { useHistorico } from '../../Context/HistoryContext'; 

export default function Cadastrar() {
  const navigation = useNavigation();
  const { fazendas, setFazendas } = useFazenda();
  const { adicionarAoHistorico } = useHistorico();

  const [fazendaData, setFazendaData] = useState({
    nomeFazenda: '',
    imagem: null,
    data: '',
    quantidadeGado: '',
  });

  const formatarMilhar = (value) => {
    return value.replace(/\D/g, '') 
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
  };

  const handleChange = (field, value) => {
    let formattedValue = value;

    if (field === 'data') {
      
      formattedValue = value.replace(/\D/g, '');

      if (formattedValue.length <= 2) {
        formattedValue = formattedValue.replace(/^(\d{0,2})/, '$1');
      } else if (formattedValue.length <= 4) {
        formattedValue = formattedValue.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
      } else {
        formattedValue = formattedValue.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3').slice(0, 10);
      }
    } else if (field === 'quantidadeGado') {
     
      formattedValue = formatarMilhar(value);
    }

    setFazendaData({ ...fazendaData, [field]: formattedValue }); 
  };

  const handleEnviar = () => {
    const { nomeFazenda, data, quantidadeGado } = fazendaData;
  
    if (!nomeFazenda || !data || !quantidadeGado) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de enviar.');
      return;
    }
  
    const newFazenda = {
      id: fazendas.length + 1,
      nome: nomeFazenda,
      imageSource: null,
      data: data,
      quantidadeGado: quantidadeGado.replace(/\D/g, ''), // Remover ponto ao salvar
      selecionada: false,
    };
  
    const newFazendas = [...fazendas, newFazenda];
    setFazendas(newFazendas);
  
    const acaoCriacao = `Nova fazenda criada: ${nomeFazenda}`;
    adicionarAoHistorico && adicionarAoHistorico(acaoCriacao); 
  
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Cadastrar Fazenda</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Nome da Fazenda</Text>
        <TextInput
          placeholder="Insira o nome da fazenda"
          value={fazendaData.nomeFazenda}
          onChangeText={(text) => handleChange('nomeFazenda', text)}
          style={styles.input}
        />
        <Text style={styles.label}>Data</Text>
        <TextInput
          placeholder="Insira a data (dd/mm/yyyy)"
          value={fazendaData.data}
          onChangeText={(text) => handleChange('data', text)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
        />
        <Text style={styles.label}>Quantidade de Gado</Text>
        <TextInput
          placeholder="Insira a quantidade de gado"
          value={fazendaData.quantidadeGado}
          onChangeText={(text) => handleChange('quantidadeGado', text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.enviarButton} onPress={handleEnviar}>
          <Text style={styles.enviarButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e8b57',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: '8%',
    paddingBottom: '8%',
    padding: '4%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', 
    flex: 1, 
  },
  content: {
    backgroundColor: 'white',
    padding: 18,
    marginTop: 16,
    borderRadius: 8,
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#2e8b57',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  enviarButton: {
    backgroundColor: '#2e8b57',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
    marginTop: '8%',
  },
  enviarButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
