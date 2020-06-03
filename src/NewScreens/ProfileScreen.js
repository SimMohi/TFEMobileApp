import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import {Header, Icon, Left} from "native-base";


const ProfileScreen = () => {
    return(
        <View>
            <Header>
                <Left>
                    <Icon name={"menu"} onPress={() => props.navigation.openDrawer()}/>
                </Left>
            </Header>
            <Text>Yo</Text>
        </View>
    )
}

export default ProfileScreen