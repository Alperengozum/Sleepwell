import React, {useEffect} from 'react';
import {NativeBaseProvider} from '@gluestack-ui/themed-native-base';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'react-native';
import {MainNavigator} from "./src/router/MainNavigator";
import 'react-native-reanimated'
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
	useEffect(() => {
		StatusBar.setHidden(true);
		NavigationBar.setBackgroundColorAsync("black")
		NavigationBar.setVisibilityAsync("hidden");
	})
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<MainNavigator/>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};


