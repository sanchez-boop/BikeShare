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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import logo from "../assets/Shop-Logo.png";
import eye from "../assets/icons8-eye-30.png";
import colors from "../config/colors";

/*function SignIn({ navigation }) {
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
*/

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function LoginScreen({ navigation }) {
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);

  return (
    <DismissKeyboard>
      <View style={styles.mainView}>
        <View style={styles.topRectangle} />
        <StatusBar style="auto" />
      </View>
    </DismissKeyboard>
  );
}
//}

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
    height: "10%",
    backgroundColor: colors.primary,
  },
  logo: {
    height: 275,
    width: 275,
    marginTop: -85,
    marginBottom: -10,
  },
  content: {
    width: "90%",
    height: "53%",
    backgroundColor: "#ffeda6",

    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#B5B5B5",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    top: 20,
    margin: 10,
  },
  emailInput: {
    width: 271.15,
    height: 55,
    margin: 40,
    padding: 10,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: "#B5B5B5",
    backgroundColor: "#F4FEFF",
  },
  passwordinput: {
    width: 271.15,
    height: 55,
    margin: 40,
    padding: 10,
    marginTop: -16,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: "#B5B5B5",
    backgroundColor: "#F4FEFF",
  },
  passwordView: {
    height: 25,
    width: 25,
    marginLeft: 295,
    marginTop: -80,
    marginBottom: 50,
  },
  forgotPassword: {
    fontSize: 13.3,
    color: "#555555",
  },
  signInButton: {
    height: 45,
    width: 214,
    backgroundColor: "#000000",
    padding: 5,

    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  signInUpRedirect: {
    height: 30,
    width: 210,
    backgroundColor: "#F4FEFF",
    padding: 1,
    alignSelf: "center",
    margin: 28,
    borderRadius: 20,
  },
});
