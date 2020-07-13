import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import ProfileImage from "../assets/profile-image-black.png"
import CustomHeader from "../navigation/CustomHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import AddPhoto from "../assets/import-photo.png";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { editUser } from "../redux/actions";
const { width, height } = Dimensions.get('window');

function EditProfileScreen({ userProfile }) {
    const navigation = useNavigation();
    const [userName, changeUserName] = useState(userProfile.userName);
    const [height, changeHeight] = useState(userProfile.height)
    const [weight, changeWeight] = useState(userProfile.weight)
    const [interests, changeInterests] = useState(userProfile.interests)
    const [changed, changeChanged] = useState(userProfile.changed);

    const [isFocused, changeFocus] = useState(false);

    const [newInterest, changeInterest] = useState('');

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            changeFocus(true);
        })

        const blur = navigation.addListener('blur', () => {
            changeFocus(false);
        })
    }, []);

    const saveUser = () => {
        const currentUser = {
            userName,
            email: userProfile.email,
            capturedPhoto: userProfile.capturedPhoto,
            height,
            weight,
            defaultImage: userProfile.defaultImage,
            password: userProfile.password,
            interests,
            activities: userProfile.activities,
            timesEdited: userProfile.timesEdited++
        }

        console.log(interests);

        editUser(currentUser);
        navigation.goBack('');
    }

    const AddInterest = (value) => {
        changeInterests(interests => [...interests, value]);
        changeInterest('');
    }

    const RemoveInterest = value => {
        changeInterests(interests.filter(interest => interest != value))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <CustomHeader title="Edit profile" isHome={true} navigation={navigation} />
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, width: '95%' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ position: 'relative', width: 150, alignSelf: 'center' }}>
                                <Image source={userProfile.defaultImage ? ProfileImage : { uri: userProfile.capturedPhoto }} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 20, borderRadius: 25 }} />
                                <View
                                    style={styles.addPhotoButton}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('CameraScreen')}
                                    >
                                        <Image source={AddPhoto} style={{ width: 30, height: 30 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TextInput style={styles.name}
                                onChangeText={(value) => { changeUserName(value); console.log(userName) }}
                                value={userName}>
                            </TextInput>
                            <View style={styles.info}>
                                <Text style={{ marginRight: 5, flex: 1 }}>Height:</Text>
                                <TextInput
                                    style={{ flex: 1, paddingLeft: 15, height: 35, backgroundColor: 'white', borderColor: 'purple', borderWidth: 1 }}
                                    value={height}
                                    onChangeText={(value) => changeHeight(value)}
                                >

                                </TextInput>
                                <Text>cm</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={{ marginRight: 0, flex: 1 }}>Weight:</Text>
                                <TextInput
                                    style={{ flex: 1, paddingLeft: 15, height: 35, backgroundColor: 'white', borderColor: 'purple', borderWidth: 1 }}
                                    value={weight}
                                    onChangeText={(value) => changeWeight(value)}
                                >
                                </TextInput>
                                <Text>kg</Text>
                            </View>
                            <Text style={styles.miniHeader}>Interests:</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <TextInput style={{ width: 150, paddingLeft: 5, borderWidth: 2, borderColor: 'black', height: 40 }}
                                    onChangeText={text => changeInterest(text)} value={newInterest}></TextInput>
                                <TouchableOpacity
                                    style={{ marginLeft: 10, width: 100, borderWidth: 2, backgroundColor: 'green', borderColor: 'green', borderRadius: 10, height: 40, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => AddInterest(newInterest)}>
                                    <Text style={{ color: 'white' }}>Add Interest</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{}}>
                                {
                                    interests.map(interest => (
                                        <View style={styles.interestItem} key={interest}>
                                            <Text>{interest}</Text>
                                            <TouchableOpacity onPress={() => RemoveInterest(interest)}>
                                                <Text style={styles.deleteButton}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.bottomButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack('')}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={() => saveUser()}>
                                <Text style={{ color: 'white' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    //userActivities: state.userActivities,
    userProfile: state.userProfile
})

export default connect(mapStateToProps)(EditProfileScreen);

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
    interestItem: {
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: 10
    },
    miniHeader: {
        fontSize: 20
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        width: 20,
        height: 20,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 10
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginTop: 25,
        fontSize: 15
    },
    name: {
        alignSelf: 'center', fontSize: 25, marginTop: 20,
        width: '60%',
        height: 50,
        backgroundColor: 'white'
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
    },
    bottomButtons: {
        marginTop: 20,
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    cancelButton: {
        height: 50,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    saveButton: {
        backgroundColor: 'purple',
        height: 50,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }
})