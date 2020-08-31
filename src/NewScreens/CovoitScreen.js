import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ScrollView, SafeAreaView, Alert, Modal, TouchableHighlight, TextInput
} from 'react-native';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AuthAPI from "../services/AuthAPI";
import UsersAPI from "../services/UsersAPI";
import useInterval from "../Components/UseInterval";
import Toast from 'react-native-simple-toast';
import {AntDesign} from "@expo/vector-icons";


const NotifScreen = () => {

    const [show, setShow] = useState(false);
    const [reload, setReload] = useState(0);
    const [notifications, setNotifications] = useState({
        convocations: [],
        notif: []
    });
    const [justification, setJustification] = useState({
        reason: "",
        player: {},
        type: "",
    })

    const getUserId = async () => {
        const id = await AuthAPI.getId();
        fetchNotifications(id);
    }

    const fetchNotifications = async (id) => {
        const response = await UsersAPI.getNotifications(id);
        setNotifications(response);
    }

    const justif = (player, type) => {
        setShow(true);
        setJustification({
            reason: "",
            player: player,
            type: type,
        })
    }


    useInterval(() => {
        getUserId();
    }, 60000);

    useEffect(() => {
        getUserId();
    }, [reload]);

    const handleChange = ( value ) => {
        setJustification({...justification, ["reason"]: value});
    };

    const deleteNotif = async (player, type) => {
        try {
            if (type == "amical"){
                const userTeam = player.userTeam.replace("/api/user_teams/", "");
                const unOfficialMatch = player.unOfficialMatch.replace("/api/un_official_matches/", "");
                let post = {
                    userTeam: userTeam,
                    unOfficialMatch: unOfficialMatch,
                    accept: false,
                    reason: justification.reason
                }
                await UsersAPI.updatePlayer(post);
                setShow(false);
            } else if (type == "officiel") {
                player["hasRefused"] = true;
                player["refusedJustification"] = justification.reason;
                delete player["goal"];
                delete player["yellowCard"];
                delete player["redCard"];
                console.log(player);
                await UsersAPI.updateP(player.id, player);
                setShow(false);
            }
            Toast.show("Vous avez refusé la convocation");

        } catch (e) {
        }
        setReload(reload+1);
    }

    const acceptMatch = async (player, type) => {
        try {
            if (type == "amical"){
                const userTeam = player.userTeam.replace("/api/user_teams/", "");
                const unOfficialMatch = player.unOfficialMatch.replace("/api/un_official_matches/", "");
                let post = {
                    userTeam: userTeam,
                    unOfficialMatch: unOfficialMatch,
                    accept: true
                }
                await UsersAPI.updatePlayer(post)
            } else if (type == "officiel"){
                player["hasConfirmed"] = true;
                delete player["goal"];
                delete player["yellowCard"];
                delete player["redCard"];
                await UsersAPI.updateP(player.id, player);
            }
            Toast.show("Vous avez accepté la convocation");
        } catch (e) {
        }
        setReload(reload+1);
    }

    const removeNot = async (notifId) => {
        try {
            await UsersAPI.seenNotif({id: notifId});
        } catch (e) {
        }
        setReload(reload+1);
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex:1, alignItems: "flex-start", marginTop: 10}}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={show}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View>
                                        <Text style={{color: "#eb4034", textAlign: "center", fontSize: 18, marginBottom: 15}}>Justifiez votre absence </Text>
                                        <TextInput style={{borderWidth : 1, padding: 5, borderRadius: 10, width: 220}}  value={justification.reason}
                                                   onChangeText={handleChange}
                                                   placeholder={"Raison de l'absence"}/>
                                    </View>
                                    <View style={{flexDirection: "row",}}>
                                        <View>
                                            <TouchableHighlight
                                            style={{
                                                ...styles.openButton,
                                                backgroundColor: "#e88631",
                                                marginTop: 20,
                                                marginRight: 50,
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                            onPress={() => {
                                                setShow(false);
                                            }}
                                        >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>Fermer</Text>
                                        </TouchableHighlight>
                                        </View>
                                        <View>
                                            <TouchableHighlight
                                                style={{
                                                    ...styles.openButton,
                                                    backgroundColor: "#eb4034",
                                                    marginTop: 20,
                                                    marginLeft: 50,
                                                    padding: 10,
                                                    borderRadius: 10,
                                                }}
                                                onPress={() => {
                                                    deleteNotif(justification.player, justification.type)
                                                }}
                                            >
                                                <Text style={{...styles.textStyle, color: "#fff",}}>Envoyer</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <View>
                            {notifications["convocations"].map((not, index) =>
                                <View key={index} >
                                    <Text style={{textAlign: "center"}}>{not.name}</Text>
                                    <View >
                                        <View style={{ padding: 10, }}>
                                            <Text style={{textAlign: "center"}}>Vous avez été convoqué pour le match : {not.match}</Text>
                                        </View>
                                        <View style={{marginLeft : 10, flexDirection: "row", justifyContent: "center"}}>
                                            <TouchableOpacity style={{backgroundColor: "#e88631",  borderRadius: 20, padding: 8, marginRight: 20,}}
                                                              onPress={() => acceptMatch(not["joueur"], not["type"])}>
                                                <Text style={{ color:"#fff"}}>Accepter</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{backgroundColor: "#eb4034", marginLeft: 20,  borderRadius: 20, padding: 8,}}
                                                              onPress={() => justif(not["joueur"], not["type"])}>
                                                <Text style={{ color:"#fff"}}>Refuser</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                            marginTop: 15,
                                            marginBottom: 10,
                                        }}>

                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                        {notifications["notif"].map((not, index) =>
                            <View key={index} style={{padding: 5, marginLeft: 10, marginVertical: 3}}>
                                <View>
                                    <View style={{flexDirection: "row", }}>
                                        <Text style={{width : 250, }}>{not.message}</Text>
                                        <View style={{marginLeft : 25, justifyContent: "center"}}>
                                            <TouchableOpacity style={{backgroundColor: "#eb4034",  borderRadius: 20, padding: 4,}} onPress={() => removeNot(not.id)}>
                                                <Text style={{ color:"#fff"}}><AntDesign name={"close"} size={25}
                                                                                         color="white" ></AntDesign></Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        marginTop: 15
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
})

export default NotifScreen;