import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomHeader from "../navigation/CustomHeader";

export default function HomeDetails({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Home details" navigation={navigation} />
            <View style={styles.container}>
                <Text> Home details page </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    }
})