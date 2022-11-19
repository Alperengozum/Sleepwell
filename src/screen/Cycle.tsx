import React, {useEffect} from "react";
import CycleHeader from "../components/headers/CycleHeader";
import {CycleList} from "../components/lists/CycleList";
import {showNavigationBar} from "react-native-navigation-bar-color";
import {useNavigation} from "@react-navigation/native";

export default function Cycle(props) {
  const navigation = useNavigation();

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      showNavigationBar()
    });
    return unsubscribe;
  }, [navigation])

  return (
    <CycleHeader>
      <CycleList params={props.route.params}/>
    </CycleHeader>
  );
}
