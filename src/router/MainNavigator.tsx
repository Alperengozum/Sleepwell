import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {BottomTabNavigator} from "./BottomTabNavigator";
import Cycle from "../screen/Cycle";
import Info from "../screen/Info";
import Welcome from "../screen/Welcome";

const Stack = createNativeStackNavigator();
export function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName={"Main"}>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="Cycle" component={Cycle} options={{headerShown: false}}/>
        <Stack.Screen name="Info" component={Info} options={{headerShown: false}}/>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
