import React from "react";
import {FlashList} from "@shopify/flash-list";
import {HStack, Icon, IconButton, Text, View, VStack} from "native-base";
import {GenericCard} from "../cards/GenericCard";
import {GenericHeaderCard} from "../cards/GenericHeaderCard";
import {Observer} from "mobx-react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsStore, {Settings, SettingsType} from "../../store/SettingsStore";
import {FallAsleepCard} from "../cards/FallAsleepCard";

interface List {
  name: string | number;
  type: ListType;
  desc?: string | number;
  icon?: React.ReactNode;
  id?: number;
  onClick?: () => void;
}

enum ListType {
  HEADER,
  ITEM
}

export const SettingsList = () => {

  const buildList = () => {
    let tempList: Array<Settings> | undefined = SettingsStore.getSettings();
    let newList: Array<List> = [];
    if (tempList) tempList.forEach((settings: Settings) => {
      newList.push({
        type: ListType.ITEM,
        name: settings.type,
        desc: settings.value,
        id: settings.id
      })
    })
    return newList;
  }

  const stickyHeaderIndices = buildList()
    .map((item, index) => {
      if (item.type === ListType.HEADER) {
        return index;
      } else {
        return null;
      }
    })
    .filter((item: number | null) => item !== null) as number[];

  return (
    <Observer>
      {() => (
        <View width="100%" mt={50}>
          <FlashList
            data={buildList()}
            renderItem={({item}) => {
              if (item!.type === ListType.HEADER) {
                // Rendering header
                return <GenericHeaderCard>
                  <HStack mr={10} justifyContent="space-between" alignItems="center" textAlign="center">
                    <Text color="white" fontSize="lg">{item.name}</Text>
                    <Text color="white" fontSize="lg">{item.desc}</Text>
                  </HStack>
                </GenericHeaderCard>;
              } else if (item.type == ListType.ITEM) {
                switch (item.name) {
                  case SettingsType.FALL_ASLEEP:
                    return <FallAsleepCard/>
                  default:
                    return <React.Fragment/>
                }
              } else {
                return <React.Fragment/>
              }

            }}
            stickyHeaderIndices={stickyHeaderIndices}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return typeof item === "string" ? "sectionHeader" : "row";
            }}
            estimatedItemSize={10}
          />
        </View>)}
    </Observer>
  );
};
