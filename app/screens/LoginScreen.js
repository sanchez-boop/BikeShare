import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { TextInput } from "react-native-paper";
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

/*function SignIn({ navigation }) {
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
*/

export default function LoginScreen({ navigation }) {
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.testView}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.mainView}>
        <View style={styles.topRectangle} />
        <Image source={logo} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.title}>BikeN'Gold</Text>

          <TextInput
            style={styles.emailInput}
            onChangeText={changeEmailInput}
            value={emailInput}
            mode="outlined"
            label="Knight's Email"
            activeOutlineColor="#000000"
          />
          <View>
            <View style={styles.textAndEyeContainer}>
              <TextInput
                style={styles.passwordinput}
                secureTextEntry={isSecureEntry}
                mode="outlined"
                onChangeText={changePasswordInput}
                value={passwordInput}
                label="Password"
                outlineColor="#b1b1b1"
                activeOutlineColor="#000000"
              />
              <TouchableOpacity
                onPress={() => {
                  changeIsSecureEntry((prev) => !prev);
                }}
                style={styles.eyeContainer}
              >
                <Image source={eye} style={styles.eye} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => alert("Continue to password forget here!")}
              style={{ alignSelf: "flex-start", marginTop: 8 }}
            >
              <Text style={styles.forgotPassword}>Forget your password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main")}
            style={styles.signInButton}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                textAlign: "center",
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
    </KeyboardAwareScrollView>
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
    height: 170,
    width: 170,
    marginTop: -35,
    marginBottom: 15,
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
    fontSize: 48,
    fontWeight: "bold",
    top: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  emailInput: {
    width: 280,
    height: 55,
    backgroundColor: "#F4FEFF",
    lineHeight: 40,
    marginBottom: 15,
  },
  textAndEyeContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "relative",
  },
  passwordinput: {
    width: 280,
    height: 55,
    backgroundColor: "#F4FEFF",
    lineHeight: 40,
  },
  eyeContainer: {
    position: "absolute",
    height: "60%",
    width: "12%",
    top: 23,
    right: 4,
    backgroundColor: "#F4FEFF",
  },
  eye: {
    height: 22,
    width: 22,
  },
  forgotPassword: {
    fontSize: 13.3,
    color: "#555555",
  },
  signInButton: {
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
    marginTop: 20,
  },
  signInUpRedirect: {
    height: 30,
    width: 210,
    backgroundColor: "#F4FEFF",
    marginTop: 28,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 40,
  },
});
