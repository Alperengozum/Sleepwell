import {Button, HStack, Icon, Text, View, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import SettingsStore, {SettingsType} from "../../store/SettingsStore";
import {GenericCard} from "./GenericCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {TestIds, useRewardedAd} from "react-native-google-mobile-ads";
import {MotiView} from "moti";
import moment from "moment";

export const SupportMeCard = () => {

  const adUnitId = TestIds.REWARDED;

  const { isLoaded, isClosed, load, show } = useRewardedAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      SettingsStore.editSetting(SettingsType.SUPPORT_ME, moment().toDate().getTime())
    }
  }, [isClosed]);

  const onPress = () => {
    show()
  }

  const RenderButton = () => {
    const lastSupportedTime = SettingsStore.getSettings(SettingsType.SUPPORT_ME);
    if (isClosed || (lastSupportedTime && (lastSupportedTime[0]?.value as number +  60 * 60 * 1000 * 3) > moment().toDate().getTime())){
      return <VStack space={1} alignItems="center">
        {
          lastSupportedTime && (lastSupportedTime[0]?.value as number +  60 * 60 * 1000 * 3) > moment().toDate().getTime() ?
            <Text color="white"> You can come back {moment(lastSupportedTime[0]?.value as number +  60 * 60 * 1000 * 3).fromNow()} </Text> : <React.Fragment/>
        }
        <Text color="white">Thanks!</Text>
        <MotiView
        from={{
          scale: 1
        }}
        animate={{
          scale: 5
        }}
        transition={{
          type: "spring",
          repeat: 4
        }}
        style={{
        height:40
        }}
        >
        <Icon color="purple.700" as={MaterialCommunityIcons} name="heart"  flex={1} size={"2xl"}/>
      </MotiView>
      </VStack>
    }
    if (isLoaded){
      return <Button colorScheme="emerald"
                     borderRadius="15"
                     size="md"
                     variant="solid"
                     onPress={onPress}>
        <HStack alignItems="center" space={1}>
          <Icon color="white" as={MaterialCommunityIcons} name="play-circle-outline" size="2xl"/>
          <Text color="white" bold>Watch</Text>
        </HStack>
      </Button>
    }
    else {
      return <Text color="white">Please wait...</Text>
    }
  }

  return (
    <GenericCard style={{marginVertical: 10}}>
      <HStack my={5} mr={5} justifyContent="space-between" alignItems="center" textAlign="center">
        <VStack mx={5} flex={1}>
          <Text color="white" fontSize="lg">{SettingsType.SUPPORT_ME}</Text>
          <Text color="gray.400" fontSize="md">Support me with watching ad</Text>
        </VStack>
        <View flex={1}>
            <RenderButton/>
        </View>
      </HStack>
    </GenericCard>
  );
};
