import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import changeNavigationBarColor, {hideNavigationBar} from 'react-native-navigation-bar-color';
import {StatusBar} from 'react-native';
import {MainNavigator} from "./src/router/MainNavigator";
import SyncStorage from 'sync-storage';
import 'react-native-reanimated'

const App = () => {
  useEffect( () => {
    const initSyncStorage = async () => {
      await SyncStorage.init();
    }
    initSyncStorage();
    StatusBar.setHidden(true);
    changeNavigationBarColor("black", false, false);
    hideNavigationBar()
  })
  return (
    <NativeBaseProvider>
        <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
