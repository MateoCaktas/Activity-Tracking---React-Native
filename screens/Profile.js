import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileImage from "../assets/profile-image-black.png"
import CustomHeader from "../navigation/CustomHeader";

import {  } from "../redux/actions";
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

function Profile({ userProfile }) {
    const navigation = useNavigation();
    let activities = ["Music","Football", "Hiking"];

    useEffect(() => {
        console.log('INSIDE USE EFFECT');
        console.log(userProfile)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, alignItems:'center'}}>
            <CustomHeader title="Profile" isHome={true} navigation={navigation} />
            <View style={{flex:1,width: '90%'}}>
                <Image source={userProfile.defaultImage ? ProfileImage : { uri: userProfile.capturedPhoto}} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 40 }} />
                <Text style={styles.name}> {userProfile.userName ? userProfile.userName : null}</Text>
                <Text style={styles.info}>{userProfile.email}</Text>
                <Text style={styles.info}>Height: {userProfile.height}cm</Text>
                <Text style={styles.info}>Weight: {userProfile.weight}kg</Text>
                <Text style={styles.miniHeader}>Interests:</Text>
                <View style={{flexDirection:'row'}}>
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


const mapStateToProps = (state) => ({
    userProfile: state.userProfile
})

export default connect(mapStateToProps)(Profile);


const styles = StyleSheet.create({
    activityItem:{
        marginTop: 10,
        marginHorizontal: 10
    },
    miniHeader:{
        fontSize:20,
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