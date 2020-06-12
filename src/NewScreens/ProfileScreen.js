import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, AsyncStorage} from 'react-native';
import {Header, Icon, Left} from "native-base";
import AuthAPI from "../services/AuthAPI";
import UsersAPI from "../services/UsersAPI";


const ProfileScreen = () => {

    const fetchUsers = async ()=>{
        try{
            const response = await UsersAPI.findAll();
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log("aa");
        fetchUsers();
    }, []);

    return(
        <View>
            <Text>Yo</Text>
        </View>
    )
}

export default ProfileScreen