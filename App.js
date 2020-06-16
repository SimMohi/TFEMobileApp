import React, {useState, useEffect, useMemo} from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from "@react-navigation/drawer";
import RootStackScreen from "./src/navigation/RootStackScreen";
import {AuthContext} from "./src/Components/context";
import {DrawerContent} from "./src/navigation/DrawerContent";
import axios from "axios";
import ProfileScreen from "./src/NewScreens/ProfileScreen";
import {subscribeToNotifications} from "./src/services/notification";
import ChatPage from "./src/NewScreens/ChatScreen";
import HomeScreen from "./src/NewScreens/HomeScreen";
import NotifScreen from "./src/NewScreens/CovoitScreen";

const HomeStack = createStackNavigator();
const ProfilStack = createStackNavigator();
const ChatStack = createStackNavigator();
const NotifStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: "#eb4034",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
            fontWeight: "bold",
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title: "Calendrier",
            headerLeft: () => (
                <Icon.Button name={"ios-menu"} size={25}
                             backgroundColor="#eb4034" onPress={()=> navigation.openDrawer()}></Icon.Button>
            )
        }}/>
    </HomeStack.Navigator>
)

const ProfilStackScreen = ({navigation}) => (
    <ProfilStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: "#eb4034",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
            fontWeight: "bold",
        }
    }}>
        <ProfilStack.Screen name="Profil" component={ProfileScreen} options={{
            title: "Profil",
            headerLeft: () => (
                <Icon.Button name={"ios-menu"} size={25}
                             backgroundColor="#eb4034" onPress={()=> navigation.openDrawer()}></Icon.Button>
            )
        }}/>
    </ProfilStack.Navigator>
)

const ChatStackscreen = ({navigation}) => (
    <ChatStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: "#eb4034",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
            fontWeight: "bold",
        }
    }}>
        <ChatStack.Screen name="Chat" component={ChatPage} options={{
            title: "Chat",
            headerLeft: () => (
                <Icon.Button name={"ios-menu"} size={25}
                             backgroundColor="#eb4034" onPress={()=> navigation.openDrawer()}></Icon.Button>
            )
        }}/>
    </ChatStack.Navigator>
)

const NotifStackscreen = ({navigation}) => (
    <NotifStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: "#eb4034",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
            fontWeight: "bold",
        }
    }}>
        <NotifStack.Screen name="Notif" component={NotifScreen} options={{
            title: "Notifications",
            headerLeft: () => (
                <Icon.Button name={"ios-menu"} size={25}
                             backgroundColor="#eb4034" onPress={()=> navigation.openDrawer()}></Icon.Button>
            )
        }}/>
    </NotifStack.Navigator>
)


const  App = () =>  {

    const initialLoginState = {
        isLoading: true,
        username: true,
        userToken: null,
    }

    const loginReducer = (prevState, action) => {
        switch( action.type ) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (userToken) => {
            subscribeToNotifications();
            dispatch({ type: 'LOGIN', token: userToken });
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                delete axios.defaults.headers["Authorization"];
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
        },
    }), []);


    useEffect(() => {
        setTimeout(async() => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch(e) {
                console.log(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
    }, []);

    if( loginState.isLoading ) {
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            {loginState.userToken === null &&
            <RootStackScreen/>
            ||
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                <Drawer.Screen name="Home" component={homeStackScreen}/>
                <Drawer.Screen name="Profil" component={ProfilStackScreen}/>
                <Drawer.Screen name="Chat" component={ChatStackscreen} />
                <Drawer.Screen name="Notif" component={NotifStackscreen} />
            </Drawer.Navigator>
            }
        </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 200,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }

})

