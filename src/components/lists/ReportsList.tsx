import React, {useEffect} from "react";
import {FlashList} from "@shopify/flash-list";
import {HStack, Icon, IconButton, Text, View, VStack} from "native-base";
import {GenericCard} from "../cards/GenericCard";
import {GenericHeaderCard} from "../cards/GenericHeaderCard";
import SleepStore, {Sleep, SleepType} from "../../store/SleepStore";
import {Observer} from "mobx-react";
import Ionicons from "react-native-vector-icons/Ionicons";

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

export const ReportsList = () => {
    const [count, setCount] = React.useState(1);
    const buildList = (start?: number, count?: number): Array<List> => {
        let sleeps = SleepStore.getSleeps(SleepType.SLEEP, 30) || []
        if (start && count) {
            sleeps = sleeps.slice(start, count)
        }
        return sleeps.map(
            (sleep: Sleep): List => {
                return {
                    type: ListType.ITEM,
                    name: sleep.type,
                    desc: sleep.cycle,
                    id: sleep.id
                }
            }
        );
    }

    const deleteSleep = (id: number) => {
        SleepStore.deleteSleep(id)
    }
    const getRenderItem = ({item}: {item: List}): React.ReactElement => {
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
                <HStack my={5} mr={5} justifyContent="space-between" alignItems="center" textAlign="center">
                    <VStack mx={5}>
                        <Text color="white"
                              fontSize="lg">{item.name == SleepType.SLEEP ? item.desc + " Sleep Cycles" : "Powernap"}</Text>
                        <Text color="gray.400"
                              fontSize="md">{item.name == SleepType.SLEEP ? "Equals " + item.desc * 1.5 + " hours sleep." : "Equals " + 30 + " minutes sleep."}</Text>
                    </VStack>
                    <View>
                        <HStack alignItems="center" space={5}>
                            <IconButton colorScheme="red"
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
        } else {
            return <React.Fragment/>
        }
    };

    return (
        <Observer>
            {() => (
                    <View width="100%" mt={50} height="100%">
                        <FlashList
                            data={buildList(0, 10 * count)}
                            renderItem={getRenderItem}
                            onEndReached={() => {
                                if(count > 3) return
                                setCount(count + 1)
                            }}
                            getItemType={(item) => {
                                // To achieve better performance, specify the type based on the item
                                return typeof item === "string" ? "sectionHeader" : "row";
                            }}
                            estimatedItemSize={200}
                        />
                    </View>)
            }
        </Observer>
    );
};
