import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LogBox,
  Image,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App(
  {
    /*navigation*/
  }
) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign-In" component={LoginScreen} />
        <Stack.Screen name="Sign-Up" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
