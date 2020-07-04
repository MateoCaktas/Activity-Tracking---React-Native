import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"


import { Camera } from "expo-camera";

export default function TakePicture() {
    const navigation = useNavigation();

    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(()=> {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();


    }, []);

    if(hasPermission === null){
        return <View/>;
    }

    if(hasPermission === false){
        return <Text>Access denied!</Text>
    }


    return (
        <Camera
        type={cameraType}
        style={{flex:1}}>

        </Camera>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    title: {
        marginTop: 30,
        marginLeft: 20,
        fontWeight:'bold',
        fontSize: 30
    }
})
