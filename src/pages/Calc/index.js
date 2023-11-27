import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Calculo = () => {
  const navigation = useNavigation();
  const [currentItem, setCurrentItem] = useState(0);

  const itemsList = [
    'Volume do biodigestor: 000 m²',
    'Altura total do biodigestor: 000 m',
    'Diâmetro da câmara do biodigestor: 00 m',
    'Altura da câmara do biodigestor: 00 m',
    'Diâmetro do biodigestor: 00 m',
    'Altura do gasômetro: 00 m',
    'Comprimento do cano guia: 00 m',
    'Dimensões dos tanques de carga e descarga: 00 m',
    'Comprimento do cano de descarga: 00 m',
    'Comprimento do cano de carga: 00 m',
    'Volume de gás produzido pelo biodigestor: 00 m²',
    'Data de criação: 17/09/2023'
  ];

  const handleNextItem = () => {
    if (currentItem < itemsList.length - 1) {
      setCurrentItem(currentItem + 1);
    }
  };

  const handlePrevItem = () => {
    if (currentItem > 0) {
      setCurrentItem(currentItem - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction  onPress={() => navigation.goBack() } style={styles.back}/>
        <Appbar.Content title="Calculo da Fazenda" titleStyle={styles.title} />
        <Ionicons
          name="menu-outline"
          size={24}
          color="white"
          onPress={() => console.log('Shown more')}
        />
      </Appbar.Header>

      <View style={styles.text1}>
        <Text>Rancho da Serra</Text>
      </View>

      <Image source={require('../../assets/animationvaca.json')} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{itemsList[currentItem]}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.prevButton]} onPress={handlePrevItem}>
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNextItem}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newCalcButton}>
          <Button
            theme={{ colors: { primary: 'seagreen' } }}
            mode="contained"
            onPress={() => navigation.navigate('Inserir dados')}
            style={styles.newCalcButtonText}
          >
            Novo Cálculo
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e8b57',
  },
  header: {
    backgroundColor: '#2e8b57', 
  },
  back: {
    color: '#2e8b57', 
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  text1: {
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    border: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    padding: 3,
    marginTop: 30,
    marginBottom: 30,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    
  },
  card: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    minWidth: 300,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: 100,
    
  },
  prevButton: {
    borderColor: 'white',
  },
  nextButton: {
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  newCalcButton: {
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 5,
    width: '70%',
    borderColor: 'white',
  },
  newCalcButtonText: {
    color: 'white',
    textAlign: 'center',
    borderColor: 'white',
  },
});

export default Calculo;
