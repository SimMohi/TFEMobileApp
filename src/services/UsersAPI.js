import axios from 'axios';
import {API_URL, USERS_API} from '../config'
import AuthAPI from "./AuthAPI";

function findAll() {
    return axios
        .get(USERS_API)
        .then(response => response.data["hydra:member"]);
}

function find(id) {
    return axios
        .get(USERS_API+"/" +id)
        .then(response => response.data);
}

function findUnaccepted(){
    return axios
        .get(USERS_API+"?isAccepted=false")
        .then(response => response.data["hydra:member"]);
}

function create (user){
    return axios
        .post(USERS_API, user);
}

function update(id, user){
    return axios.put(USERS_API + "/" + id, user);
}

function deleteUser(id){
    return axios.delete(USERS_API + "/" + id);
}

function profile(id) {
    return axios.get(API_URL + "/profile/" + id)
        .then(response => response.data);

}

function getNotifications(id){
    return axios.get(API_URL + "/getNotificationsUser/" + id)
        .then(response => response.data);
}

async function getTokenMobile()  {
    const id = await AuthAPI.getId();
    return axios.get(API_URL + "/getTokenMobile/" + id)
        .then(response => response.data);
}

function getCalendarWeek(id){
    return axios.get(API_URL + "/getCalendarWeek/" + id)
        .then(response => response.data);
}

function seenNotif(data){
    return axios
        .post(API_URL + "/seenNotif", data);
}

function updatePlayer(data){
    return axios.put(API_URL + "/acceptConvoc", data);
}

function updateP(id, playerMatch){
    return axios.put(API_URL +"/api/player_matches/" + id, playerMatch);
}

export default {
    findAll, create, findUnaccepted, update, profile, deleteUser, getNotifications, find, getTokenMobile, getCalendarWeek, seenNotif, updatePlayer, updateP
}