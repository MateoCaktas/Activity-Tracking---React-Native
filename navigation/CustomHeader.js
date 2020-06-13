import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomHeader({ title, isHome, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                {
                    isHome ?
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image style={{ width: 30, height: 30, marginLeft: 20 }}
                            source={require('../assets/menu-white.png')} />
                        </TouchableOpacity>

                        :
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
                            onPress={() => navigation.goBack('')}
                        >
                            <Image style={{ width: 20, height: 20, marginLeft: 10 }}
                                source={require('../assets/back-arrow-white.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                }

            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}> {title} </Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'purple'
    },
    icon: {
        flex:1,
        justifyContent: 'center'
    },
    title:{
        flex:2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        textAlign:'center',
        fontSize: 25,
        fontWeight: 'bold',
        color:'white'
    }
})