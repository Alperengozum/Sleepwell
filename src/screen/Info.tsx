import React, {useEffect} from "react";
import {InfoList} from "../components/lists/InfoList";
import InfoHeader from "../components/headers/InfoHeader";
import {useNavigation} from "@react-navigation/native";
import {showNavigationBar} from "react-native-navigation-bar-color";

export default function Info() {
  const navigation = useNavigation();

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      showNavigationBar()
    });
    return unsubscribe;
  }, [navigation])

  return (
    <InfoHeader>
      <InfoList/>
    </InfoHeader>
  );
}
