import {StyleProp, ViewStyle} from "react-native";
import {Box} from "native-base";
import React from "react";


export const GenericHeaderCard = (props: Props) => {
  const {children, style} = props;

  return (
    <Box style={style || undefined} width="100%" mx={5} my={5}>
      {children}
    </Box>
  );
};

interface Props {
  style?: StyleProp<ViewStyle>,
  children: JSX.Element[] | JSX.Element
}
