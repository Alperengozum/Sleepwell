import {View} from "native-base";
import React from "react";

export default function Powernap() {
  function Placeholder(props) {
    return (
      <View style={{height: 100, margin: 50, backgroundColor: 'white'}}/>
    );
  }

  return (
    <View bgColor="black" flex={1}>
      <Placeholder></Placeholder>

    </View>
  );
}
