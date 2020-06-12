import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import NewLoginPage from "../Pages/NewLogin";
import NewRegisterPage from "../Pages/NewRegisterPage";

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SignInScreen" component={NewLoginPage}/>
        <RootStack.Screen name="SignUpScreen" component={NewRegisterPage}/>
    </RootStack.Navigator>
);

export default RootStackScreen;