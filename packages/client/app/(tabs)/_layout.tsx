import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../(auth)/login";
// import IndexScreen from "../index";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, Platform, Text, View } from "react-native";
import Icons from "@/constants/Icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Index: undefined; // ✅ Add IndexScreen route
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// const TabIcon = ({ icon, color, name, focused }) => {
//   return (
//     <View className="items-center justify-center gap-2">
//       <Image
//         source={icon}
//         resizeMode="contain"
//         tintColor={color}
//         className="w-6 h-6"
//       />
//       <Text
//         className={`${focused ? "font-psembold" : "font-pregular"} text-xs`}
//       >
//         {name}
//       </Text>
//     </View>
//   );
// };

export default function TabsLayout() {
  return (
    <NavigationContainer>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="quran"
          options={{
            title: "Quran",
            // tabBarIcon: ({ color, focused }) => (
            //   <TabIcon
            //     icon={Icons.bookmark}
            //     color={color}
            //     name="Quran"
            //     focused={focused}
            //   />
            // ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            // tabBarIcon: ({ color, focused }) => (
            //   <TabIcon
            //     icon={Icons.profile}
            //     color={color}
            //     name="Home"
            //     focused={focused}
            //   />
            // ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            // tabBarIcon: ({ color, focused }) => (
            //   <TabIcon
            //     icon={Icons.home}
            //     color={color}
            //     name="Home"
            //     focused={focused}
            //   />
            // ),
          }}
        />
      </Tabs>
    </NavigationContainer>
  );
}

// {/* <Stack.Navigator initialRouteName="Home">
//       {" "}
//       {/* ✅ Start with Index */}
//       {/* <NavigationContainer> */}
//       <Stack.Screen
//         name="Index"
//         component={IndexScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       {/* </NavigationContainer>rr */}
//     </Stack.Navigator> */}
