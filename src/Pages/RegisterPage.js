import React, {useState} from 'react';
import {View, Text, StyleSheet, Button ,TextInput, TouchableOpacity} from 'react-native'

const RegisterPage = () => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChangeFirstName = (firstName) => {
        let copy = JSON.parse(JSON.stringify(user));
        copy.username = firstName;
        setUser(copy);
    };

    // const handleChangePassword = (password) => {
    //     let copy = JSON.parse(JSON.stringify(user));
    //     copy.password = password;
    //     setCredentials(copy);
    // };

    return (
        <View>
            <View>
                <TextInput value={user.firstName} onChangeText={handleChangeFirstName} placeholder={"Votre prénom"}/>
                {/*<TextInput value={user.lastName} onChangeText={handleChangeUsername} placeholder={"Votre nom"}/>*/}
                {/*<TextInput type={"email"} value={user.email} onChangeText={handleChangeUsername}*/}
                           {/*placeholder={"Votre email"}/>*/}
                {/*<TextInput secureTextEntry={true} value={credentials.password} onChangeText={handleChangePassword}*/}
                           {/*placeholder={"Votre mot de passe"}/>*/}
            </View>
        </View>
    )
}

export default RegisterPage