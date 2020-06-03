import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from "../Components/Logo";
import LoginForm from "../Components/LoginForm";
import {Actions} from 'react-native-router-flux';



const NewLoginPage = () => {

    const goToRegister = () => {
        Actions.register();
    }

    return (
        <View style={styles.container}>
            <Logo/>
            <LoginForm/>
            <View style={styles.signupTextCont}>
                <TouchableOpacity onPress={goToRegister}><Text style={styles.signUpText}>Je n'ai pas de compte !</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6372c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 25,
    },
    signUpText : {
        color: "#ffffff"
    }
});


export default NewLoginPage