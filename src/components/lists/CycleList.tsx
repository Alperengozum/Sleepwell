import React, {useEffect, useState} from "react";
import {FlashList} from "@shopify/flash-list";
import {HStack, Icon, Text, View, VStack, useToast, Box} from "@gluestack-ui/themed-native-base";
import {GenericCard} from "../cards/GenericCard";
import {GenericHeaderCard} from "../cards/GenericHeaderCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SleepStore, {SleepType} from "../../store/SleepStore";
import SettingsStore, {SettingsType} from "../../store/SettingsStore";
import {getCalendars} from "expo-localization";
import {addHours, formatHour} from "../../utils/DateUtils";
import {createIntentAlarm} from "../../utils/AlarmUtils";
import {List, ListType} from "../../domain/List";

const getRenderItem = ({item}: { item: List }): React.ReactElement => {
  if (item!.type === ListType.HEADER) {
    // Rendering header
    return <GenericHeaderCard>
      <HStack mr={10} justifyContent="space-between" alignItems="center" textAlign="center">
        <Text color="white" fontSize="lg">{item.name}</Text>
        <Text color="white" fontSize="lg">{item.desc}</Text>
      </HStack>
    </GenericHeaderCard>;
  } else if (item.type == ListType.ITEM) {
    return <GenericCard style={{marginVertical: 10}} onPress={item.onClick || undefined}>
      <HStack my={5} mr={10} justifyContent="space-between" alignItems="center" textAlign="center">
        <VStack mx={5}>
          <Text color="white" fontSize="lg">{item.name + " Sleep Cycles"}</Text>
          <Text color="gray.400" fontSize="md">{"Equals " + item.name * 1.5 + " hours sleep."}</Text>
        </VStack>
        <Text color="purple.700" bold fontSize="xl">{item.desc}</Text>
      </HStack>
    </GenericCard>
  } else {
    return <React.Fragment/>
  }
}

export const CycleList = (props: { params: any; }) => {
  const [is24Hour, setIs24Hour] = useState<boolean | undefined>(undefined);
  const [list, setList] = useState<Array<List>>([
    {
      name: "Sleep",
      desc: "Wake up at",
      type: ListType.HEADER,
      icon: <Icon color="white" as={MaterialCommunityIcons} name="power-sleep" size={8}/>
    },
  ]);

  useEffect(() => {
    const findTimeFormat = async () => {
      setIs24Hour(getCalendars()[0].uses24hourClock || false)
    }
    findTimeFormat();
  }, [])

  const buildList = (params: any) => {
    //Calculate when to go to bed
    if (!params) {
      return console.error("where are the params?")
    }
    if (!params.isStart) {
      let tempList: Array<List> = [];
      list.find((d: List) => d.name == "Sleep")!.desc = "Go to bed at";
      for (let i = 6; i >= 1; i--) {
        let date = addHours(new Date(params.time), -i * 1.5)
        date = addHours(date, -(SettingsStore.getSettings(SettingsType.FALL_ASLEEP)![0]!.value || 0) / 60)
        tempList.push({
          type: ListType.ITEM,
          name: i,
          desc: `${formatHour(("0" + date.getHours()).slice(-2), is24Hour)}:${("0" + date.getMinutes()).slice(-2)}`,
          onClick: () => createIntentAlarm(date, SleepType.SLEEP, i)
        })
      }
      setList([list[0], ...tempList])
    }
    if (params.isStart) {
      let tempList: Array<List> = [];
      list.find((d: List) => d.name == "Sleep")!.desc = "Wake up at";
      for (let i = 6; i >= 1; i--) {
        let date = addHours(new Date(params.time), i * 1.5)
        date = addHours(date, (SettingsStore.getSettings(SettingsType.FALL_ASLEEP)![0]!.value || 0) / 60)
        tempList.push({
          type: ListType.ITEM,
          name: i,
          desc: `${formatHour(("0" + date.getHours()).slice(-2), is24Hour)}:${("0" + date.getMinutes()).slice(-2)}`,
          onClick: () => createIntentAlarm(date, SleepType.SLEEP, i)
        })
      }
      setList([list[0], ...tempList])
    }
  }

  const stickyHeaderIndices = list
    .map((item, index) => {
      if (item.type === ListType.HEADER) {
        return index;
      } else {
        return null;
      }
    })
    .filter((item: number | null) => item !== null) as number[];

  useEffect(() => {
    buildList(props.params);
  }, [])

  useEffect(() => {
    const findTimeFormat = async () => {
      setIs24Hour(getCalendars()[0].uses24hourClock || false)
    }
    findTimeFormat();
  }, [])

  return (
    <View width={"100%"} h={"100%"} mt={50}>
      <FlashList
        data={list}
        renderItem={getRenderItem}
        stickyHeaderIndices={stickyHeaderIndices}
        getItemType={(item) => {
          // To achieve better performance, specify the type based on the item
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        estimatedItemSize={10}
      />
    </View>
  );
};
