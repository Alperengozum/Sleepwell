import {StyleProp, ViewStyle} from "react-native";
import {Box, Pressable} from "native-base";
import React from "react";

export const GenericCard = (props: Props) => {
  const {children, style, onPress} = props;

  return (
    <Box style={style || {}} justifyContent="center" alignItems="center" width="100%" backgroundColor="coolGray.900"
         borderRadius="25">
      <Pressable w="100%" onPress={onPress || undefined} android_ripple={onPress ? {
        color: "#9333ea",
        borderless: false,
        radius: 0
      } : {}}>
        {children}
      </Pressable>
    </Box>
  );
};

interface Props {
  style?: StyleProp<ViewStyle>,
  onPress?: () => void,
  children: JSX.Element[] | JSX.Element
}
