import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {} from "react-native";
import {
  useFonts,
  HindVadodara_600SemiBold,
} from "@expo-google-fonts/hind-vadodara";
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

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    HindVadodara_600SemiBold,
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
      <Tab.Screen name="Bike Availability" component={BikeAvailability} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Waiver" component={Waiver} />
      <Tab.Screen name="Info" component={ShopInfo} />
    </Tab.Navigator>
  );
}
