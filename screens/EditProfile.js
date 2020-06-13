import React from "react";
import { StyleSheet, View, Text, Button } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomHeader from "../navigation/CustomHeader";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Edit profile" navigation={navigation} />
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}> Go back home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
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
    }
})