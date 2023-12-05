import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});

    const validarFormulario = () => {
        const novosErros = {};

        if (!nome) {
            novosErros.nome = 'Por favor, preencha o campo de nome.';
        }

        if (!sobrenome) {
            novosErros.sobrenome = 'Por favor, preencha o campo de sobrenome.';
        }

        if (!email) {
            novosErros.email = 'Por favor, preencha o campo de e-mail.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            novosErros.email = 'Por favor, insira um e-mail válido.';
        }

        if (!senha) {
            novosErros.senha = 'Por favor, preencha o campo de senha.';
        }

        if (senha !== confirmarSenha) {
            novosErros.confirmarSenha = 'As senhas não coincidem.';
        }

        if (!day || !month || !year) {
            novosErros.dataNascimento = 'Por favor, preencha a data de nascimento corretamente.';
        }

        if (!gender) {
            novosErros.gender = 'Por favor, selecione o gênero.';
        }

        setErrors(novosErros);

        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = () => {
        const formularioValido = validarFormulario();

        if (formularioValido) {
            Alert.alert('Formulário válido. Enviando dados...');
            Alert.alert('Cadastro realizado com sucesso!', 'Você será redirecionado para o login.');
            navigation.navigate('Login');
        } else {
            console.log('Formulário inválido. Corrija os erros antes de enviar.');
        }
    };

    return (
        
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/logo-teste.png')}
                    style={{ width: '40%' }}
                    resizeMode='contain'
                />
            </View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <ScrollView>
                <TextInput
                    placeholder="Digite seu nome"
                    style={styles.input}
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

                <TextInput
                    placeholder="Sobrenome"
                    style={styles.input}
                    value={sobrenome}
                    onChangeText={(text) => setSobrenome(text)}
                />
                {errors.sobrenome && <Text style={styles.errorText}>{errors.sobrenome}</Text>}

                <TextInput
                    placeholder="E-mail"
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    placeholder="Nova senha"
                    style={styles.input}
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                />
                {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

                <TextInput
                    placeholder="Confirmar senha"
                    style={styles.input}
                    secureTextEntry={true}
                    value={confirmarSenha}
                    onChangeText={(text) => setConfirmarSenha(text)}
                />
                {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}

                <View style={styles.dateInputContainer}>
                    <TextInput
                        placeholder="Dia"
                        style={styles.dateInput}
                        keyboardType="numeric"
                        value={day}
                        onChangeText={text => setDay(text)}
                    />
                    <TextInput
                        placeholder="Mês"
                        style={styles.dateInput}
                        keyboardType="numeric"
                        value={month}
                        onChangeText={text => setMonth(text)}
                    />
                    <TextInput
                        placeholder="Ano"
                        style={styles.dateInput}
                        keyboardType="numeric"
                        value={year}
                        onChangeText={text => setYear(text)}
                    />
                </View>
                {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento}</Text>}

                <RNPickerSelect
                    placeholder={{ label: 'Selecione o Gênero', value: null }}
                    items={[
                        { label: 'Feminino', value: 'feminino' },
                        { label: 'Masculino', value: 'masculino' },
                        { label: 'Personalizado', value: 'personalizado' },
                    ]}
                    value={gender}
                    onValueChange={(value) => setGender(value)}
                    style={pickerSelectStyles}
                />
                {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </ScrollView>

            </Animatable.View>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e8b57',
    },
    containerLogo: {
        flex: 1,
        backgroundColor: '#2e8b57',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        backgroundColor: '#FFF',
        flex: 3,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#2e8b57',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInput: {
        borderBottomWidth: 1,
        height: 40,
        width: '30%',
        fontSize: 16,
        marginTop: 12,
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 8,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderBottomWidth: 1,
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
    inputAndroid: {
        borderBottomWidth: 1,
        height: 40,
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingRight: 30,
    },
});
