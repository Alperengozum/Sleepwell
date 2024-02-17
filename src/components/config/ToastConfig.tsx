import {BaseToast, BaseToastProps} from "react-native-toast-message";
import React from "react";

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'purple', borderRadius: 20}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text2Style={{fontSize: 18}}
    />
  )
};