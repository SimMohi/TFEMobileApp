import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Modal, Alert, TouchableHighlight, TextInput } from 'react-native';
import {Header, Left, Right, Icon} from 'native-base'
import UsersAPI from "../services/UsersAPI";
import AuthAPI from "../services/AuthAPI";
import DateFunctions from "../services/DateFunctions";
import Toast from 'react-native-simple-toast';
import HomePageAPI from "../services/HomePageAPI";

const HomeScreen = ({navigation}) => {

    const [keys, setKeys] = useState([]);
    const [infos, setInfos] = useState({});
    const [modalVisible, setModalVisible] = useState([false, false]);
    const [modalInfos, setModalInfos] = useState({});
    const [reason, setReason] = useState("");
    const [idUser, setIdUser] = useState(0);
    const [reload, setReload] = useState(0);


    const getCalendar = async () => {
        const id = await AuthAPI.getId();
        const response = await UsersAPI.getCalendarWeek(id);
        let keysR = Object.keys(response);
        keysR.sort(DateFunctions.orderByDate);
        setKeys(keysR);
        setInfos(response);
        setIdUser(id);
    }

    const  handleChangeReason = (value) => {
        setReason(value);
    }
    const handleShow = (i, inf) => {
        if (inf.type == "Training"){
            let info = {
                id: inf.id,
                title : inf.title,
                hour : DateFunctions.getHoursHMV2(inf.start, 1),
                end : DateFunctions.getHoursHMV2(inf.end, 1),
                type : inf.type,
                abs : inf.abs
            }
            setModalInfos(info)
        } else if (inf.type == "Event"){
            let info = {
                id: inf.id,
                title : inf.title,
                descr : inf.description,
                start : DateFunctions.getHoursHMV2(inf.start, ),
                end : DateFunctions.dateFormatFrDMHM(inf.end),
                type : inf.type,
                sub : inf.sub
            }
            setModalInfos(info)
        } else if (inf.type == "Match"){
            console.log(inf);
            let info = {
                id: inf.id,
                title : inf.title,
                hour : DateFunctions.getHoursHMV2(inf.start),
                type : inf.type,
                address : inf.address,
                desc : inf["compet"],
            }
            if(inf["appointment"] !== null){
                info.appointment = inf.appointment
            }
            setModalInfos(info)
    } else if (inf.type == "Amical") {
        let info = {
            id: inf.id,
            title: inf.title,
            hour: DateFunctions.getHoursHMV2(inf.start, 1),
            type: inf.type,
            address: inf.address,
            desc : "Match Amical"
        }
            if(inf["appointment"] !== null){
                info.appointment = inf.appointment
            } else {
                info.appointment = null
            }
        setModalInfos(info);
    }
        let copy = [...modalVisible];
        copy[i] = true;
        setModalVisible(copy);
    }

    const handleClose = () => {
        let copy = [...modalVisible];
        for (let i = 0; i < copy.length; i++){
            copy[i] = false;
        }
        setReason("");
        setModalVisible(copy);
    }

    const submitAbsence = async (idTraining) => {
        let post = {
            reason: reason,
            idUser: idUser,
            idTraining: idTraining
        }
        try{
            await HomePageAPI.postAbsence(post);
            Toast.show("Absence encodée avec succès");
            let copy = JSON.parse(JSON.stringify(modalInfos));
            copy.abs = true;
            setModalInfos(copy);
        } catch (e) {
        }
        setReason("");
        setReload(reload+1);
    }

    const deleteAbsence = async (idTraining) => {
        let post = {
            idUser: idUser,
            idTraining: idTraining
        }
        try{
            await HomePageAPI.remAbsence(post);
            Toast.show("Absence supprimée avec succès");
            let copy = JSON.parse(JSON.stringify(modalInfos));
            copy.abs = false;
            setModalInfos(copy);
        } catch (e) {
        }
        setReload(reload+1);
    }

    const subscribeEvent = async (idEventTeam) => {
        const data = {
            user: idUser,
            eventTeam: idEventTeam,
        }
        try {
            await HomePageAPI.createUTE(data);
            Toast.show("Vous êtes inscrits à l'évenement");
            let copy = JSON.parse(JSON.stringify(modalInfos));
            copy.sub = true;
            setModalInfos(copy);
        } catch (e) {
            alert(e);
        }
        setReload(reload+1);
    }


    const unSubscribeEvent = async (idEventTeam) => {
        const data = {
            user: idUser,
            eventTeam: idEventTeam,
        }
        try {
            await HomePageAPI.unSubUTE(data);
            Toast.show("désinscription réussie");
            let copy = JSON.parse(JSON.stringify(modalInfos));
            copy.sub = false;
            setModalInfos(copy);
        } catch (e) {
        }
        setReload(reload+1);
    }

    useEffect(() => {
        getCalendar();
    }, [reload]);

    console.log(modalInfos);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible[1]}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{modalInfos.title}</Text>
                                <Text style={styles.modalText}>Description : {modalInfos.descr}</Text>
                                <Text style={styles.modalText}>Début : {modalInfos.start}</Text>
                                <Text style={styles.modalText}>Fin : {modalInfos.end}</Text>
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
                                                handleClose();
                                            }}
                                        >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>Fermer</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View>
                                        {modalInfos.sub == false &&
                                        <TouchableHighlight
                                            style={{
                                                ...styles.openButton,
                                                backgroundColor: "#e88631",
                                                marginTop: 20,
                                                marginLeft: 50,
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                            onPress={() => {
                                            subscribeEvent(modalInfos.id);
                                        }}
                                            >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>S'inscire</Text>
                                            </TouchableHighlight>
                                            ||
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
                                                unSubscribeEvent(modalInfos.id);
                                            }}
                                        >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>Se désinscire</Text>
                                        </TouchableHighlight>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible[0]}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{modalInfos.title}</Text>
                                <Text style={styles.modalText}>Début : {modalInfos.hour}</Text>
                                {modalInfos.type != "Amical" && modalInfos.type != "Match" &&
                                    <Text style={styles.modalText}>Fin : {modalInfos.end}</Text>
                                    ||
                                    <>
                                    <Text style={styles.modalText}>Adresse : {modalInfos.address}</Text>
                                    <Text style={styles.modalText}>{modalInfos.desc}</Text>
                                        {modalInfos.appointment !== null &&
                                            <Text>Heure de RDV : {DateFunctions.getHoursHMV2(modalInfos.appointment)}</Text>
                                        }
                                    <View style={{flexDirection: "row",}}>
                                        <TouchableHighlight
                                            style={{
                                                ...styles.openButton,
                                                backgroundColor: "#e88631",
                                                marginTop: 20,
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                            onPress={() => {
                                                handleClose();
                                            }}
                                        >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>Fermer</Text>
                                        </TouchableHighlight>
                                    </View>
                                    </>
                                }
                                {modalInfos.type == "Training" &&
                                 modalInfos.abs == false &&
                                    <View>
                                        <Text style={{color: "#eb4034", marginVertical: 5, textAlign: "center" }}>Prévenir une absence ? </Text>
                                        <TextInput style={{borderWidth : 1, padding: 5, borderRadius: 10, width: 220}}  value={reason} onChangeText={handleChangeReason}
                                                   placeholder={"Raison de l'absence"}/>

                                    </View>
                                }
                                {modalInfos.type == "Training" &&
                                modalInfos.abs == true &&

                                <View style={{flexDirection: "row",}}>
                                    <View>
                                        <TouchableHighlight
                                            style={{
                                                ...styles.openButton,
                                                backgroundColor: "#e88631",
                                                marginTop: 20,
                                                marginRight: 30,
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                            onPress={() => {
                                                handleClose();
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
                                                marginLeft: 30,
                                                padding: 10,
                                                borderRadius: 10,
                                            }}
                                            onPress={() => {
                                                deleteAbsence(modalInfos.id);
                                            }}
                                        >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>Annuler Absence</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                    || modalInfos.type == "Training" &&
                                modalInfos.abs == false &&
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
                                                handleClose();
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
                                                submitAbsence(modalInfos.id);
                                            }}
                                        >
                                            <Text style={{...styles.textStyle, color: "#fff",}}>Envoyer</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                }
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        {keys.map((date, index) =>
                            <View key={index} style={{marginVertical: 10}}>
                                <Text style={{marginVertical: 5, textAlign: "center", fontSize: 18, color: "#eb4034"}}>{DateFunctions.dateFormatFrDM(date)}</Text>
                                {typeof infos[date] != "undefined" && infos[date].map((inf, index) =>
                                    inf["type"] == "Training" &&
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => handleShow(0, inf)} >
                                            <Text style={{height: 50, backgroundColor: "#eb4034", padding: 5, width: 500, textAlign: "center", color: "#fff", marginVertical: 5}}>{inf.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    || inf["type"] == "Amical" &&
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => handleShow(0, inf)}>
                                            <Text style={{height: 50,backgroundColor: "#e88631", padding: 5, width: 500, textAlign: "center", color: "#fff", marginVertical: 5}}>{inf.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    ||
                                    inf["type"] == "Event" &&
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => handleShow(1, inf)}>
                                            <Text style={{height: 50,backgroundColor: "#ffd257", padding: 5, width: 500, textAlign: "center", color: "#fff", marginVertical: 5}}>{inf.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    ||
                                    inf["type"] == "Match" &&
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => handleShow(0, inf)}>
                                            <Text style={{height: 50,backgroundColor: "#e88631", padding: 5, width: 500, textAlign: "center", color: "#fff", marginVertical: 5}}>{inf.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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

export default HomeScreen