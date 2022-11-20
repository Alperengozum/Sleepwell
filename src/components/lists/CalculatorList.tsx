import React, {useEffect, useState} from "react";
import {FlashList} from "@shopify/flash-list";
import {Box, Center, Heading, HStack, Icon, Text, View, VStack} from "native-base";
import {GenericCard} from "../cards/GenericCard";
import {GenericHeaderCard} from "../cards/GenericHeaderCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/native";
import {
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDatetimePickerAndroid
} from "react-native-material-datetime-picker";
import {addHours, createIntentAlarm} from "./CycleList";
import {Observer} from "mobx-react";
import {SleepType} from "../../store/SleepStore";
import mobileAds, {AdEventType, InterstitialAd, TestIds} from 'react-native-google-mobile-ads';

const navigation = useNavigation();

interface List {
  name: string;
  type: ListType;
  desc?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

enum ListType {
  HEADER,
  ITEM
}

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {requestNonPersonalizedAdsOnly: true});

export const CalculatorList = () => {
  const [loaded, setLoaded] = useState(false);

  const list: (List)[] = [
    {
      name: "Sleep",
      type: ListType.HEADER,
      icon: <Icon color="white" as={MaterialCommunityIcons} name="power-sleep" size="2xl"/>
    },
    {
      name: "Go to bed now",
      desc: "If I sleep now, when should i get up?",
      onClick: () => goToBedNow(),
      type: ListType.ITEM
    },
    {
      name: "When to wake up?",
      desc: "Find the perfect time to wake up.",
      onClick: () => whenToWakeUp(),
      type: ListType.ITEM
    },
    {
      name: "When to go to bed?",
      desc: "Find the perfect time to go to bed.",
      onClick: () => whenToGoToBed(),
      type: ListType.ITEM
    },
    {
      name: "Power nap",
      type: ListType.HEADER,
      icon: <Icon color="white" as={MaterialCommunityIcons} name="desk" size="2xl"/>,
    },
    {
      name: "Take a power nap",
      desc: " Improve your productivity, your focus, and simply enjoy the feeling!",
      type: ListType.ITEM,
      onClick: () => takeAPowerNap()
    },
  ];

  const stickyHeaderIndices = list
    .map((item, index) => {
      if (item.type === ListType.HEADER) {
        return index;
      } else {
        return null;
      }
    })
    .filter((item: number | null) => item !== null) as number[];

  const goToBedNow = (): void => {
    const date = new Date();
    showAdOrNavigate({name: "Cycle", params:  {time: date.getTime(), isStart: true}})
  }

  const whenToWakeUp = (): void => {
    showTimePicker('Select bed time.', true);
  }

  const whenToGoToBed = (): void => {
    showTimePicker('Select wake up time.', false);
  }

  const takeAPowerNap = (): void => {
    let date: Date = new Date();
    date = addHours(date, 0.5);
    if(loaded){
      interstitial.show().then(r => {
        setLoaded(false);
        return createIntentAlarm(date, SleepType.POWERNAP);
      });
    }
    createIntentAlarm(date, SleepType.POWERNAP);
  }

  const showTimePicker = (title: string, isStart: boolean = true): void => {
    let currentTime = new Date();
    MaterialDatetimePickerAndroid.show({
      value: currentTime,
      titleText: title,
      mode: AndroidPickerMode.TIME,
      is24Hours: false,
      inputMode: AndroidTimeInputMode.CLOCK,
      negativeButtonText: " ",
      onConfirm: (time: Date) => {
        showAdOrNavigate({name: "Cycle", params: {time: time.getTime(), isStart}})
      },
    });
  };

  const showAdOrNavigate = (navigationConfig: {name: string, params: Record<string,any>}): void => {
    if(loaded){
      interstitial.show().then(r => {
        setLoaded(false);
        return navigation.navigate(navigationConfig);
      });
    }
    else{
      navigation.navigate(navigationConfig);
    }
  }
  useEffect(()=> {
    mobileAds().initialize();
  }, [])

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });
    interstitial.load();

    return unsubscribe;
  }, []);

  return (
    <Observer>
      {() => (
        <View width="100%" mt={50}>
          <FlashList
            data={list}
            renderItem={({item}) => {
              if (item!.type === ListType.HEADER) {
                return <GenericHeaderCard>
                  <HStack mx={5} justifyContent="flex-start" alignItems="flex-start">
                    {item.icon || <React.Fragment/>}
                    <Box size={5}/>
                    <Text color="white" fontSize="lg">{item.name}</Text>
                  </HStack>
                </GenericHeaderCard>;
              } else if (item.type == ListType.ITEM) {
                return <GenericCard style={{marginVertical: 10}} onPress={item.onClick || undefined}>
                  <VStack my={item.desc ? 5 : 10}>
                    <Center>
                      <Heading color="white" fontWeight="lighter">
                        {item.name}
                      </Heading>
                      {item.desc ? <Text color="white" textAlign="center" mx={5}>
                        {item.desc}
                      </Text> : <React.Fragment/>}
                    </Center>
                  </VStack>
                </GenericCard>
              } else {
                return <React.Fragment/>
              }
            }}
            stickyHeaderIndices={stickyHeaderIndices}
            getItemType={(item) => typeof item === "string" ? "sectionHeader" : "row"}
            estimatedItemSize={10}
          />
        </View>)}
    </Observer>
  );
};
