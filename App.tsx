import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'react-native';
import {MainNavigator} from "./src/router/MainNavigator";
import 'react-native-reanimated'

export default function App() {
	useEffect(() => {
		StatusBar.setHidden(true);
		//changeNavigationBarColor("black", false, false);
		//hideNavigationBar()
	})
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<MainNavigator/>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};


