import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Image, Button, Linking } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

import ProfileImage from "../assets/profile-image-black.png"
import CustomHeader from "../navigation/CustomHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import AddPhoto from "../assets/import-photo.png";

import ImagePicker from "expo-image-picker";

//import * as Permissions from 'expo-permissions';
import Permissions from 'expo';
import { CONTACTS } from "expo-permissions";

export default function EditProfileScreen({ navigation }) {
    const [status, changeStatus] = useState(null)
    const [imageSource, changeImageSource] = useState(ProfileImage)

    let activities = ["Music", "Football", "Hiking"];

  /*  const addPhoto = () => {
        console.log('Clicked addPhoto!')
    };
*/
    const addPhoto = async () => {
        const { status } = await Permissions.takeSnapshotAsync(Permissions.CONTACTS);

        changeStatus(status);

        if(statis !== 'granted'){
            Linking.openURL('app-settings');
            return;
        }

        const { data } = await CONTACTS.getContactsAsync({ pageSize: 1});

        console.log(data[0]);
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <CustomHeader title="Edit profile" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, width: '90%' }}>
                <View style={{ position: 'relative', width: 150, alignSelf: 'center'}}>
                    <Image source={imageSource} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 40 }} />
                    <View
                        style={styles.addPhotoButton}>
                        <TouchableOpacity
                            onPress={addPhoto}>
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