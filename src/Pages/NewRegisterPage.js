import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import Logo from "../Components/Logo";
import {Actions} from 'react-native-router-flux';
import UsersAPI from "../services/UsersAPI";
import Toast from 'react-native-simple-toast';
import {AuthContext} from "../Components/context";


const NewRegisterPage = ({navigation}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const submit = async () => {
        if (user.password !== user.passwordConfirm) {
            Toast.show('Vos mots de passe ne correspondent pas');
            return;
        }
        try {
            console.log(user);
            await UsersAPI.create(user);
            Toast.show('Votre utilisateur a bien été créé');
            goBack();
        } catch (error) {
            const { violations } = error.response.data;
            if (violations){
                Toast.show(violations[0].message);
            }
        }
    }

    const changeFirstName = (firstName) => {
        let copy = JSON.parse(JSON.stringify(user));
        copy.firstName = firstName;
        setUser(copy);
    }

    const changeLastName = (lastName) => {
        let copy = JSON.parse(JSON.stringify(user));
        copy.lastName = lastName;
        setUser(copy);
    }
    const changeEmail = (email) => {
        let copy = JSON.parse(JSON.stringify(user));
        copy.email = email;
        setUser(copy);
    }
    const changePassword = (pass) => {
        let copy = JSON.parse(JSON.stringify(user));
        copy.password = pass;
        setUser(copy);
    }
    const changePasswordConfirm = (pass) => {
        let copy = JSON.parse(JSON.stringify(user));
        copy.passwordConfirm = pass;
        setUser(copy);
    }

    return (
        <>
            <View style={styles.container}>
                <Logo/>
                <View style={styles.form}>
                    <TextInput value={user.firstName} style={styles.inputBox} onChangeText={changeFirstName} placeholder={"Votre prénom"} placeholderTextColor={"#ffffff"}/>
                    <TextInput value={user.lastName} style={styles.inputBox}  onChangeText={changeLastName} placeholder={"Votre nom"} placeholderTextColor={"#ffffff"}/>
                    <TextInput value={user.email} style={styles.inputBox} onChangeText={changeEmail} placeholder={"Votre email"} placeholderTextColor={"#ffffff"}/>
                    <TextInput value={user.password} style={styles.inputBox} onChangeText={changePassword} secureTextEntry={true} placeholder={"Votre mot de passe"} placeholderTextColor={"#ffffff"}/>
                    <TextInput value={user.passwordConfirm} style={styles.inputBox} onChangeText={changePasswordConfirm} secureTextEntry={true} placeholder={"Encore votre mot de passe"} placeholderTextColor={"#ffffff"}/>
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>S'enregistrer</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupTextCont}>
                    <TouchableOpacity onPress={()=> navigation.navigate("SignInScreen")}>
                        <Text style={styles.signUpText}>J'ai déjà un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#ffffff",
        fontSize: 25,
        margin: 15,
        marginBottom: 100,
    },
    container: {
        flexGrow: 1,
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
    },
    form: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default NewRegisterPage