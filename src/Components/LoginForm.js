import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import axios from "axios";
import {API_URL, USERS_API} from "../config";
import Toast from 'react-native-simple-toast';
import AuthAPI from "../services/AuthAPI";
import {AuthContext} from "../Components/context";


const LoginForm = ({navigation}) => {

    const  { signIn } = React.useContext(AuthContext);
    const {setIsAuthenticated} = useContext(AuthContext);


    const [credentials, setCredentials] = useState({
        username: "simon.mohimont@hotmail.com",
        password: "password",
    });

    const login = async ()=> {
        try {
            const firstResponse = await Promise.all([
                    axios.post(API_URL + "/api/login_check", credentials),
                ]
            );
            const token = firstResponse[0]["data"]["token"];

            await AsyncStorage.setItem(
                'userToken',
                token
            );
            AuthAPI.setAxiosToken(token);
            const secondResponse = await axios.get(USERS_API + "?email=" + credentials["username"]);
            const isAccepted = secondResponse["data"]["hydra:member"][0]["isAccepted"];
            if (isAccepted == false){
                Toast.show("Votre utilisateur n'a pas encore été accepté");
            } else {
                signIn(token)
            }
        }catch (e) {
            Toast.show("Email ou mot de passe incorrect");
        }
    }


    const handleChangeUsername = (username) => {
        let copy = JSON.parse(JSON.stringify(credentials));
        copy.username = username;
        setCredentials(copy);
    };

    const handleChangePassword = (password) => {
        let copy = JSON.parse(JSON.stringify(credentials));
        copy.password = password;
        setCredentials(copy);
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputBox} value={credentials.username} onChangeText={handleChangeUsername} placeholder={"Votre email"} placeholderTextColor={"#ffffff"}/>
            <TextInput style={styles.inputBox} value={credentials.password} onChangeText={handleChangePassword} secureTextEntry={true} placeholder={"Votre mot de passe"} placeholderTextColor={"#ffffff"}/>
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.button} onPress={logout}>*/}
                {/*<Text style={styles.buttonText}>Se déconnecter</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputBox: {
        height: 60,
        width: 300,
        backgroundColor: "#ff7c60",
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#ffffff",
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: "center",
    },
    button: {
        marginTop: 25,
        width: 150,
        backgroundColor: '#801515',
        borderRadius: 25,
        marginVertical: 10,
        padding: 16,
    }
});

export default LoginForm;