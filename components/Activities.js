import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import Activity from "./SingleActivity";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"

function Activities({userActivities}) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Items </Text>
            <View>
                {
                userActivities.map(activity=> (
                    <TouchableOpacity
                    key={activity.id}
                    onPress={()=> {
                        navigation.navigate('ActivityDetails',{
                            activity:{activity}
                        });
                    }
                    }>
                        <Activity activity={activity}/>
                    </TouchableOpacity>
                ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    title: {
        marginTop: 30,
        marginLeft: 20,
        fontWeight:'bold',
        fontSize: 30
    }
})

const mapStateToProps = (state) => ({
    userActivities: state.userActivities
})

export default connect(mapStateToProps)(Activities);