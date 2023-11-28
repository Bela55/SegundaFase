import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleLogout = () => {
        toggleModal(); 
        // lógica de logout
        navigation.navigate('Login'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    toggleModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Deseja sair?</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleLogout()}
                        >
                            <Text style={styles.modalButtonText}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => toggleModal()}
                        >
                            <Text style={styles.modalButtonText}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <Text style={styles.title}>Olá, Sr(a) Pessoa</Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Icon name="sign-out" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <SafeAreaView style={styles.row}>
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('Cadastro de Fazenda')}
                >
                    <Image
                        source={require('../../assets/logo-teste.png')}
                        style={styles.sectionImage}
                    />
                    <Text style={styles.sectionText}>Cadastrar Fazenda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('Calculo Detalhado')}

                >
                    <Image
                        source={require('../../assets/logo-teste.png')}
                        style={styles.sectionImage}
                    />
                    <Text style={styles.sectionText}>Cálculo Detalhado</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaView style={styles.row}>
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('Histórico')}
                >
                    <Image
                        source={require('../../assets/logo-teste.png')}
                        style={styles.sectionImage}
                    />
                    <Text style={styles.sectionText}>Histórico</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('Remover Fazendas')}
                >
                    <Image
                        source={require('../../assets/logo-teste.png')}
                        style={styles.sectionImage}
                    />
                    <Text style={styles.sectionText}>Remover Fazendas</Text>
                </TouchableOpacity>
            </SafeAreaView>
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
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginBottom: 12, 
        padding: '4%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 6,
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 15,
    },
    sectionImage: {
        width: 100,
        height: 100,
    },
    sectionText: {
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#2e8b57',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 100,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
