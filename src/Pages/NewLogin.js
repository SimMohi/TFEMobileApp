import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Logo from "../Components/Logo";
import LoginForm from "../Components/LoginForm";
import {Actions} from 'react-native-router-flux';
import {AuthContext} from "../Components/context";


const NewLoginPage = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Logo />
            </View>
            <LoginForm/>
            <View style={styles.signupTextCont}>
                <TouchableOpacity onPress={()=> navigation.navigate("SignUpScreen")}><Text style={styles.signUpText}>Je n'ai pas de compte !</Text></TouchableOpacity>
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
    },
    logo: {
        flex: 1,
        marginTop: 100,
    }
});


export default NewLoginPage