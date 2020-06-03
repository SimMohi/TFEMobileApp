import axios from 'axios';
import {API_URL, USERS_API} from '../config'

async function findAll() {
    return axios
        .get(USERS_API)
        .then(response => response.data["hydra:member"]);
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
    return axios.get(API_URL + "/profile/" + id);
}

function getNotifications(id){
    return axios.get(API_URL + "/getNotificationsUser/" + id)
        .then(response => response.data);
}

export default {
    findAll, create, findUnaccepted, update, profile, deleteUser, getNotifications
}