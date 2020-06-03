import React from 'react';
import {createAppContainer} from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from "../Screen/CategoriesScreen";
import MealDetailsScreen from "../Screen/MealDetailScreen";
import CategoryMealsScreen from "../Screen/CategoryMealScreen";
import Colors from "../../constants/Color";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton'




const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,

        },
        CategoryMeals : {
            screen: CategoryMealsScreen,


        },
        MealDetail: MealDetailsScreen
    },{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white',
    }
});



const mainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerLeft:
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title={"menu"} iconName={'ios-menu'} onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    />
                </HeaderButtons>
        }

    },
    CategoryMeals : CategoryMealsScreen
});

export default createAppContainer(mainNavigator);