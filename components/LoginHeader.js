import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginHeader() {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.header}>
                <Text style={styles.headerText}> Activity Tracker </Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:60,
        backgroundColor:'purple'
    },
    header:{
        flex: 2,
        justifyContent:'center',
        alignItems:'center'
    },
    headerText:{
        fontSize: 25,
        fontWeight: 'bold',
        color:'white'
    }
})