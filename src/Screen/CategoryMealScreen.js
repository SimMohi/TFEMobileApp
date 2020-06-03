import React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import {CATEGORIES} from "../../Data/falseData";
import Colors from "../../constants/Color";

const CategoryMealScreen = props => {

    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return (
        <View style={styles.screen}>
            <Text>{selectedCategory.title}</Text>
            <Button title={"go to details"} onPress={() => {
                props.navigation.navigate("MealDetail")
            }}/>
        </View>
    )
}

CategoryMealScreen.defaultNavigationOptions = (navigationData) =>  {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return{
        headerTitle: selectedCategory.title,
    }

}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default CategoryMealScreen;

