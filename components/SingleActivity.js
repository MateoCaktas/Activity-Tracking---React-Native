import React from "react";
import { ImageBackground, StyleSheet, View, Text, Image } from "react-native"
import ClockIcon from "../assets/Activities/clock-icon.png";
import CalendarIcon from "../assets/Activities/calendar.png";
import { imageType, iconType } from "./Icons";

export default function Activity({ activity }) {
    let activityImage = imageType(activity.activityType);
    let activityIcon = iconType(activity.activityType);

    let startingDate = new Date(activity.startDate);
    let endingDate = new Date(activity.endDate);

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.headerText}>{activity.title}</Text>
            </View>
            <View style={styles.containerData}>
                <ImageBackground source={activityImage} style={styles.backgroundImage}>
                </ImageBackground>
                    <View style={{...styles.row, justifyContent:'flex-start', marginLeft: 65}}>
                        <View>
                            <Text>{activity.activityType}</Text>
                            <Image source={activityIcon} style={{ width: 30, height: 30 }} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text>{startingDate.getDate()}-{(startingDate.getMonth()+1).toString()}-{startingDate.getFullYear()}</Text>
                            <Image source={CalendarIcon} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                        </View>
                        <View>
                            <Text>
                                {startingDate.getHours()}:{startingDate.getMinutes()} - 
                                {endingDate.getHours()}:{endingDate.getMinutes()}
                            </Text>
                            <Image source={ClockIcon} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                        </View>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        height: 200,
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: 5,
        flexWrap: 'wrap',
    },
    containerHeader: {
        width: '100%',
        height: 40,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        flexDirection: 'row'
    },
    headerText: {
        backgroundColor: 'purple',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        paddingTop: 5,
        paddingLeft: 5,
        flex: 1
    },
    backgroundImage: {
        width: '100%',
        height:'100%',
        position:'absolute',
        opacity:0.2 
    },
    image: {
        flex: 5,
        alignSelf: 'flex-end',
        width: '100%',
        height: '100%',
        opacity: 0.3
    },
    containerData: {
        flex: 1,
    },
    containerText: {
        fontSize: 15
    },
    row: {
        zIndex: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})