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

/*function SignUp({ navigation }) {
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
  const [firstNameInput, changeFirstNameInput] = React.useState(null);
  const [lastNameInput, changeLastNameInput] = React.useState(null);
*/

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function RegisterScreen({ navigation }) {
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
  const [firstNameInput, changeFirstNameInput] = React.useState(null);
  const [lastNameInput, changeLastNameInput] = React.useState(null);

  return (
    <DismissKeyboard>
      <View style={styles.mainView}>
        <View style={styles.topRectangle} />
        <Image source={logo} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.title}>BikeN'Gold</Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.firstNameInput}
                onChangeText={changeFirstNameInput}
                value={firstNameInput}
                placeholder="First Name"
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.lastNameInput}
                onChangeText={changeLastNameInput}
                value={lastNameInput}
                placeholder="Last Name"
              />
            </View>
          </View>

          <TextInput
            style={styles.phoneNumber}
            onChangeText={changeEmailInput}
            value={emailInput}
            placeholder="Phone Number"
          />

          <TextInput
            style={styles.emailInput}
            onChangeText={changeEmailInput}
            value={emailInput}
            placeholder="Knights Email"
          />

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
              style={{ height: 22, width: 22, marginLeft: 1, marginTop: 1 }}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.passwordinput}
            secureTextEntry={isSecureEntry}
            onChangeText={changePasswordInput}
            value={passwordInput}
            placeholder="Re-enter Password"
          />

          <TouchableOpacity
            onPress={() => {
              changeIsSecureEntry((prev) => !prev);
            }}
            style={styles.passwordView}
          >
            <Image
              source={eye}
              style={{ height: 22, width: 22, marginLeft: 1, marginTop: 1 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert("Continue to sign up here!")}
            style={styles.signUpButton}
          >
            <Text style={{ fontSize: 20, color: "#fff", marginLeft: 70 }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={styles.signInUpRedirect}>
            <Text
              style={{
                width: 167,
                fontSize: 12,
                color: "#000000",
                marginLeft: 34,
                marginTop: 4,
              }}
            >
              Have an account?{" "}
              <Text
                onPress={() => navigation.navigate("Sign-In")}
                style={{
                  fontSize: 12,
                  color: "#00A4EB",
                  marginLeft: 12,
                  marginTop: 4,
                }}
              >
                Sign In
              </Text>
            </Text>
          </View>
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
    height: 275,
    width: 275,
    marginTop: -85,
    marginBottom: -36,
  },
  content: {
    width: "90%",
    height: "68%",
    backgroundColor: "#ffeda6",
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#B5B5B5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginLeft: 53,
    marginTop: 10,
    marginBottom: -30,
  },
  firstNameInput: {
    height: 55,
    width: 150,
    margin: 40,
    marginLeft: 30,
    padding: 10,
    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: "#B5B5B5",
    backgroundColor: "#F4FEFF",
  },
  lastNameInput: {
    height: 55,
    width: 150,
    margin: 40,
    marginLeft: 4,
    padding: 10,
    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: "#B5B5B5",
    backgroundColor: "#F4FEFF",
  },
  phoneNumber: {
    height: 55,
    width: 310,
    margin: 40,
    marginLeft: 30,
    marginBottom: -20,
    marginTop: -20,
    padding: 10,
    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: "#B5B5B5",
    backgroundColor: "#F4FEFF",
  },
  emailInput: {
    height: 55,
    width: 310,
    margin: 40,
    marginLeft: 30,
    marginBottom: 36,
    padding: 10,
    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: "#B5B5B5",
    backgroundColor: "#F4FEFF",
  },
  passwordinput: {
    height: 55,
    width: 310,
    margin: 40,
    marginLeft: 30,
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
  signUpButton: {
    height: 45,
    width: 220,
    backgroundColor: "#000000",
    padding: 5,
    marginTop: -16,
    marginBottom: -10,
    marginLeft: 72,
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
