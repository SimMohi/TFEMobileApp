import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import {Header, Left, Right, Icon} from 'native-base'

const HomeScreen = props => {
    return(
        <View>
            <Header>
                <Left>
                    <Icon name={"menu"} onPress={() => props.navigation.openDrawer()}/>
                </Left>
            </Header>
            <Text>Salut</Text>
        </View>
    )
}

export default HomeScreen