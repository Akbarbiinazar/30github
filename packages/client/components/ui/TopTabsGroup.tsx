import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "@/app/screens/HomeScreen";
import CommunityScreen from "@/app/screens/community";
import { useNavigation } from "@react-navigation/native";

type ActiveTabState = "Today" | "Community";

const TopTabs = createMaterialTopTabNavigator();

const TopTabsGroup = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.headerContainer}>
      {/* <View style={[styles.tabBarContainer, { width: screenWidth * 0.3 }]}>
        
      </View> */}
      <View style={styles.rightIcons}>
        <View style={styles.iconsCenter}>
          <TouchableOpacity
            onPress={() => console.log("Notifications Pressed")}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontWeight: "bold",
          },
          tabBarIndicatorStyle: {
            height: 5,
            borderRadius: 5,
            backgroundColor: "#E57373",
          },
        }}
      >
        <TopTabs.Screen
          name="index"
          component={HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <TopTabs.Screen name="community" component={CommunityScreen} />
      </TopTabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  rightIcons: {
    position: "absolute",
    right: 20,
    top: 10,
    flexDirection: "row",
    gap: 15,
  },
  iconsCenter: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TopTabsGroup;
