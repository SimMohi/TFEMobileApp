import { Notifications} from "expo"
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import UsersAPI from "./UsersAPI";

 export const subscribeToNotifications = async () => {
    //  Permissions.getAsync(Permissions.NOTIFICATIONS).then(existingPermission => {
    //     if (existingPermission.status !== "granted"){
    //         Permissions.askAsync(Permissions.NOTIFICATIONS).then(permission => {
    //             if (permission.status != "granted"){
    //                 console.log("nope", permission.status);
    //                 return;
    //             } else {
    //                 Notifications.getExpoPushTokenAsync().then(token => {
    //                     console.log("heyyaaa");
    //                     axios.get("https://notif-tfe.herokuapp.com/?token=" + token).then(axiosResponse => {
    //                         console.log(axiosResponse.data);
    //                         }
    //                     )
    //                 });
    //             }
    //         });
    //     } else {
    //         Notifications.getExpoPushTokenAsync().then(token => {
    //             console.log(token);
    //             axios.get("https://notif-tfe.herokuapp.com/?token=" + token).then(axiosResponse => {
    //                     console.log(axiosResponse.data);
    //                 }
    //             )
    //         });
    //     }
    // });
}

