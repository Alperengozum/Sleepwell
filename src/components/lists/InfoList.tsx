import React from "react";
import {FlashList} from "@shopify/flash-list";
import {Button, HStack, Icon, Text, View, VStack} from "@gluestack-ui/themed-native-base";
import {GenericCard} from "../cards/GenericCard";
import {GenericHeaderCard} from "../cards/GenericHeaderCard";
import {Linking} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {InfoList as List, ListType} from "../../domain/List";

const getRenderItem = ({item}: { item: List }): React.ReactElement => {
  if (item!.type === ListType.HEADER) {
    // Rendering header
    return <GenericHeaderCard>
      <HStack mr={10} justifyContent="space-between" alignItems="center" sx={{
        textAlign: "center"
      }}>
        <Text color="white" fontSize="lg">{item.name}</Text>
        <Text color="white" fontSize="lg">{item.desc}</Text>
      </HStack>
    </GenericHeaderCard>;
  } else if (item.type == ListType.ITEM) {
    return <GenericCard style={{marginVertical: 10}}>
      <HStack my={5} flex={1} justifyContent="space-between" alignItems="center" sx={{
        textAlign: "center"
      }}>
        <VStack mx={5} space={2} flex={1} alignItems="center">
          <Text color="white" fontSize="md">{item.name}</Text>
          <Text color="gray.400" fontSize="sm">{item.desc}</Text>
          {item.link ? <Button endIcon={item.icon} variant="solid" _active={{
            bg: "$purple.800"
          }} bg={"$purple.600"} borderRadius={16}
                               onPress={() => Linking.openURL(item.link)}>
            {item.buttonText || "Link"}
          </Button> : <React.Fragment/>}
        </VStack>
      </HStack>
    </GenericCard>
  } else {
    return <React.Fragment/>
  }
}

export const InfoList = () => {

  const list: Array<List> = [
    {
      name: "Health notice 💜",
      desc: "Sleepwell cannot be associated with healthcare professionals and not gives recommendations.",
      type: ListType.ITEM
    },
    {
      name: "Where does the logo come from?",
      desc: "It is a mix of 🌌 Milky Way and 🌙 Crescent Moon emojis, I fixed some details." +
        " Images of the emoji use Twemoji - Twitter's open-source emoji collection (License: CC BY-SA 4.0)",
      type: ListType.ITEM
    },
    {
      name: "Is Sleepwell an open-source project?",
      desc: "YES! You can reach whole project in Github",
      link: "https://github.com/Alperengozum/Sleepwell",
      type: ListType.ITEM,
      buttonText: "Open Github Project",
      icon: <Icon color="white" as={MaterialCommunityIcons} name="github" size={6}/>,
    },
    {
      name: "Can I add new feature? 👋",
      desc: "Of course! Pull Request is Github are welcome.",
      link: "https://github.com/Alperengozum/Sleepwell/pulls",
      type: ListType.ITEM,
      buttonText: "Open Github Pulls",
      icon: <Icon color="white" as={MaterialCommunityIcons} name="github" size={6}/>,
    },
    {
      name: "I have a Issue",
      desc: "I'm sorry to hear that 😔. Please open Github Issue or mail me to fix it ASAP",
      link: "https://github.com/Alperengozum/Sleepwell/issues",
      type: ListType.ITEM,
      buttonText: "Open Github Issues",
      icon: <Icon color="white" as={MaterialCommunityIcons} name="github" size={6}/>,
    },
    {
      name: "I want to contact you",
      desc: "Wanna mail me?",
      link: "mailto:alperengozum0@gmail.com",
      type: ListType.ITEM,
      icon: <Icon color="white" as={Ionicons} name="send-outline" size={6}/>,
      buttonText: "Send Mail"
    },
    {
      name: "Other Projects",
      desc: "I'm sharing my mobile projects in Play Store, also you can check my Github. Here it's my play store link.",
      link: "https://play.google.com/store/apps/dev?id=8842825248111634874",
      type: ListType.ITEM,
      buttonText: "Open Google Play Store",
      icon: <Icon color="white" as={MaterialCommunityIcons} name="google-play" size={6}/>,
    }
  ]

  const stickyHeaderIndices = list
    .map((item, index) => {
      if (item.type === ListType.HEADER) {
        return index;
      } else {
        return null;
      }
    })
    .filter((item: number | null) => item !== null) as number[];

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
