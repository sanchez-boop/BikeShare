import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { TextInput } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LogBox,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import logo from "../assets/Shop-Logo.png";
import oldlogo from "../assets/Shop-Logo-Old.png";
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
  const [rePasswordInput, changeRePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
  const [firstNameInput, changeFirstNameInput] = React.useState(null);
  const [lastNameInput, changeLastNameInput] = React.useState(null);

  return (
    <DismissKeyboard>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.testView}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        scrollEnabled={false}
      >
        <View style={styles.mainView}>
          <View style={styles.topRectangle} />
          <Image source={logo} style={styles.logo} />
          <View style={styles.content}>
            <Text style={styles.title}>BikeN'Gold</Text>

            <View style={{ flexDirection: "row"}}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.firstNameInput}
                  onChangeText={changeFirstNameInput}
                  value={firstNameInput}
                  mode='outlined'
                  label="First Name"
                  outlineColor='#b1b1b1'
                  activeOutlineColor='#000000'
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.lastNameInput}
                  onChangeText={changeLastNameInput}
                  value={lastNameInput}
                  mode='outlined'
                  label="Last Name"
                  outlineColor='#b1b1b1'
                  activeOutlineColor='#000000'
                />
              </View>
            </View>

            <TextInput
              style={styles.phoneNumber}
              onChangeText={changeEmailInput}
              value={emailInput}
              mode='outlined'
              label="Phone Number"
              outlineColor='#b1b1b1'
              activeOutlineColor='#000000'
            />

            <TextInput
              style={styles.emailInput}
              onChangeText={changeEmailInput}
              value={emailInput}
              mode='outlined'
              label="Knight's Email"
              outlineColor='#b1b1b1'
              activeOutlineColor='#000000'
            />

            <TextInput
              style={styles.passwordinput}
              secureTextEntry={isSecureEntry}
              onChangeText={changePasswordInput}
              value={passwordInput}
              mode='outlined'
              label="Password"
              outlineColor='#b1b1b1'
              activeOutlineColor='#000000'
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
              onChangeText={changeRePasswordInput}
              value={rePasswordInput}
              mode='outlined'
              label="Re-enter Password"
              outlineColor='#b1b1b1'
              activeOutlineColor='#000000'
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
              onPress={() => navigation.navigate("Main")}
              style={styles.signUpButton}
            >
              <Text
                style={{ fontSize: 20, color: "#fff", textAlign: "center" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Sign-In")}>
              <View style={styles.signInUpRedirect}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "#000000",
                  }}
                >
                  Have an account?{" "}
                  <Text
                    style={{
                      color: "#00A4EB",
                    }}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    </DismissKeyboard>
  );
}
//}

const styles = StyleSheet.create({
  testView: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: -150,
  },
  mainView: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topRectangle: {
    width: "100%",
    height: "8.55%",
    backgroundColor: colors.primary,
  },
  logo: {
    height: 140,
    width: 140,
    marginTop: -42,
    marginBottom: 5,
  },
  content: {
    width: "90%",
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
    marginTop: 20,
    fontSize: 48,
    fontWeight: "bold",
  },
  firstNameInput: {
    height: 55,
    width: 150,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#F4FEFF",
  },
  lastNameInput: {
    height: 55,
    width: 150,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#F4FEFF",
  },
  phoneNumber: {
    height: 55,
    width: 310,
    margin: 40,
    marginLeft: 30,
    marginBottom: -20,
    marginTop: -20,
    backgroundColor: "#F4FEFF",
  },
  emailInput: {
    height: 55,
    width: 310,
    margin: 40,
    marginLeft: 30,
    marginBottom: 36,
    backgroundColor: "#F4FEFF",
  },
  passwordinput: {
    height: 55,
    width: 310,
    margin: 40,
    marginLeft: 30,
    marginTop: -16,
    backgroundColor: "#F4FEFF",
  },
  passwordView: {
    height: 25,
    width: 25,
    marginLeft: 335,
    marginTop: -80,
    marginBottom: 50,
  },
  signUpButton: {
    height: 45,
    width: 220,
    marginTop: -10,
    backgroundColor: "#000000",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: "center",
  },
  signInUpRedirect: {
    height: 30,
    width: 210,
    backgroundColor: "#F4FEFF",
    padding: 1,
    marginBottom: 20,
    justifyContent: "center",
    margin: 28,
    borderRadius: 20,
  },
});