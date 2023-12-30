import React, {useRef} from "react";
import {Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet} from "react-native";
import {Heading, HStack, Icon, IconButton, Text, View, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SleepFilter} from "../../store/SleepStore";
import {getMonthBefore} from "../../utils/DateUtils";

export default function ReportsHeader(props: { children: React.ReactNode, selectedDate: SleepFilter, setSelectedDate: React.Dispatch<React.SetStateAction<SleepFilter>> }) {
  const {selectedDate, setSelectedDate} = props;

  const onLeftDateButtonPress = () => {
    setSelectedDate({
      start: getMonthBefore(selectedDate.start, 1),
      end: selectedDate.start
    })
  }
  const onRightDateButtonPress = () => {
    const monthAfter = new Date(selectedDate.end?.getTime() || 0);
    monthAfter.setMonth(monthAfter.getMonth() + 1);
    setSelectedDate({
      start: selectedDate.end,
      end: monthAfter
    })
  }
  const HEADER_MAX_HEIGHT = 150;
  const HEADER_MIN_HEIGHT = 80;
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

  const opacitySettingButton = scrollY.interpolate({
    inputRange: [HEADER_SCROLL_DISTANCE - 10, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp"
  });

  const welcomeTitleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.5],
    extrapolate: "clamp"
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: "clamp"
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -20],
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
      width: null,
      height: HEADER_MAX_HEIGHT,
      resizeMode: "cover"
    },
    topBar: {
      marginTop: 120,
      height: 120,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    topHeaderBar: {
      height: 80,
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

  return (
    <View style={styles.saveArea}>
      {props && props.children && React.cloneElement(props.children as React.ReactElement, {
        selectedDate: selectedDate,
        setSelectedDate: setSelectedDate,
      })}
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
            transform: [{translateY: titleTranslateY}]
          }
        ]}>
        <HStack justifyContent="space-between" alignItems="center" width="100%" height="100%" bgColor="black">
          <IconButton variant="ghost" colorScheme={"white"}
                      icon={<Icon as={Ionicons} name="chevron-back-outline" color={"white"}/>}
                      onPress={onLeftDateButtonPress}/>
          <VStack alignItems={"center"}>
            <Heading color="white" size="xl" letterSpacing={0.1} fontWeight="thin">
              Reports
            </Heading>
            <Text color="white" fontSize="md" letterSpacing={0.1} fontWeight="thin">
              {selectedDate.start?.toLocaleDateString()} - {selectedDate.end?.toLocaleDateString()}
            </Text>
          </VStack>
          <IconButton variant="ghost" colorScheme={"white"}
                      icon={<Icon as={Ionicons} name="chevron-forward-outline" color={"white"}/>}
                      isDisabled={selectedDate.end!.getTime() >= new Date().getTime()}
                      onPress={onRightDateButtonPress}/>

        </HStack>

      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{scale: titleScale}, {translateY: titleTranslateY}],
            opacity: opacitySettingButton
          }
        ]}>
      </Animated.View>
    </View>
  );

}
