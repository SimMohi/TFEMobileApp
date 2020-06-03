import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';

const MealDetailsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>MealDetailsScreen</Text>
            <Button title={"go back to categories"} onPress={() => {
                props.navigation.popToTop() // reviens au dessus de la pile
            }}/>
            <Button title={"go back"} onPress={() => {
                props.navigation.pop() // reviens en arrière
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default MealDetailsScreen;

