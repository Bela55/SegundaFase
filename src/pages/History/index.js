import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HistoricoScreen() {
  const navigation = useNavigation();

  const [fazendas, setFazendas, dados, Setdados] = useState([
    {
      id: 1,
      nome: 'Reginaldos farm',
      imageSource: require('../../assets/logo-teste.png'),
      selecionada: false,
      dadosOcultos: ['Volume do biodigestor: 100 m²',
        'Altura total do biodigestor: 10 m',
        'Diametro da câmara do biodigestor: 20 m',
        'Altura da câmara do biodigetor: 9 m',
        'Diâmetro do biodigestor: 10 m',
        'Altura do gasômetro: 4 m',
        'Comprimento do cano guia: 20 m',
        'Dimenssões dos tanques de carga e descarga: 7 m',
        'Comprimento do cano de descarga: 9 m',
        'Comprimento do cano de carga: 10 m',
        'Volume de gás produzido pelo biodigestor: 200 m²',]
    },
      ]);

  const [selecoes, setSelecoes] = useState({});
  const [resultado, setResultado] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);


  const toggleSelecionada = (id) => {
    const fazendasAtualizadas = fazendas.map((fazenda) => {
      if (fazenda.id === id) {
        return { ...fazenda, selecionada: !fazenda.selecionada };
      }
      return fazenda;
    });
    setFazendas(fazendasAtualizadas);

    setSelecoes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.fazendaItem,
        { backgroundColor: item.selecionada ? 'lightgray' : 'white' },
      ]}
      onPress={() => setItemSelecionado(item.id)}
    >
      <Image source={item.imageSource} style={styles.fazendaImage} />
      <View style={[styles.textContainer, item.id === itemSelecionado && styles.itemSelecionado]}>
        <Text style={styles.fazendaNome}>{item.nome}</Text>
        {item.id === itemSelecionado && item.dadosOcultos && (
          <View style={styles.dadosOcultosContainer}>
            {item.dadosOcultos.map((dadosOcultosItem, index) => (
              <Text key={index} style={styles.dadosOcultos}>
                {dadosOcultosItem}
              </Text>
            ))}
          </View>
        )}
        <Text style={styles.dataCalculo}>Data do Cálculo: 15/04/2023</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Ola, Sr(a) Pessoa')}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Histórico de Calculos</Text>

      </View>
      <FlatList
        data={fazendas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={itemSelecionado}
        style={{ marginBottom: 20 }}
      />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: '8%',
    paddingBottom: '8%',
    padding: '4%',
  },
  iconButton: {
    paddingTop: '12%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },

  fazendaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
  },
  fazendaImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  fazendaNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataCalculo: {
    fontSize: 12,
    color: 'gray',
  },
  checkIcon: {
    marginRight: 8,
  },
  calcularButton: {
    backgroundColor: 'white',
    padding: 18,
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  calcularButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
  },
});


