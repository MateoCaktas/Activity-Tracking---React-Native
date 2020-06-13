import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window');

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

export default function AnimatedLoginForm() {
    const navigation = useNavigation();
    const [buttonOpacity, changeButtonOpacity] = useState(new Value(1));
    const [buttonPressed, changePressedButton] = useState('SIGN IN');

    const buttonSignInPressed = event([
        {
            nativeEvent: ({ state }) => block(
                cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 1, 0)))
            )
        }
    ]);

    /*
        const buttonRegisterPressed = event([
            {
                nativeEvent: ({ state }) => block(
                    cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 1, 0)))
                )
            }
        ]);
    */

    const buttonRegisterPressed = (event, value) => {
        
        changePressedButton(value);

        return Animated.event([null,
            {
                nativeEvent:({state})=>block([
                    cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 1, 0)))
                ])
            }
        ])(event);
    };

    /*const buttonRegisterPressed = Animated.event([null, {
        nativeEvent: ({ state }) => block(
            cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 1, 0)))
        )
        }], {
        listener: (event, value) => {
            console.log(event, value);
        }
    })*/

    const onCloseState = event([
        {
            nativeEvent: ({ state }) => block([
                cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 0, 1)))
            ])
        }
    ]);

    const navigateScreen = () => {
        if (buttonPressed === 'SIGN IN') {
            navigation.navigate('HomeApp')
        } else {
            navigation.navigate('InitialPage')
        }
    }

    let buttonY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: Extrapolate.CLAMP
    });

    let titleY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: Extrapolate.CLAMP
    })

    let backgroundY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [- height / 2, 0],
        extrapolate: Extrapolate.CLAMP
    })
    let textInputZindex = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, -1],
        extrapolate: Extrapolate.CLAMP
    })

    let textInputY = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
    })

    let textInputOpacity = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    })

    let rotateCross = interpolate(buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP
    })

    return (

        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={{ marginBottom: 100, zIndex: 500 }}
                    onPress={() => console.log(buttonPressed)}>
                    <Text>TESTING</Text>
                </TouchableOpacity>
                <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: backgroundY }] }}>
                    <ImageBackground source={require('../assets/background-wallpaper.jpg')}
                        style={{ flex: 1, height: null, width: null, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Animated.Text style={{ color: 'white', fontSize: 35, fontWeight: 'bold', alignItems: 'center', marginTop: 150, transform: [{ translateY: titleY }] }}>Activity tracking</Animated.Text>

                    </ImageBackground>

                </Animated.View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <TapGestureHandler
                        onHandlerStateChange={buttonSignInPressed}>
                        <Animated.View
                            style={{
                                ...styles.button, opacity: buttonOpacity,
                                transform: [{ translateY: buttonY }]
                            }}>
                            <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}> SIGN IN</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <TapGestureHandler
                        onHandlerStateChange={(event) => buttonRegisterPressed(event, 'REGISTER')}>
                        <Animated.View
                            style={{
                                ...styles.button, backgroundColor: 'purple', opacity: buttonOpacity,
                                transform: [{ translateY: buttonY }]
                            }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> REGISTER</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <Animated.View style={{
                        height: height / 2,
                        ...StyleSheet.absoluteFill,
                        top: null, justifyContent: 'center',
                        zIndex: textInputZindex,
                        opacity: textInputOpacity,
                        transform: [{ translateY: textInputY }]
                    }}>
                        <TapGestureHandler
                            onHandlerStateChange={onCloseState}>

                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ fontSize: 15, transform: [{ rotate: concat(rotateCross, 'deg') }] }}>
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <TouchableWithoutFeedback>
                            <TextInput
                                placeholder="EMAIL"
                                style={styles.emailInput}
                                placeholderTextColor="purple"
                            />
                        </TouchableWithoutFeedback>
                        <TextInput
                            placeholder="PASSWORD"
                            style={styles.emailInput}
                            placeholderTextColor="purple"
                        />
                        <TapGestureHandler
                            onHandlerStateChange={navigateScreen}>
                            <Animated.View style={styles.signInButton}>
                                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>{buttonPressed}</Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </Animated.View>
                </View>
            </View>
        </TouchableWithoutFeedback>

        /*<SafeAreaView style={{ flex: 1 }}>
            <LoginHeader />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={() => navigation.navigate('HomeApp')}
                >
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonRegisterText}> Register </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>*/
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
        alignItems: 'center'
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