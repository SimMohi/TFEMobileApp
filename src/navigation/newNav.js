import React from 'react';
import { SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import HomeScreen from "../NewScreens/HomeScreen";
import ProfileScreen from "../NewScreens/ProfileScreen";
import {createAppContainer} from "react-navigation";


const CustomDrawerComponent = props => {
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <DrawerItems {...props}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const AppDrawerNavigator = createDrawerNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen
}, {
    contentComponent: CustomDrawerComponent
});

export default createAppContainer(AppDrawerNavigator);