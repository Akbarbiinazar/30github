import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

import TopTabsGroup from "@/components/ui/TopTabsGroup";

export default function app() {
  return (
    <View >
      <TopTabsGroup />
    </View>
  );
}
