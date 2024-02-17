import React, {useEffect} from "react";
import {InfoList} from "../components/lists/InfoList";
import InfoHeader from "../components/headers/InfoHeader";
import {useNavigation} from "@react-navigation/native";
import * as NavigationBar from 'expo-navigation-bar';

export default function Info() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      NavigationBar.setVisibilityAsync('visible');
    });
    return unsubscribe;
  }, [navigation])

  return (
    <InfoHeader>
      <InfoList/>
    </InfoHeader>
  );
}
