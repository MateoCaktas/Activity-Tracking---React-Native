import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image, Button, Dimensions } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

import ProfileImage from "../assets/profile-image-black.png"
import CustomHeader from "../navigation/CustomHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import AddPhoto from "../assets/import-photo.png";
import swapCamera from '../assets/rotate-camera.png';
import ImagePicker from "expo-image-picker";

import { Camera } from "expo-camera";

//import * as Permissions from 'expo-permissions';
import Permissions from 'expo';
import { CONTACTS } from "expo-permissions";

const { width, height } = Dimensions.get('window');

export default function EditProfileScreen({ navigation }) {
    const [status, changeStatus] = useState(null)
    //const [imageSource, changeImageSource] = useState(ProfileImage)

    let activities = ["Music", "Football", "Hiking"];

    const camRef = useRef(null);
    const [cameraType, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(ProfileImage);

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
            setCapturedPhoto(data.uri);
            console.log(data);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <Camera
                style={{ width: width, height: height * 2 / 3 }}
                type={cameraType}
                ref={camRef}>
                <CustomHeader title="Edit profile" isHome={true} navigation={navigation} />
                <View style={{ flex: 1, width: '90%' }}>
                    <View style={{ position: 'relative', width: 150, alignSelf: 'center' }}>
                        <Image source={{ uri: capturedPhoto}} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 40 }} />
                        <View
                            style={styles.addPhotoButton}>
                            <TouchableOpacity

                            >
                                <Image source={AddPhoto} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.name}> User's name</Text>
                    <Text style={styles.info}>Height: 180cm</Text>
                    <Text style={styles.info}>Weight: 82kg</Text>
                    <Text style={styles.miniHeader}>Interests:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            activities.map(activity => (
                                <Text style={styles.activityItem} key={activity}>{activity}</Text>
                            ))
                        }
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
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
                        {/* Botun za slikat sliku. Možda čak odvojit cilu kameru u zasebnu rutu, te sa botunom za slikat sliku ić na tu rutu, odakle se lako vratit? POTREBAN REDUX */}
                        <View style={{ width: 40, height: 40, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={AddPhoto} style={{ height: 30, width: 30 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addPhotoButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 10,
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityItem: {
        marginTop: 10,
        marginHorizontal: 10
    },
    miniHeader: {
        fontSize: 20,
        marginTop: 30
    },
    info: {
        marginTop: 25,
        fontSize: 15
    },
    name: {
        alignSelf: 'center', fontSize: 25, marginTop: 20
    },
    text: {
        alignSelf: 'center',
        marginTop: 20
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginBottom: 30,
        backgroundColor: 'purple',
        borderRadius: 3,
        height: 40,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    }
})