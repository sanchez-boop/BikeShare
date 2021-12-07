import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import logo from "../assets/Shop-Logo.png";
import eye from "../assets/icons8-eye-30.png";
import colors from "../config/colors";
import ProfileNameChange from "./ProfileNameChange";
import ProfileEmailChange from "./ProfileEmailChange";
import ProfilePasswordChange from "./ProfilePasswordChange";
import ProfileNotificationChange from "./ProfileNotificationChange";

const Stack = createNativeStackNavigator();

export default function Profile(props) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileHome" component={mainProfile} />
        <Stack.Screen name="NameChange" component={ProfileNameChange} />
        <Stack.Screen name="EmailChange" component={ProfileEmailChange} />
        <Stack.Screen name="PasswordChange" component={ProfilePasswordChange} />
        <Stack.Screen
          name="NotificationChange"
          component={ProfileNotificationChange}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function mainProfile({ navigation }) {
  const { acc } = useSelector((state) => state);
  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.contentBackground}>
        <View style={styles.contentBackground2}></View>
        <View style={styles.accountIcon}>
          <MaterialCommunityIcons
            name="account-circle"
            size={104}
            color="#474747"
          />
          <Text style={{ fontSize: 20 }}>{acc.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.optionsContent}
          onPress={() => navigation.navigate("NameChange")}
        >
          <View style={styles.nameContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account-outline" size={34} />
            </View>
            <Text style={styles.optionTitle}>Name</Text>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsContent}
          onPress={() => navigation.navigate("EmailChange")}
        >
          <View style={styles.nameContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="mail-outline" size={32} />
            </View>
            <Text style={styles.optionTitle}>Email</Text>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsContent}
          onPress={() => navigation.navigate("PasswordChange")}
        >
          <View style={styles.nameContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="key-outline" size={29} />
            </View>
            <Text style={styles.optionTitle}>Password</Text>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsContent}
          onPress={() => navigation.navigate("NotificationChange")}
        >
          <View style={styles.nameContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="bell-outline" size={30} />
            </View>
            <Text style={styles.optionTitle}>Push notifications</Text>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert("Hi")}
          style={styles.signOutButton}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topRectangle: {
    width: "100%",
    height: "11%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: {
    fontFamily: "HindVadodara_600SemiBold",
    fontSize: 20,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    zIndex: -10,
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  contentBackground: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 500,
    width: "95%",
    height: "93%",
  },
  accountIcon: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  optionsContent: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#EBEBEB",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  iconContainer: {
    width: 44,
    alignItems: "center",
  },
  optionTitle: { marginRight: "auto", marginLeft: 10 },
  signOutButton: {
    height: 45,
    width: 214,
    backgroundColor: "#000000",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 200,
  },
});
