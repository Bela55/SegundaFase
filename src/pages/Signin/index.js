import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignIn() {
  const navigation = useNavigation();
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput placeholder="Digite um email..." style={styles.input} />

        <Text style={styles.title}>Senha</Text>
        <View style={styles.inputSenhaContainer}>
          <TextInput
            placeholder="Sua senha"
            style={styles.input}
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          {/* Ícone do olho dentro do campo de senha */}
          <TouchableOpacity style={styles.iconContainer} onPress={toggleMostrarSenha}>
            <Icon name={mostrarSenha ? 'eye-slash' : 'eye'} size={20} color="#2e8b57" />
          </TouchableOpacity>
        </View>
    
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ola, Sr(a) Pessoa')}>
          <Text style={styles.buttonText} >Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Cadastre-se')}>
          <Text style={styles.registerText} >Nao possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonForgout} onPress={() => navigation.navigate('Redefinir a senha')}>
          <Text style={styles.forgoutText} >Esqueci minha senha</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2e8b57',
  },
  containerHeader: {
    marginTop: '25%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  toggleButton: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#2e8b57',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#2E8B57',
  },
  buttonForgout: {
    marginTop: '10%',
    marginBottom: '2%',
    alignSelf: 'center',
  },
  forgoutText: {
    color: '#2e8b57',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 12,
    zIndex: 1,
  },
  inputSenhaContainer: {
    position: 'relative',
  },
});
