import {StyleProp, ViewStyle} from "react-native";
import {Box} from "native-base";
import React from "react";
import {InterfaceBoxProps} from "native-base/lib/typescript/components/primitives/Box";


export const GenericHeaderCard = (props: Props) => {
  const {children, style, boxProps} = props;

  return (
    <Box style={style || undefined} width="100%" mx={5} my={5} {...boxProps}>
      {children}
    </Box>
  );
};

interface Props {
  style?: StyleProp<ViewStyle>,
  children: JSX.Element[] | JSX.Element,
  boxProps?: InterfaceBoxProps
}
