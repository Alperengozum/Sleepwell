import React from "react";
import {Pressable, Text, View} from "@gluestack-ui/themed-native-base";
import {Dimensions} from "react-native";

export const SlideItem = (props: { title?: string, image?: React.ReactNode, desc?: string, onPress?: () => void }) => {
  return (
    // @ts-ignore
    <View sx={{
      flex: 1,
      width: Dimensions.get('window').width,
      justifyContent: "space-evenly",
      padding: 20,
      alignItems: "center"
    }} onTouchEndCapture={props.onPress && props.onPress}>
      <Text sx={{
        color: "white",
        textAlign: "center",
      }} fontSize={"lg"} numberOfLines={2}>
        {props.title}
      </Text>
      {props.image && props.image}
      <Text sx={{
        color: "white",
        textAlign: "center"
      }} fontSize={"md"}>
        {props.desc}
      </Text>
    </View>
  )
}