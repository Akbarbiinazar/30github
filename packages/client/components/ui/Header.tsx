import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActiveTabState = "Today" | "Community";

const Header = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabState>("Today");
  const translateX = new Animated.Value(activeTab === "Today" ? 0 : 100);

  const handleTabPress = (tab: ActiveTabState) => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: tab === "Today" ? 0 : 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.headerContainer}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabPress("Today")}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Today" && styles.activeTabText,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress("Community")}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Community" && styles.activeTabText,
            ]}
          >
            Community
          </Text>
        </TouchableOpacity>

        {/* Animated Underline */}
        <Animated.View
          style={[
            styles.underline,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => console.log("Notifications Pressed")}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.profileIcon}
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Light gray border
    backgroundColor: "#FFFFFF", // White background
  },
  tabContainer: {
    flexDirection: "row",
    position: "relative",
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888", // Inactive tab text color
  },
  activeTabText: {
    color: "#E53935", // Active tab text color (darker red)
    fontWeight: "600", // Bold for active tab
  },
  underline: {
    position: "absolute",
    bottom: -2,
    left: 0,
    width: "50%", // Half the width of the tab container
    height: 3,
    backgroundColor: "#E57373", // Light red underline
    borderRadius: 2,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd",
  },
});

export default Header;
