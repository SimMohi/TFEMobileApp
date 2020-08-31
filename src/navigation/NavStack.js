import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer} from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import CovoitDetailScreen from "../NewScreens/CovoitDetailScreen";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="covoitDetail" component={CovoitDetailScreen} />
        </Stack.Navigator>
    );
}

function nav(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}

export default nav();