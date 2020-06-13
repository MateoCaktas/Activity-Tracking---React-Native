import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TapGestureHandler } from "react-native-gesture-handler";
import CustomHeader from "../navigation/CustomHeader";

export default function Register({ navigation }) {

    const LoginUser = () => {
        navigation.navigate('HomeApp')
    }

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <CustomHeader title="Login" navigation={navigation} />
                <View style={styles.container} >
                    <Text>
                        Enter your email
                    </Text>
                    <TextInput
                        placeholder="EMAIL"
                        style={styles.emailInput}
                        placeholderTextColor="purple"
                    />

                    <Text style={{ marginTop: 30 }}>
                        Enter your password
                        </Text>
                    <TextInput
                        placeholder="PASSWORD"
                        style={styles.emailInput}
                        placeholderTextColor="purple"
                    />
                    <TapGestureHandler
                        onHandlerStateChange={LoginUser}>
                        <View style={styles.loginButton}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>LOG IN</Text>
                        </View>
                    </TapGestureHandler>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailInput: {
        width: 300,
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 20,
        borderColor: 'purple',
        backgroundColor: 'white'
    },
    loginButton: {
        marginTop: 100,
        width: 200,
        backgroundColor: 'white',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: 'purple',
        //Trenutno mijenja SVE BOTUNE ! Triba prominit ovo
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 3
    },
})