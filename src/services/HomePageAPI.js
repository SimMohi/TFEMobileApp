import axios from "axios";
import {API_URL} from "../config";

function postAbsence(obj){
    return axios.post(API_URL +"/postAbsence", obj);
}

function remAbsence(obj) {
    return axios.post(API_URL +"/remAbsence", obj);
}


function createUTE(data){
    return axios.post(API_URL + "/subscribeUTE", data);
}

function unSubUTE(data){
    return axios.post(API_URL + "/unSubscribeUTE", data);
}


export default {postAbsence, remAbsence, createUTE, unSubUTE}