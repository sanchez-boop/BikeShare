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
import oldlogo from "../assets/Shop-Logo-Old.png";
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
        <Image source={logo} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.title}>BikeN'Gold</Text>

          <TextInput
            style={styles.emailInput}
            onChangeText={changeEmailInput}
            value={emailInput}
            placeholder="Knights Email"
          />
          <View>
            <TextInput
              style={styles.passwordinput}
              secureTextEntry={isSecureEntry}
              onChangeText={changePasswordInput}
              value={passwordInput}
              placeholder="Password"
            />

            <TouchableOpacity
              onPress={() => {
                changeIsSecureEntry((prev) => !prev);
              }}
              style={styles.passwordView}
            >
              <Image
                source={eye}
                style={{
                  right: 24,
                  height: 22,
                  width: 22,
                  marginLeft: 1,
                  marginTop: 1,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => alert("Continue to password forget here!")}
            style={{ alignSelf: "flex-start", left: 46, top: -29 }}
          >
            <Text style={styles.forgotPassword}>Forget your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main")}
            style={styles.signInButton}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                textAlign: "center",
                top: 0,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Sign-Up")}>
          <View style={styles.signInUpRedirect}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                margin: 6.8,
                marginTop: 4,
                color: "#000000",
              }}
            >
              Don't have an account?{" "}
              <Text
                style={{
                  color: "#00A4EB",
                }}
              >
                Sign Up
              </Text>
            </Text>
          </View>
          </TouchableOpacity>
        </View>
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
    height: 170,
    width: 170,
    marginTop: -35,
    marginBottom: 15,
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
