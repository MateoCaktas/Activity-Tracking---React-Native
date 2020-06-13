import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ActivityParameter({ props }) {
    let { value, key } = props;
    return (
        <View style={styles.container}>
            <Text>{key}</Text>
            <Text>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:20
    }
})