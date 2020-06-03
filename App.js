import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import authAPI from "./src/services/AuthAPI";
import { enableScreens } from 'react-native-screens'
import AppDrawerNavigator from "./src/navigation/newNav";

enableScreens();

export default function App() {
    authAPI.setup();

    const [isAuthenticated, setIsAuthenticated] =  useState( false);

    useEffect(() => {
        initState();
    }, []) ;

    useEffect(() => {
        console.log(isAuthenticated) ;
    }, [isAuthenticated]) ;

    async function initState () {
        const authenticated = await authAPI.isAuthenticated();
        setIsAuthenticated(authenticated);
    }

    console.log(isAuthenticated);

  return (
      <>
          <AppDrawerNavigator/>
      </>
  );
}

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

