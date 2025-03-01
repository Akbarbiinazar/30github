import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabsLayout from "./app/(tabs)/_layout";

export default function App() {
  return (
    <NavigationContainer>
      <TabsLayout />
    </NavigationContainer>
  );
}
