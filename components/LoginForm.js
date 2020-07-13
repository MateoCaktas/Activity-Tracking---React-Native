import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

export default function LoginForm() {
    const navigation = useNavigation();

    return (       
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/background-wallpaper.jpg')}
                        style={{ flex: 1, height: height*1.1, width: width, justifyContent: 'center', alignItems: 'center' }}>
            </ImageBackground>
            <Text style={{color:'white', fontSize: 25, fontWeight:'bold', alignSelf:'center',}}> Activity tracking app</Text>
            <View style={styles.container}>
                <TouchableOpacity 
                style={{...styles.button, width: '80%'}} 
                onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}> SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{...styles.button, backgroundColor: 'purple', width: '80%'}}
                onPress={() => navigation.navigate('Register')}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> REGISTER</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        top: -25,
        position: 'absolute',
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3
    },
    emailInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 20,
        borderColor: 'purple'
    },
    signInButton: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        //Trenutno mijenja SVE BOTUNE ! Triba prominit ovo
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 3
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 3
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogin: {
        backgroundColor: 'purple',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        width: 150,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: 'center'
    },
    buttonRegister: {
        marginTop: 20,
        borderColor: 'purple',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        width: 150
    },
    buttonRegisterText: {
        color: 'purple',
        fontSize: 20,
        textAlign: 'center'
    }
})