import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Button, Dimensions, SafeAreaView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import swapCamera from '../assets/rotate-camera.png';
import AddPhoto from "../assets/import-photo.png";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { editUser } from "../redux/actions";

const { width, height } = Dimensions.get('window');

function CameraScreen({user}) {
    const navigation = useNavigation();
    const camRef = useRef(null);
    const [cameraType, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>Access denied!</Text>
    }

    const takePicture = async () => {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();

            user.capturedPhoto = data.uri;
            user.defaultImage = false;
            editUser(user);
            navigation.goBack('');
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'black' }}>
            <Camera 
            style={{width: width, height: height * 2 / 3}}
            type={cameraType}
            ref={camRef}>
           
            </Camera>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 30, width: width, height: height / 3, backgroundColor: 'black'}}>
            <TouchableOpacity
                        style={{ height: 80, width: 80, bottom: 20, left: 20, justifyContent: 'center' }}
                        onPress={() => {
                            setType(
                                cameraType === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 30, height: 30 }} source={swapCamera}></Image>
                        </View>
                    </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 80, width: 80, bottom: 20 }} onPress={takePicture}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={AddPhoto} style={{ height: 30, width: 30 }} />
                        </View>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.userProfile
})

export default connect(mapStateToProps)(CameraScreen);