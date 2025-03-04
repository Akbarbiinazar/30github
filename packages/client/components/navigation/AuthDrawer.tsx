import { View, Text } from "react-native";
import React from "react";
import LoginScreen from "@/app/(auth)/login";
import RegisterScreen from "@/app/(auth)/register-screen";

const Drawer = createDrawerNavigator();

const AuthDrawer = () => {
  return (
    <Drawer.Container>
      <Drawer.Screen name="Login" components={LoginScreen} />
      <Drawer.Screen name="Register" components={RegisterScreen} />
    </Drawer.Container>
  );
};

export default AuthDrawer;
