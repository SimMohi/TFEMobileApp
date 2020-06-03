import {AsyncStorage} from 'react-native';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const  logout = async () => {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
    setup();
}

function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

const setup = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        console.log(token);
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime() ) {
            setAxiosToken(token);
        }
    } else {
        console.log("no tokne");
    }
}

const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        console.log(token);
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime() ) {
            return true;
        }
        return false;
    }
    return false
}


export default {
    setAxiosToken, isAuthenticated, logout, setup
}