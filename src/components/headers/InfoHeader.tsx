import React, {useRef} from "react";
import {Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet} from "react-native";
import {Heading, HStack, Icon, IconButton, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function InfoHeader(props: { children: React.ReactNode; }) {
  const navigation = useNavigation();

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
      height: 10,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    },
    topHeaderBar: {
      height: 120,
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
            scrollviewRef.current?.scrollTo({x: 0, y: HEADER_MIN_HEIGHT + 10, animated: true});
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
            transform: [{translateY: titleTranslateY}]
          }
        ]}>
        <HStack justifyContent="space-between" alignItems="center" width="100%" height="100%" bgColor="black">
          <IconButton colorScheme="white"
                      borderRadius="full"
                      color="white"
                      size="lg"
                      onPress={() => navigation.goBack()}
                      icon={<Icon as={MaterialCommunityIcons} name="arrow-left" size="2xl"/>}
          />
          <Heading color="white" size="lg" letterSpacing={0.1} fontWeight="lighter">
            Informations
          </Heading>
          <IconButton colorScheme="purple"
                      variant="unstyled"/>
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
