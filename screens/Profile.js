import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileImage from "../assets/profile-image-black.png"
import CustomHeader from "../navigation/CustomHeader";
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

function Profile({ userProfile }) {
    const navigation = useNavigation();
    const [isFocused, changeFocus] = useState(false);

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
           changeFocus(true);
        })

        const blur = navigation.addListener('blur', () => {
            changeFocus(false);
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, alignItems:'center'}}>
            <CustomHeader title="Profile" isHome={true} navigation={navigation} />
            <View style={{flex:1,width: '90%'}}>
                <Image source={userProfile.defaultImage ? ProfileImage : { uri: userProfile.capturedPhoto}} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 40, borderRadius: 25 }} />
                <Text style={styles.name}> {userProfile.userName ? userProfile.userName : null}</Text>
                <Text style={styles.info}>Email: {userProfile.email}</Text>
                <Text style={styles.info}>Height: {userProfile.height}cm</Text>
                <Text style={styles.info}>Weight: {userProfile.weight}kg</Text>
                <Text style={styles.miniHeader}>Interests:</Text>
                <View>
                {
                    userProfile.interests.map(interest => (
                        <Text style={styles.interestItem} key={interest}>{interest}</Text>
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
    interestItem: {        
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