// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

// export const storeData = async (value) => {
//     try {
//         await AsyncStorage.setItem('@storage_Key', value)
//     } catch (e) {
//         // saving error
//     }
// }
//
// export const getHeader = async () => {
//     try {
//         const value = await AsyncStorage.getItem('@storage_Key')
//         if(value !== null) {
//             const header = {
//                 headers: { Authorization: `Bearer ${value}` }
//             };
//             return header;
//         }
//     } catch(e) {
//         // error reading value
//     }
// }

const store = async () => {
    try {
        await AsyncStorage.setItem(
            '@MySuperStore:key',
            'I like to save it.'
        );
    } catch (error) {
        // Error saving data
    }
};
