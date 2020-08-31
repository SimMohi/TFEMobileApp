import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, Modal, StyleSheet} from "react-native";
import CovoitsApi from "../services/CovoitsApi";
import AuthAPI from "../services/AuthAPI";
import {DataTable} from "react-native-paper";
import {AntDesign} from "@expo/vector-icons";


const CovoitDetailScreen = (props) => {

    const [reload, setReload] = useState(0);
    const [userId, setUserId] = useState("");
    const [modal, setModal] = useState(false);
    const [idPass, setIdPass] = useState(0);
    const [car, setCar] = useState({
        address: "",
        title: "",
        placeRemaining: "",
        driver: "",
    })
    const [passengers, setPassengers] = useState([]);
    const {id} = props.route.params;

    const getUserId = async () => {
       let idUs =  await AuthAPI.getId();
       setUserId(idUs);
    }

    const findCovoit = async(id) => {
        const response = await CovoitsApi.find(id);
        setPassengers(response["carPassengers"]);
        let newCar = {
            title: response.title,
            placeRemaining: response.placeRemaining,
            driver: response.userId.firstName + " " + response.userId.lastName,
            address: "Rue " + response["departureAddress"]["street"] + " " + response["departureAddress"]["number"] + ", " + response["departureAddress"]["code"] + " " + response["departureAddress"]["city"]
        }
        setCar(newCar);
    }

    const accept = async () =>{
        let post = {
            user: idPass,
            car: id,
        }
        await CovoitsApi.acceptPass(post);
        setReload(reload+1);µ
        setModal(false);
    }


    const refuse = async () => {
        let post = {
            user: idPass,
            car: id,
        }
        // await CovoitsApi.unSub(post);
        setModal(false);
        setReload(reload+1);
    }

    useEffect(() => {
        findCovoit(id);
        getUserId();
    }, [id, reload]);


    return(
        <>
            <View style={{marginHorizontal: 10, marginBottom: 20}}>
                <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.littleTitle}>Covoiturage :</Text>
                    <Text style={styles.Bold}>{car.title}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.littleTitle}>Places Restantes : </Text>
                    <Text style={styles.Bold}>{car.title}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.littleTitle}>Conducteur : </Text>
                    <Text style={styles.Bold}>{car.driver}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.littleTitle}>Départ :</Text>
                    <View style={{alignSelf: "center"}}>
                        <Text style={styles.Bold}>{car.address}</Text>
                    </View>
                </View>
            </View>
            <DataTable >
                <View style={{alignItems: "center", marginTop: 10}}>
                    <Text style={{color: "orange", fontSize: 18, fontWeight: "bold"}}>Demandes</Text>
                </View>
                <DataTable.Header>
                    <DataTable.Title>Etat</DataTable.Title>
                    <DataTable.Title>Nom</DataTable.Title>
                    <DataTable.Title numeric>Places</DataTable.Title>
                </DataTable.Header>
                {passengers.map((pass, index) =>
                    <TouchableOpacity onPress={()=> {setModal(true); setIdPass(pass.user.id)}}>
                        <DataTable.Row key={index}>
                        {pass["isAccepted"] &&
                        <DataTable.Cell ><AntDesign name={"check"} size={25}
                                                    color="green" onPress={()=> navigation.goBack()}></AntDesign></DataTable.Cell>
                        ||
                        <DataTable.Cell ><AntDesign name={"close"} size={25}
                                                    color="red" onPress={()=> navigation.goBack()}></AntDesign></DataTable.Cell>
                        }
                        <DataTable.Cell>{pass.user.lastName + " " + pass.user.firstName}</DataTable.Cell>
                        <DataTable.Cell numeric>{pass.numberPassenger}</DataTable.Cell>

                    </DataTable.Row>
                </TouchableOpacity>
                    )}
            </DataTable>
            <View style={{flexDirection: "column-reverse", flex: 1, alignItems: "flex-end"}}>
                <TouchableOpacity onPress={()=> {
                    props.navigation.navigate('CovoitDetailStackscreen', {
                            screen: 'chat',
                            params: {id: id}
                        }
                    )}}>
                    <Text style={{height: 50, fontSize: 15, backgroundColor: "#eb4034", width: 100, paddingTop: 10, textAlign: "center", margin: 20, color: "#fff", borderRadius: 25,}}>
                        Chat</Text>
                </TouchableOpacity>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
            setModal(false);
        }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={accept}>
                            <View style={{ marginRight: 20, backgroundColor: "orange", padding: 10, borderRadius: 20,
                            }}>
                                <Text style={{ color: "white"}} >Accepter</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={refuse}>
                            <View style={{ marginLeft: 20, backgroundColor: "red", padding: 10, borderRadius: 20,}}>
                                <Text style={{ color: "white"}}>Refuser</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles =  StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: "row",
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
    littleTitle: {
        marginVertical: 5,
        marginRight: 10,
    },
    Bold: {
        marginVertical: 5,
        fontWeight: "bold",
        color: "red"
    }
})

export default CovoitDetailScreen;