import { View, Text } from "react-native";
import React from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Quran = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={{ paddingBottom: tabBarHeight }}>
      <Text>Quran</Text>
    </View>
  );
};

export default Quran;
