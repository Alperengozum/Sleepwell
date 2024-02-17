import React, {useEffect} from "react";
import CycleHeader from "../components/headers/CycleHeader";
import {CycleList} from "../components/lists/CycleList";
import {useNavigation} from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";


export default function Cycle(props) {
  const navigation = useNavigation();

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      NavigationBar.setVisibilityAsync('visible');
    });
    return unsubscribe;
  }, [navigation])

  return (
    <CycleHeader>
      <CycleList params={props.route.params}/>
    </CycleHeader>
  );
}
