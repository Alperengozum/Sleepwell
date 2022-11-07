import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import {BottomTabNavigator} from "./BottomTabNavigator";
import Cycle from "../screen/Cycle";
import Powernap from "../screen/Powernap";
import Info from "../screen/Info";

const Stack = createNativeStackNavigator();

export function MainNavigator() {

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Group>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="Cycle" component={Cycle} options={{headerShown: false}}/>
        <Stack.Screen name="Powernap" component={Powernap} options={{headerShown: false}}/>
        <Stack.Screen name="Info" component={Info} options={{headerShown: false}}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}
