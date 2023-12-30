import React, {useEffect} from "react";
import {FlashList} from "@shopify/flash-list";
import {HStack, Icon, IconButton, Text, View, VStack} from "native-base";
import {GenericCard} from "../cards/GenericCard";
import {GenericHeaderCard} from "../cards/GenericHeaderCard";
import SleepStore, {Sleep, SleepFilter, SleepType} from "../../store/SleepStore";
import {Observer} from "mobx-react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SleepIndicatorChart} from "../charts/SleepIndicatorChart";
import {SleepLineChart} from "../charts/SleepLineChart";
import {getMonthBefore} from "../../utils/DateUtils";

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

interface ReportsListProps {
  selectedDate?: SleepFilter;
  setSelectedDate?: React.Dispatch<React.SetStateAction<SleepFilter>>;
}

export const ReportsList = ({selectedDate, setSelectedDate}: ReportsListProps) => {

  useEffect(() => {
    buildList()
  }, [selectedDate]);

  const getSleeps = () => {
    return SleepStore.getSleeps(SleepType.SLEEP, {
      start: selectedDate?.start || getMonthBefore(),
      end: selectedDate?.end || new Date()
    })
  }
  const buildList = (): Array<List> => {
    const sleeps = getSleeps();
    const newList: Array<List> = [];
    newList.push({
      type: ListType.HEADER,
      name: "Reports",
    })
    sleeps?.forEach((sleep: Sleep) => {
      newList.push({
        type: ListType.ITEM,
        name: sleep.type,
        desc: sleep.cycle,
        id: sleep.id
      })
    })
    return newList;
  }
  const deleteSleep = (id: number) => {
    SleepStore.deleteSleep(id)
  }
  const getRenderItem = ({item}: { item: List }): React.ReactElement => {
    switch (item!.type) {
      case ListType.HEADER:
        // Rendering header
        return (
          <GenericHeaderCard boxProps={{
            mx: 0,
            my: 0,
            mt: 10
          }}>
            <SleepLineChart sleeps={getSleeps()}/>
            <SleepIndicatorChart sleeps={getSleeps()}/>
          </GenericHeaderCard>
        );
      case ListType.ITEM:
        return (
          <GenericCard style={{marginVertical: 10}} onPress={item.onClick || undefined}>
            <HStack my={5} mr={5} justifyContent="space-between" alignItems="center" textAlign="center">
              <VStack mx={5}>
                <Text color="white" fontSize="lg">
                  {item.name === SleepType.SLEEP ? `${item.desc} Sleep Cycles` : 'Powernap'}
                </Text>
                <Text color="gray.400" fontSize="md">
                  {item.name === SleepType.SLEEP
                    ? `Equals ${item.desc as number * 1.5} hours sleep.`
                    : 'Equals 30 minutes sleep.'}
                </Text>
              </VStack>
              <View>
                <HStack alignItems="center" space={5}>
                  <IconButton
                    colorScheme="red"
                    borderRadius="20"
                    size="lg"
                    variant="outline"
                    icon={<Icon as={Ionicons} name="trash-outline"/>}
                    onPress={() => deleteSleep(item.id as number)}
                  />
                </HStack>
              </View>
            </HStack>
          </GenericCard>
        );
      default:
        return <React.Fragment/>;
    }
  };

  return (
    <Observer>
      {() => (
        <View width="100%" mt={50} height="100%">
          <FlashList
            contentContainerStyle={{paddingBottom: 140}}
            data={buildList()}
            renderItem={getRenderItem}
            onEndReached={() => {
              //TODO: Add end reached
            }}
            getItemType={(item) => {
              // To achieve better performance, specify the type based on the item
              return typeof item === "string" ? "sectionHeader" : "row";
            }}
            estimatedItemSize={200}
            ListFooterComponent={<View height={120}>
              <Text color="white" fontSize="md" textAlign="center" mt={10}>
                {getSleeps()?.length! > 0  ? `No more sleeps to show.\nTotal Sleeps: ${getSleeps()?.length}` : "No sleeps to show.\nWhy didn't you sleep?"}
              </Text>
            </View>}
          />
        </View>)
      }
    </Observer>
  );
};
