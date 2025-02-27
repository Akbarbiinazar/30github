import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabsLayout from "./(tabs)/_layout";

const App = () => {
  return (
    <NavigationContainer>
      <TabsLayout />
    </NavigationContainer>
  );
};

export default App;
