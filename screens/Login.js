import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TapGestureHandler } from "react-native-gesture-handler";
import CustomHeader from "../navigation/CustomHeader";
import { loginUser } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

function Login({ loggedIn }) {
    const navigation = useNavigation();
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const login = async () => {
        // Send email and password, get a response
        /*setTimeout(() => {
            loginUser(email, password)
        }, 1000)*/

        const logIn = await loginUser(email, password);
           
        if(loggedIn){
            navigation.navigate('LoggedIn')
        }
        else if(!loggedIn) {
            console.log('++++++++++++++++++++')
        }
        /*try {
        await loginUser(myObject)
        .then(() => {
            if(loggedIn){
                navigation.navigate('LoggedIn')
            }
            else {
                console.log('WRONG EMAIL AND PASSWORD!');
            }
        })
        } catch(err) {
            console.log(err);
        }*/
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
                        onChangeText={value => changeEmail(value)}
                        value={email}
                    />

                    <Text style={{ marginTop: 30 }}>
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
                        onHandlerStateChange={login}>
                        <View style={styles.loginButton}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>LOG IN</Text>
                        </View>
                    </TapGestureHandler>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    userProfile: state.userProfile,
    loggedIn: state.loggedIn
})

export default connect(mapStateToProps)(Login);


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