import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TapGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../navigation/CustomHeader";

import { registerUser } from "../redux/actions";

export default function Register() {
    const navigation = useNavigation();
    const [email, changeEmail] = useState('');
    const [userName, changeUserName] = useState('');
    const [password, changePassword] = useState('');
    
    const register = () => {
        registerUser(email, userName, password);
        navigation.navigate('Login')
    }

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <CustomHeader title="Register" navigation={navigation} />
                <View style={styles.container} >
                    <Text>
                        Enter your email
                    </Text>
                        <TextInput
                            placeholder="EMAIL"
                            style={styles.emailInput}
                            placeholderTextColor="purple"
                            onChangeText={value => changeEmail(value)}
                            value={email}
                        />
                        <Text>
                        Enter your username
                    </Text>
                        <TextInput
                            placeholder="USERNAME"
                            style={styles.emailInput}
                            placeholderTextColor="purple"
                            onChangeText={value => changeUserName(value)}
                            value={userName}
                        />
                    <Text style={{marginTop: 30}}>
                        Enter your password
                    </Text>
                    <TextInput
                        placeholder="PASSWORD"
                        style={styles.emailInput}
                        placeholderTextColor="purple"
                        onChangeText={value => changePassword(value)}
                        value={password}
                    />
                    <TapGestureHandler
                        onHandlerStateChange={register}>
                        <View style={styles.registerButton}>
                            <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>REGISTER</Text>
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
    registerButton: {
        marginTop: 100,
        width: 200,
        backgroundColor: 'white',
        height: 70,
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
})