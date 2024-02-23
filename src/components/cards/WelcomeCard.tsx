import {HStack, Icon, IconButton, Text, View, VStack} from "@gluestack-ui/themed-native-base";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsStore, {SettingsType} from "../../store/SettingsStore";
import {GenericCard} from "./GenericCard";
import {useNavigation} from "@react-navigation/native";

export const WelcomeCard = () => {
  const navigation = useNavigation();

  const onShowPress = () => {
    SettingsStore.editSetting(SettingsType.WELCOME, true);
    //@ts-ignore
    navigation.navigate("Welcome")
  }

  return (
    <GenericCard style={{marginVertical: 10}}>
      <HStack my={5} mr={5} justifyContent="space-between" alignItems="center" textAlign="center">
        <VStack mx={5} flex={1}>
          <Text color="white" fontSize="md">{"Show Welcome Slide"}</Text>
        </VStack>
        <View flex={1}>
          <HStack alignItems="center" justifyContent="flex-end" space={5}>
            <IconButton
              bg={"$purple.800"}
              _active={{
                bg: "$purple.600"
              }}
              borderRadius="15"
              variant="outline"
              icon={<Icon as={Ionicons} name="caret-forward-outline" size={8} color={"white"}/>}
              onPress={onShowPress}
            />
          </HStack>
        </View>
      </HStack>
    </GenericCard>
  );
};
