import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import CustomHeader from "../navigation/CustomHeader";
import { SafeAreaView } from 'react-native-safe-area-context';
import { imageType, iconType } from "../components/Icons";
import ActivityParameter from "../components/ActivityParameter";

export default function ActivityDetails({ route, navigation }) {
    const {
        title,
        id,
        number,
        startDate,
        endDate,
        activityType,
        additionalInfo
    } = route.params.activity.activity;

    let activityImage = imageType(activityType);    

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title={title} navigation={navigation} />
            <View style={styles.imageContainer}>
                <Image source={activityImage} style={styles.image} />
            </View>
            {
                additionalInfo ?
                    (
                        additionalInfo.map(item => {
                            return (
                                <ActivityParameter props={item} key={item.key} />
                            )
                        })
                    )
                    :
                    null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imageContainer: {
        borderBottomColor: 'purple',
        borderBottomWidth: 1
    },
    image: {
        width: '100%',
        height: 150
    },
    text: {
        marginTop: 20,
        alignSelf: 'center'
    }
})