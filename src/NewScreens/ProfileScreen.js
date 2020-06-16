import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import AuthAPI from "../services/AuthAPI";
import UsersAPI from "../services/UsersAPI";
import { DataTable } from 'react-native-paper';
import axios from "axios";
import {API_URL, USERS_API} from "../config";



const ProfileScreen = () => {

    const [profil, setProfil] = useState({});
    const [infos, setInfos] = useState([]);

    const getUserId = async () => {
        const id = await AuthAPI.getId();
        fetchProfil(id);
    }


    const fetchProfil = async (id)=>{
        try{
            const res1 = await UsersAPI.profile(id);
            setInfos(res1["infos"]);
        } catch (e) {
            console.log(e);
        }
        fetchUser(id);
    }

    const fetchUser = async (id) => {
        try{
            const res2 = await UsersAPI.find(id);
            setProfil(res2);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserId();
    }, []);

    return(
        <>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Profil de {profil.firstName} {profil.lastName}</Text>
                </View>
                <View style={styles.littleContainer}>
                    <Text style={styles.text}>Email : {profil.email}</Text>
                    <Text style={styles.text}>Telephone : {profil.gsm}</Text>
                    {typeof profil.address != "undefined" &&
                        <Text style={styles.text}>Adresse : {"Rue " + profil.address.street + " " + profil.address.number + " " + profil.address.box + ", " + profil.address.code + " " + profil.address.city}</Text>
                    }
                </View>
                <Text style={styles.stat}>Ces statistiques</Text>
                    {infos.map((info, index) =>
                        <DataTable key={index} style={styles.littleContainer}>
                            <Text>{info.team}</Text>
                            <DataTable.Header>
                                <DataTable.Title numeric>Matchs</DataTable.Title>
                                <DataTable.Title numeric>Goals</DataTable.Title>
                                <DataTable.Title numeric>Jaunes</DataTable.Title>
                                <DataTable.Title numeric>Rouges</DataTable.Title>
                                <DataTable.Title numeric>Entrai</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell numeric>{info.played}</DataTable.Cell>
                                <DataTable.Cell numeric>{info.goal}</DataTable.Cell>
                                <DataTable.Cell numeric>{info.yellowCard}</DataTable.Cell>
                                <DataTable.Cell numeric>{info.redCard}</DataTable.Cell>
                                <DataTable.Cell numeric>{info.training}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    )}

            </View>
        </>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize : 22,
        marginTop: 20,
        fontWeight: 'bold',
        color : "#f54b42"
    },
    titleContainer: {
        margin: 10,
        color : "#f54b42",
    },
    littleContainer: {
        borderWidth: 1,
        backgroundColor: '#f2f5f3',
        borderRadius:10,
        borderColor: '#fff',
        padding: 10,
        marginVertical: 10,

    },
    text: {
        marginVertical: 4,
    },
    stat:{
        color : "#f54b42",
        fontSize : 15,
        fontWeight: 'bold',
        marginVertical: 10,
    }

})