import React, {useEffect} from "react";
import CalculatorHeader from "../components/headers/CalculatorHeader";
import {CalculatorList} from "../components/lists/CalculatorList";
import {useNavigation} from "@react-navigation/native";
import * as NavigationBar from 'expo-navigation-bar';


export default function Calculate() {

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      NavigationBar.setVisibilityAsync('hidden');
    });
    return unsubscribe;
  }, [navigation])

  return (
    <CalculatorHeader>
      <CalculatorList/>
    </CalculatorHeader>
  );
}
