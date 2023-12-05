import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFazenda } from '../../Context/FazendaContext'; 
import { useHistorico } from '../../Context/HistoryContext'; 

export default function Remove() {
  const navigation = useNavigation();
  const { fazendas, setFazendas } = useFazenda();
  const { adicionarAoHistorico } = useHistorico();

  const toggleSelecionada = (id) => {
    const fazendasAtualizadas = fazendas.map((fazenda) => {
      if (fazenda.id === id) {
        return { ...fazenda, selecionada: !fazenda.selecionada };
      }
      return fazenda;
    });
    setFazendas(fazendasAtualizadas);
  };

  const confirmarRemocao = () => {
    const fazendasSelecionadas = fazendas.filter((fazenda) => fazenda.selecionada);

    if (fazendasSelecionadas.length === 0) {
      Alert.alert('Nenhuma fazenda selecionada para remover');
      return;
    }

    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja remover as fazendas selecionadas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            const fazendasNaoSelecionadas = fazendas.filter((fazenda) => !fazenda.selecionada);
            setFazendas(fazendasNaoSelecionadas);

            const acaoRemocao = `Fazendas removidas: ${fazendasSelecionadas.map((fazenda) => fazenda.nome).join(', ')}`;
            adicionarAoHistorico(acaoRemocao);
          },
        },
      ]
    );
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.fazendaItem,
        { backgroundColor: item.selecionada ? 'lightgray' : 'white' },
      ]}
      onPress={() => toggleSelecionada(item.id)}
    >
      <Text style={styles.fazendaNome}>{item.nome}</Text>
      <Image source={item.imageSource} style={styles.fazendaImage} />
      <View style={styles.indicatorContainer}>
        {item.selecionada && <View style={styles.indicator} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Lista de Fazendas</Text>
      </View>
      <FlatList
        data={fazendas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={confirmarRemocao}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
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
    padding: '4%'
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
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  fazendaNome: {
    flex: 1,
    fontSize: 18,
  },
  fazendaImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 16,
  },
  indicatorContainer: {
    width: 24,
    alignItems: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  removeButton: {
    backgroundColor: 'white',
    padding: 18,
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '10%'
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
});
