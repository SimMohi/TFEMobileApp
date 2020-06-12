import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.img}
                source={require("../img/logo.png")}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logoText:{
        marginVertical: 15,
        fontSize: 18,
        color: "white"
    },
    img: {
        width: 70,
        height: 70
    }
});

export default Logo