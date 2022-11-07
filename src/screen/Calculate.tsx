import React, {useEffect} from "react";
import CalculatorHeader from "../components/headers/CalculatorHeader";
import {CalculatorList} from "../components/lists/CalculatorList";
import {hideNavigationBar} from "react-native-navigation-bar-color";
import {useNavigation} from "@react-navigation/native";


export default function Calculate() {

  const navigation = useNavigation();

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      hideNavigationBar()
  });
  return unsubscribe;
}, [navigation])

  return (
    <CalculatorHeader>
      <CalculatorList/>
    </CalculatorHeader>
  );
}
