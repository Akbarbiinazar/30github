import { View, Text } from "react-native";
import React from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Profile = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={{ paddingBottom: tabBarHeight }}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
