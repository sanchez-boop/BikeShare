import React, { Component } from "react";
import {} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import {
  useFonts,
  HindVadodara_600SemiBold,
} from "@expo-google-fonts/hind-vadodara";
import {
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import BikeAvailability from "./app/screens/BikeAvailability";
import Waiver from "./app/screens/Waiver";
import Profile from "./app/screens/Profile";
import ShopInfo from "./app/screens/ShopInfo";
import colors from "./app/config/colors";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    HindVadodara_600SemiBold,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Sign-In" component={LoginScreen} />
          <Stack.Screen name="Sign-Up" component={RegisterScreen} />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function Main() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "account-circle" : "account-circle";

            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons name={iconName} size={28} color={color} />
            );
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tab.Screen
        name="Bike Availability"
        component={BikeAvailability}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "pedal-bike" : "pedal-bike";

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tab.Screen
        name="Waiver"
        component={Waiver}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "ios-newspaper" : "ios-newspaper";

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tab.Screen
        name="Info"
        component={ShopInfo}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "info-with-circle" : "info-with-circle";

            // You can return any component that you like here!
            return <Entypo name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: "gray",
        }}
      />
    </Tab.Navigator>
  );
}
