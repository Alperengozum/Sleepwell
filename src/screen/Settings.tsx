import {View} from "@gluestack-ui/themed-native-base";
import React from "react";
import SettingsHeader from "../components/headers/SettingsHeader";
import {SettingsList} from "../components/lists/SettingsList";

export default function Settings() {

  return (
    <SettingsHeader>
      <SettingsList/>
    </SettingsHeader>
  );
}
