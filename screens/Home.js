import React,{useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomHeader from "../navigation/CustomHeader";
import Activities from "../components/Activities";
import { ScrollView } from 'react-native-gesture-handler';

import { FAB } from "react-native-paper";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function Home({ userActivities }) {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FAB
            style={styles.fab}
            medium
            label="Add"
            color='white'
            icon="plus"
            onPress={() => navigation.navigate('AddActivity')}
            />
            
            <ScrollView>
                <CustomHeader title="Home" isHome={true} navigation={navigation} />
                <View style={styles.container}>
                    <Activities />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('HomeDetails')}
                    >
                        <Text style={styles.buttonText}> Go to Home Details </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    userActivities: state.userActivities
})

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    fab:{
        zIndex: 9999,
        position: 'absolute',
        padding:5,
        margin: 16,
        right:0,
        bottom:0,
        backgroundColor: 'purple'
    },
    text:{
        alignSelf:'center',
        marginTop: 20
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    button:{
        marginBottom: 30,
        backgroundColor: 'purple',
        borderRadius: 3,
        height: 40,
        padding: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText: {
        color:'white'
    }
})

