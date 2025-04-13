import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Inicializa Firebase Auth con persistencia usando AsyncStorage
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function Login(props) {
    // Creamos las variables de estado
    const [email, setEmail] = useState();
    const [password, setPassword ] = useState();

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Iniciando sesión', 'Accediendo...');
            props.navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'El usuario o la contraseña son incorrectos');
        }
    };

    return (
        <View style={styles.padre}>
            <View>
                <Image source={require("../assets/Viakon.jpg")} style={styles.viakon} />
            </View>

            <View style={styles.tarjeta}>
                <View style={styles.cajaTexto}>
                    <TextInput
                        placeholder='Correo@gmail.com'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={(text) => setEmail(text)} 
                    />
                </View>

                <View style={styles.cajaTexto}>
                    <TextInput 
                        placeholder='Contraseña' 
                        style={{ paddingHorizontal: 15 }} 
                        onChangeText={(text) => setPassword(text)}    
                        secureTextEntry={true} 
                    />
                </View>

                <View style={styles.padreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={logueo}>
                        <Text style={styles.TextoBoton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'white',
    },
    viakon: {
        width: 350,
        height: 350,
        borderRadius: 1,
        borderColor: 'white',
    },
    tarjeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10,
    },
    padreBoton: {
        alignItems: 'center',
    },
    cajaBoton: {
        backgroundColor: '#ff0000',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20,
    },
    TextoBoton: {
        textAlign: 'center',
        color: 'white',
    },
});


