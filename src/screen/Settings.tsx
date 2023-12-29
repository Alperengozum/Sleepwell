import {View} from "native-base";
import React from "react";
import SettingsHeader from "../components/headers/SettingsHeader";
import {SettingsList} from "../components/lists/SettingsList";

export default function Reports() {
  function Placeholder() {
    return (
      <View style={{height: 100, margin: 50, backgroundColor: 'white'}}/>
    );
  }

  return (
    <SettingsHeader>
      <SettingsList/>
    </SettingsHeader>
  );
}
