import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginHeader from '../components/LoginHeader';
import { AppLoading } from 'expo';
import { Asset } from "expo-asset";

import AnimatedLoginForm from "../components/AnimatedLoginForm";
import LoginForm from "../components/LoginForm";

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        }
    }


    async _loadAssetsAsync() {
        const imageAssets = cacheImages([require('../assets/background-wallpaper.jpg')]);

        await Promise.all([...imageAssets]);
    }
    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            )
        }
        return (
            <LoginForm/>
        )
    }
}

const styles = StyleSheet.create({
  
})