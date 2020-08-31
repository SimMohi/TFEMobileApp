import React, {useState, useEffect} from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text, AsyncStorage,
    TextInput, SafeAreaView, ScrollView
} from "react-native";
import jwtDecode from "jwt-decode";
import axios from 'axios'
import {API_URL} from "../config";
import DateFunctions from "../services/DateFunctions";
import useInterval from "../Components/UseInterval";
import Constants from 'expo-constants';



const CovoitChatScreen = (props) => {

    const {id} = props.route.params;
    const [userId, setUserId] = useState(0);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [reload, setReload] = useState(0);

    const findChatInfo = async () => {
        const token =  await AsyncStorage.getItem('userToken');
        let idUser = 0;
        if (token){
            const { id } = jwtDecode(token);
            idUser = id;
        }
        setUserId(idUser);
        const response = await axios.get(API_URL + "/getChatCovoit/"+ id)
            .then(response => response["data"]);
        setMessages(response);
    }

    const handleChange = ( value ) => {
        setNewMessage(value);
    }


    const submit = async (event) => {
        let post = {
            message: newMessage,
            userId: userId,
            carId: id
        }
        try{
            await axios.post(API_URL + "/sendMessageCovoit", post);
        } catch (e) {
        }
        setReload(reload+1);
        setNewMessage("");
    }

    const getNewMessage = async () =>{
        if (userId == 0){
            return;
        }
        try{
            let response = await axios.get(API_URL + "/getChatCovoit/"+ id)
                .then(response => response["data"]);
            setMessages(response);
            scrollToEnd();
        } catch (e) {
        }
    }

    useInterval(() => {
        getNewMessage();
    }, 5000);

    useEffect(  () => {
        findChatInfo();
    }, [reload]);



    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView >
                    <View style={styles.containerMessages}>
                        {messages.map((mess, index) =>
                            mess["senderId"] !== userId &&
                            <View key={index}  style={styles.containerMessage}>
                                <Text style={styles.sender}>{mess.sender} {DateFunctions.dateFormatFrDMHM(mess.date)}</Text>
                                <Text style={styles.message}>{mess.text}</Text>
                            </View>
                            ||
                            <View key={index} style={styles.containerMessageO}>
                                <Text style={styles.senderO}>{DateFunctions.dateFormatFrDMHM(mess.date)}</Text>
                                <Text style={styles.messageO}>{mess.text}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
                <View style={{flex:1, flexDirection: "column-reverse"}}>
                    <View style={{flexDirection: "row", marginVertical: 20}}>
                        <TextInput style={styles.newMess} value={newMessage} onChangeText={handleChange}
                                   placeholder={"Votre message"} placeholderTextColor={"#f54b42"}/>
                        <TouchableOpacity style={styles.button} onPress={submit}>
                            <Text style={{ color: "#fff", fontSize: 18,}}>Envoyer </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        </>)
}

const styles = StyleSheet.create({
    container : {
        flex: 14,
        marginTop: Constants.statusBarHeight,
    },
    containerMessages : {
        flex: 1,
    },
    containerMessage: {
        marginLeft: 10,
        marginRight: 10,
    },
    containerMessageO: {
        marginLeft:10,
        marginRight: 10,
        alignSelf: "flex-end"
    },
    messageO : {
        backgroundColor: "#fa7532",
        padding: 6,
        borderRadius:10,
        marginVertical: 5,
        color: "#fff",
        marginLeft: 10,
        textAlign: 'right',
        width: 130,
    },
    message: {
        backgroundColor: "#f54b42",
        padding: 6,
        borderRadius:10,
        marginVertical: 5,
        color: "#fff",
        marginRight: 10,
        width: 130,

    },
    newMess: {
        backgroundColor: "#e0dfde",
        width: 240,
        height: 50,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
    },
    button:{
        backgroundColor: "#fa7532",
        borderRadius: 20,
        padding: 8,
    },
    sender: {
        fontSize: 10,
        color: "#8f8f8f",
        marginLeft: 10,
    },
    senderO: {
        fontSize: 10,
        color: "#8f8f8f",
        marginLeft: 10,
        alignSelf: "center",
    }
});

export default CovoitChatScreen;