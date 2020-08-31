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



const ChatPage = () => {

    const [userId, setUserId] = useState(0);
    const [activeRoom, setActiveRoom] = useState({
        id: null,
        name: ""
    })
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeMessage, setActiveMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [reload, setReload] = useState(0);

    async function getId () {
        const token =  await AsyncStorage.getItem('userToken');
        if (token){
            const { id } = jwtDecode(token);
            return id;
        }
        return 0;
    }

    const findChatInfo = async () => {
        const token =  await AsyncStorage.getItem('userToken');
        let idUser = 0;
        if (token){
            const { id } = jwtDecode(token);
            idUser = id;
        }
        setUserId(idUser);
        const response = await axios.get(API_URL + "/getChatInfo/"+ idUser)
            .then(response => response["data"]);
        let channel = [];
        let messagesArr = [];
        let selectRoom = {};
        for (let i = 0; i < response.length; i++){
            if (i == 0){
                if (activeRoom.id == null){
                    selectRoom ={
                        id: response[i]["channelId"],
                        name: response[i]["channel"]
                    }
                    setActiveRoom(selectRoom);
                }

            }
            channel.push({
                name: response[i]["channel"],
                id: response[i]["channelId"]
            });
            messagesArr.push({
                channelId: response[i]["channelId"],
                messages: response[i]["messages"]
            });
        }
        for (let i = 0; i < messagesArr.length; i++){
            if (messagesArr[i]["channelId"] == selectRoom.id){
                setActiveMessage(messagesArr[i]["messages"]);
            }
        }
        setMessages(messagesArr);
        setRooms(channel);
    }

    const handleChange = ( value ) => {
        setNewMessage(value);
    }


    const submit = async (event) => {
        let post = {
            message: newMessage,
            userId: userId,
            teamId: activeRoom.id
        }
        try{
            await axios.post(API_URL + "/postMessage", post);
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
            let response = await axios.get(API_URL + "/getChatInfo/"+ userId)
                .then(response => response["data"]);
            let messagesArr = [];
            for (let i = 0; i < response.length; i++){
                messagesArr.push({
                    channelId: response[i]["channelId"],
                    messages: response[i]["messages"]
                });
            }
            for (let i = 0; i < messagesArr.length; i++){
                if (messagesArr[i]["channelId"] == activeRoom.id){
                    setActiveMessage(messagesArr[i]["messages"]);
                }
            }
            scrollToEnd();
        } catch (e) {
        }
    }

    const changeRoom = (index) => {
        for (let i = 0; i < messages.length; i++){
            if (messages[i]["channelId"] == rooms[index]["id"]){
                setActiveMessage(messages[i]["messages"]);
            }
        }

        setActiveRoom({
            id: rooms[index]["id"],
            name: rooms[index]["name"]
        })
    }

    useInterval(() => {
        getNewMessage();
    }, 5000);

    useEffect(  () => {
        findChatInfo();
    }, [reload]);



    return (
        <>
            <View style={{flex:1, flexDirection: "row",  paddingTop: 5}}>
                {rooms.map((room, index) =>
                room.id == activeRoom.id &&
                    <View key={index} style={{marginLeft: 20,}}>
                        <TouchableOpacity style={{backgroundColor: "#f54b42", borderRadius: 20, padding: 8}} >
                            <Text style={{ color: "#fff", fontSize: 17,}}>{room.name} </Text>
                        </TouchableOpacity>
                    </View>
                    ||
                    <View key={index} style={{marginLeft: 20,}}>
                        <TouchableOpacity style={styles.button} onPress={() => changeRoom(index)}>
                            <Text style={{ color: "#fff", fontSize: 15,}}>{room.name} </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <SafeAreaView style={styles.container}>
                {/*<ScrollView style={styles.scrollView}>*/}
                <ScrollView>
                    <View style={styles.containerMessages}>
                        {activeMessage.map((mess, index) =>
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
            </SafeAreaView>
            <View style={{flex:1, flexDirection: "column-reverse"}}>
                <View style={{flexDirection: "row", marginVertical: 20}}>
                    <TextInput style={styles.newMess} value={newMessage} onChangeText={handleChange}
                               placeholder={"Votre message"} placeholderTextColor={"#f54b42"}/>
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={{ color: "#fff", fontSize: 18,}}>Envoyer </Text>
                    </TouchableOpacity>
                </View>
            </View>
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

export default ChatPage;