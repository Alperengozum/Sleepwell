import React, {useEffect, useRef, useState} from "react";
import {Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet} from "react-native";
import {Heading, HStack, Icon, IconButton, Text, View, VStack} from "@gluestack-ui/themed-native-base";
import {useLinkTo} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import LiveClock from "../clock/LiveClock";
import { getCalendars } from 'expo-localization';
export default function CalculatorHeader(props: { children: React.ReactNode; }) {
  const linkTo = useLinkTo();
  const [is24Hour, setIs24Hour] = useState<boolean | undefined>(undefined);

  const HEADER_MAX_HEIGHT = 240;
  const HEADER_MIN_HEIGHT = 150;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollviewRef = useRef();

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp"
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp"
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp"
  });

  const welcomeTitleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp"
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -90],
    extrapolate: "clamp"
  });

  const styles = StyleSheet.create({
    saveArea: {
      flex: 1,
      backgroundColor: "black",
    },
    header: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: "transparent",
      overflow: "hidden",
      height: HEADER_MAX_HEIGHT
    },
    headerBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      width: 0,
      height: HEADER_MAX_HEIGHT,
      resizeMode: "cover"
    },
    topBar: {
      marginTop: 120,
      height: 10,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    topHeaderBar: {
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    title: {
      color: "black",
      fontSize: 20
    }
  });

  const openInfoScreen = () => {
    linkTo("/Info");
  }

  useEffect(()=>{

    const findTimeFormat = async () => {setIs24Hour(getCalendars()[0].uses24hourClock || false)}
    findTimeFormat();
  }, [])

  return (
    <View style={styles.saveArea}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT - 32, paddingBottom: 100}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        ref={scrollviewRef}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (e.nativeEvent.contentOffset.y > HEADER_MAX_HEIGHT / 5 && e.nativeEvent.contentOffset.y < HEADER_MAX_HEIGHT) {
            //@ts-ignore
            scrollviewRef.current?.scrollTo({x: 0, y: HEADER_MAX_HEIGHT + 10, animated: true});
          }
        }}>
        {props?.children}
      </Animated.ScrollView>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
        <Animated.View
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslateY}]
            }
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.topHeaderBar,
          {
            marginTop: 50,
            transform: [{scale: welcomeTitleScale}, {translateY: titleTranslateY}]
          }
        ]}>
        <VStack alignItems="center">
          <HStack mt={5} mx={10} space={2}>
            <Heading color="white" size="xl" letterSpacing={0.1} fontWeight="thin">
              Sleep
            </Heading>
            <Heading color="purple.700" size="xl" letterSpacing={0.1} fontWeight="thin">
              well
            </Heading>

          </HStack>
          {is24Hour != undefined ? <LiveClock is24Hour={is24Hour}/> : <React.Fragment/>}
          <Text color="gray.400">
            {moment().format("dddd, D MMMM YYYY")}
          </Text>
        </VStack>
      </Animated.View>
      <Animated.View
        style={[styles.topBar, {transform: [{scale: 1}, {translateY: -90}]}]}>
        <HStack justifyContent="flex-end" alignItems="center" width="100%" height="100%">
          <IconButton
            colorScheme="purple"
            borderRadius="full"
            onPress={openInfoScreen}
            icon={<Icon as={Ionicons} name="information-circle-outline" size={8} />}
          />
        </HStack>
      </Animated.View>
    </View>
  );

}
