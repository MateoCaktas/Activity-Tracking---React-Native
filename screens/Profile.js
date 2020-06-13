import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileImage from "../assets/profile-image-black.png"
import CustomHeader from "../navigation/CustomHeader";

export default function Profile({ navigation }) {
    let activities = ["Music","Football", "Hiking"];

    return (
        <SafeAreaView style={{ flex: 1, alignItems:'center'}}>
            <CustomHeader title="Profile" isHome={true} navigation={navigation} />
            <View style={{flex:1,width: '90%'}}>
                <Image source={ProfileImage} style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 50 }} />
                <Text style={styles.name}> User's name</Text>
                <Text style={styles.info}>Height: 180cm</Text>
                <Text style={styles.info}>Weight: 82kg</Text>
                <Text style={styles.miniHeader}>Interests:</Text>
                <View style={{flexDirection:'row'}}>
                {
                    activities.map(activity => (
                        <Text style={styles.activityItem}>{activity}</Text>
                    ))
                }
                </View>
            </View>
        </SafeAreaView>
        /*<SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Profile" isHome={true} navigation={navigation} />
            <Text style={styles.text}> Profile page </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AboutDetails')}
                >
                    <Text style={styles.buttonText}> Go to About Details </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>*/
    )
}

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