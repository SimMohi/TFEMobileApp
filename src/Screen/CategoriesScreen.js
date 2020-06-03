import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from "../../Data/falseData";
import CategoryGridTile from "../Components/CategoryGridTile";




const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return(
            <CategoryGridTile title={itemData.item.title} color={itemData.item.color}
                  onSelect={() => {
                      props.navigation.navigate({ routeName: 'CategoryMeals', params: {
                          categoryId: itemData.item.id
                  }})
            }} />
        )};

    return (
      <FlatList keyExtrator={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/>
    )
}

CategoriesScreen.defaultNavigatiosnOptions  = {
    headerTitle: "Meal Category",
}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    gridItem:{
        flex: 1,
        margin: 15,
        height: 150
    }
})
export default CategoriesScreen;

