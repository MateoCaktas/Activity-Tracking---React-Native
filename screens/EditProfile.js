import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
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
    const [height, changeHeight] = useState('0')
    const [weight, changeWeight] = useState('0')
    
    const [isFocused, changeFocus] = useState(false);
    let activities = ["Music", "Football", "Hiking"];

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            changeFocus(true);
            if(userProfile.height)
                changeHeight(userProfile.height);
            if(userProfile.weight)
                changeWeight(userProfile.weight);
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
            password: userProfile.password
        }

        editUser(currentUser);
        navigation.goBack('');
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{flex: 1,  alignItems: 'center' }}>
                <CustomHeader title="Edit profile" isHome={true} navigation={navigation} />
                <View style={{ flex: 1, width: '90%' }}>
                    <View style={{ position: 'relative', width: 150, alignSelf: 'center' }}>
                        <Image source={userProfile.defaultImage ? ProfileImage : { uri: userProfile.capturedPhoto}   } style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 40, borderRadius: 25 }} />
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
                    onChangeText={(value) => {changeUserName(value); console.log(userName)}}
                    value={userName}> 
                    </TextInput>
                    <View style={styles.info}>
                        <Text style={{marginRight: 5, flex: 1}}>Height:</Text>
                        <TextInput
                        style={{flex:1, paddingLeft: 15, height:35, backgroundColor: 'white', borderColor:'purple', borderWidth: 1}}
                        value={height}
                        onChangeText={(value) => changeHeight(value)}
                        >

                        </TextInput>
                        <Text>cm</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{marginRight: 0, flex: 1}}>Weight:</Text>
                        <TextInput
                            style={{flex:1, paddingLeft: 15, height:35, backgroundColor: 'white', borderColor:'purple', borderWidth: 1}}
                            value={weight}
                            onChangeText={(value) => changeWeight(value)}
                        >  
                        </TextInput>
                        <Text>kg</Text>
                    </View>
                    <Text style={styles.miniHeader}>Interests:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            activities.map(activity => (
                                <Text style={styles.activityItem} key={activity}>{activity}</Text>
                            ))
                        }
                    </View>
                </View>

                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack('')}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => saveUser()}>
                        <Text style={{color:'white'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    userActivities: state.userActivities,
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
    activityItem: {
        marginTop: 10,
        marginHorizontal: 10
    },
    miniHeader: {
        fontSize: 20,
        marginTop: 30
    },
    info: {
        display:'flex',
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
        backgroundColor:'white'
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
        display:'flex',
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-around',
        marginBottom: 20
    },
    cancelButton: {
        height: 50,
        width: 140,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    saveButton: {
        backgroundColor: 'purple',
        height: 50,
        width: 140,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    }
})