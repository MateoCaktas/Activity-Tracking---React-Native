import React from "react";
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack"

import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";

import HomeDetails from "../screens/HomeDetails"
import AboutDetails from "../screens/AboutDetails";

import InitialPage from "../screens/InitialPage";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import ActivityDetails from "../screens/ActivityDetails";
import EditProfileScreen from "../screens/EditProfile";

import HomeIcon from "../assets/DrawerMenu/home-white.png";
import EditProfileIcon from "../assets/DrawerMenu/edit-profile.png";
import LogoutIcon from "../assets/DrawerMenu/logout-white.png";

import AddActivity from "../screens/AddActivity";

import { logout } from "../redux/actions";

const StackHome = createStackNavigator();
const StackProfile = createStackNavigator();
const Container = createBottomTabNavigator();

const navOptionHandler = () => ({
    headerShown: false
})

const logoutUser = (navigation) => {
    logout();
    navigation.navigate('InitialPage')
}

function HomeStack() {
    return (
        <StackHome.Navigator initialRouteName="Home">
            <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
            <StackHome.Screen name="HomeDetails" component={HomeDetails} options={navOptionHandler} />
        </StackHome.Navigator>
    )
}

function ProfileStack() {
    return (
        <StackProfile.Navigator initialRouteName="Profile">
            <StackProfile.Screen name="Profile" component={ProfileScreen} options={navOptionHandler} />
            <StackProfile.Screen name="AboutDetails" component={AboutDetails} options={navOptionHandler} />
        </StackProfile.Navigator>
    )
}

function CustomDrawerContent(props) {
    return (
        <SafeAreaView style={styles.menuContainer}>
            <View style={styles.userImageContainer}>
                <Image source={require('../assets/DrawerMenu/user-profile-white.png')} style={styles.userImage} />
            </View>
            <ScrollView style={{ marginLeft: 20 }}>
                <TouchableOpacity
                    style={styles.menuOption}
                    onPress={() => props.navigation.navigate('StartPage')}
                >
                    <View style={styles.sideMenuIconContainer}>
                        <Image source={HomeIcon} style={styles.sideMenuIcon} />
                    </View>
                    <Text style={styles.menuOptionText}> Home </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuOption}
                    onPress={() => props.navigation.navigate('EditProfile')}
                >
                    <View style={styles.sideMenuIconContainer}>
                        <Image source={EditProfileIcon} style={styles.sideMenuIcon} />
                    </View>
                    <Text style={styles.menuOptionText}> Edit profile </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuOption}
                    onPress={() => logoutUser(props.navigation)}
                >
                    <View style={styles.sideMenuIconContainer}>
                        <Image source={LogoutIcon} style={{...styles.sideMenuIcon , marginLeft:5}} />
                    </View>
                    <Text style={styles.menuOptionText}> Logout </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

function AppNavigator() {
    return (
        <Container.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('../assets/TabMenu/home-focused.png')
                            : require('../assets/TabMenu/home.png');
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? require('../assets/TabMenu/profile-black.png')
                            : require('../assets/TabMenu/profile-black-outline.png');
                    }

                    // You can return any component that you like here!
                    return <Image source={iconName} style={styles.bottomMenuIcon}
                        resizeMode="contain" />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'purple',
                inactiveTintColor: 'gray',
            }}>
            <Container.Screen
                name="Home"
                component={HomeStack} />
            <Container.Screen
                name="Profile"
                component={ProfileStack} />
        </Container.Navigator>
    )
}
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="StartPage" drawerContent={props => CustomDrawerContent(props)}>
            <Drawer.Screen name="StartPage" component={AppNavigator} />
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
        </Drawer.Navigator>
    )
}

const StackApp = createStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <StackApp.Navigator initialRouteName="InitialPage">
                <StackApp.Screen name="LoggedIn" component={DrawerNavigator} options={navOptionHandler} />
                <StackApp.Screen name="InitialPage" component={InitialPage} options={navOptionHandler} />
                <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
                <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
                <StackApp.Screen name="ActivityDetails" component={ActivityDetails} options={navOptionHandler} />
                <StackApp.Screen name="AddActivity" component={AddActivity} options={navOptionHandler}/>
            </StackApp.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: 'purple'
    },
    userImageContainer: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor:'white',
        margin: 10
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    menuOption: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    sideMenuIconContainer:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width: 30,
        height: 30,
        padding: 2
    },
    sideMenuIcon: {
        width: 25,
        height: 25
    },
    menuOptionText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5
    },
    bottomMenuIcon: {
        width: 20,
        height: 20
    }
})
