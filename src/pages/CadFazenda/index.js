import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function CadFazenda() {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState([
    { id: 1, name: '', imageSource: null },
    { id: 2, name: '', imageSource: null },
    { id: 3, name: '', imageSource: null },
    { id: 4, name: '', imageSource: null },
    { id: 5, name: '', imageSource: null },
    { id: 6, name: '', imageSource: null },
  ]);

  const updateImageData = (id, name, imageSource) => {
    const updatedData = [...imageData];
    const index = updatedData.findIndex((item) => item.id === id);
    updatedData[index] = { id, name, imageSource };
    setImageData(updatedData);
  };

  const renderImageInputs = () => {
    const rows = [];
    for (let i = 0; i < imageData.length; i += 2) {
      const leftItem = imageData[i];
      const rightItem = imageData[i + 1];
      rows.push(
        <View key={i} style={styles.row}>
          {leftItem && (
            <View style={styles.imageInputContainer}>
              <TouchableOpacity
              onPress={() => navigation.navigate('Inserir dados')}
                style={styles.imageContainer}
              >
                {leftItem.imageSource ? (
                  <Image source={leftItem.imageSource} style={styles.imagePreview} />
                ) : (
                  <View style={styles.addButton}>
                    <Icon name="plus" size={30} color="white" />
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.nameInputContainer}>
                <TextInput
                  placeholder="Nome da Imagem"
                  value={leftItem.name}
                  onChangeText={(text) =>
                    updateImageData(leftItem.id, text, leftItem.imageSource)
                  }
                  style={{ textAlign: 'center' }}
                />
              </View>
            </View>
          )}
          {rightItem && (
            <View style={styles.imageInputContainer}>
              <TouchableOpacity
               onPress={() => navigation.navigate('Inserir dados')}
                style={styles.imageContainer}
              >
                {rightItem.imageSource ? (
                  <Image source={rightItem.imageSource} style={styles.imagePreview} />
                ) : (
                  <View style={styles.addButton}>
                    <Icon name="plus" size={30} color="white" />
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.nameInputContainer}>
                <TextInput
                  placeholder="Nome da Imagem"
                  value={rightItem.name}
                  onChangeText={(text) =>
                    updateImageData(rightItem.id, text, rightItem.imageSource)
                  }
                  style={{ textAlign: 'center' }}
                />
              </View>
            </View>
          )}
        </View>
      );
    }
    return rows;
  };

  const addImage = (id) => {
    // lógica para adicionar imagens 
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={ () => navigation.navigate('Ola, Sr(a) Pessoa')}>
        <Icon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Cadastro de Fazenda </Text>
    </View>
      <ScrollView contentContainerStyle={styles.centeredContainer}>{renderImageInputs()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e8b57',
    padding: 16,
    paddingStart: '2%',
    paddingEnd: '2%',
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1, 
    textAlign: 'center',
  },
  
  centeredContainer: {
    alignItems: 'center',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  addButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#2e8b57',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2e8b57',
    borderRadius: 50,
  },
  nameInputContainer: {
    marginTop: 8,
    width: 150,
  },
});
