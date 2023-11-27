import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function CadFazenda() {
  const navigation = useNavigation();
  const [fazendaData, setFazendaData] = useState({
    nomeFazenda: '',
    imagem: null,
    data: '',
    quantidadeGado: '',
  });

  const handleChange = (field, value) => {
    setFazendaData({ ...fazendaData, [field]: value });
  };

  const handleCalcular = () => {
    // Lógica para calcular 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Dados da Fazenda</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Nome da Fazenda</Text>
        <TextInput
          placeholder="Insira o nome da fazenda"
          value={fazendaData.nomeFazenda}
          onChangeText={(text) => handleChange('nomeFazenda', text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.imageContainer}>
          <Icon name="camera" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.label}>Data</Text>
        <TextInput
          placeholder="DD/MM/AA"
          value={fazendaData.data}
          onChangeText={(number) => handleChange('data', number)}
          style={styles.input}
        />
        <Text style={styles.label}>Quantidade de Gado</Text>
        <TextInput
          placeholder="Insira a quantidade de gado"
          value={fazendaData.quantidadeGado}
          onChangeText={(text) => handleChange('quantidadeGado', text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.calcularButton} onPress={() => navigation.navigate('Calculo Detalhado')}>
          <Text style={styles.calcularButtonText}>Calcular</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
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
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
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
  imageContainer: {
    backgroundColor: '#2e8b57',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 16,
  },
  calcularButton: {
    backgroundColor: '#2e8b57',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  calcularButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
}); 
