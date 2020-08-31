import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, CheckBox} from "react-native";
import CovoitsApi from "../services/CovoitsApi";
import DateFunctions from "../services/DateFunctions";
import {createStackNavigator} from "@react-navigation/stack";
import CovoitDetailScreen from "./CovoitDetailScreen";
import { NavigationContainer } from '@react-navigation/native';
import AuthAPI from "../services/AuthAPI";
import {AntDesign} from "@expo/vector-icons";



const CovoitsPage = ({navigation}) => {

    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [covoits, setCovoits] = useState([]);
    const [newCar, setNewCar] = useState({
        title: "",
        places: "",
    });

    const [address, setAddress] = useState(true);

    const handleChangePlaces = (place) => {
        let copy = JSON.parse(JSON.stringify(newCar));
        copy.places = place;
        setNewCar(copy);
    };

    const handleChangeTitle = (title) => {
        let copy = JSON.parse(JSON.stringify(newCar));
        copy.title = title;
        setNewCar(copy);
    };

    const findCovoits = async () => {
        try {
            const data = await CovoitsApi.findAll();
            let futurCar = [];
            for (let i = 0; i < data.length; i++){
                if (new Date(data[i]["date"]) > new Date()){
                    futurCar.push(data[i]);
                }
            }
            futurCar.sort(DateFunctions.orderByDate);
            setCovoits(futurCar);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getUserId = async () => {
        let idUs =  await AuthAPI.getId();
        setUserId(idUs);
    }


    useEffect(() => {
        findCovoits();
        getUserId();
    }, []);

    const create = async ()=>{

    }

    console.log(userId, covoits);
    return (
        <>
            <View style={{ flexDirection: "row-reverse"}}>
                    <View>
                        <Text style={{backgroundColor: "orange",  width: 70, borderRadius: 25, textAlign: "center", color:"white", height: 50, paddingTop: 10, marginTop: 10, marginHorizontal: 10}}>
                            <AntDesign name={"plus"} size={25}
                                       color="white" onPress={()=> setModal(true)}></AntDesign>
                        </Text>
                    </View>
            </View>
            <SafeAreaView>
                <ScrollView>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginVertical: 20 }}>
                            {covoits.map( (car, index) =>
                                <View key={index} style={{marginVertical: 10}}>
                                    <TouchableOpacity onPress={()=> {
                                        navigation.navigate('CovoitDetailStackscreen', {
                                            screen: 'CovoitDetail',
                                            params: {id: car.id}
                                        }
                                    )}}>
                                        {userId == car.userId.id &&
                                        <Text style={{
                                            height: 50,
                                            backgroundColor: "#eb4034",
                                            padding: 5,
                                            paddingTop: 15,
                                            width: 500,
                                            textAlign: "center",
                                            color: "#fff",
                                            marginVertical: 5
                                        }}>{car.title} de {car.userId.firstName + " " + car.userId.lastName}</Text>
                                        ||
                                        <Text style={{
                                            height: 50,
                                            backgroundColor: "orange",
                                            padding: 5,
                                            width: 500,
                                            textAlign: "center",
                                            color: "#fff",
                                            marginVertical: 5
                                        }}>{car.title} de {car.userId.firstName + " " + car.userId.lastName}</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                </ScrollView>
            </SafeAreaView>
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
                        <View style={styles.container}>
                            <Text style={{fontSize:19, fontWeight: "bold", marginVertical: 10, color: "orange"}}>Création d'un nouveau covoiturage</Text>
                            <TextInput style={styles.inputBox} value={newCar.title} onChangeText={handleChangeTitle} placeholder={"Titre"} placeholderTextColor={"#ffffff"}/>
                            <TextInput style={styles.inputBox} value={newCar.places} onChangeText={handleChangePlaces} placeholder={"Nombre de places"} placeholderTextColor={"#ffffff"}/>
                            <CheckBox
                                value={address}
                                onValueChange={setAddress}
                                style={{}}
                            />
                            <Text style={{fontSize: 18,}}> Départ de mon adresse ? </Text>
                            <TouchableOpacity style={styles.button} onPress={create}>
                                <Text style={styles.buttonText}>Créer</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: 'red',
        borderRadius: 25,
        marginVertical: 10,
        padding: 16,
    }
})

export default CovoitsPage;