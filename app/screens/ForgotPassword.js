import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
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
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { postLogin } from "../controller/postLogin";
import { signIn } from "../model/accSlice";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BlurView } from "expo-blur";
import logo from "../assets/Shop-Logo.png";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function LoginScreen({ navigation }) {
  /* We may not need the following three const's */
  const [emailInput, changeEmailInput] = React.useState(null);
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    /*set initial credentials to ""*/
    email: "",
    password: "",
  });

  function inputNameChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      email: text,
    });
  }

  function logIn() {
    async function asyncDispatch() {
      /*Await the API response. The API returns an 
      array of a single object with user info, such
      as an email. if arr>0, log the user in.
      else, return login failed*/
      const account = await postLogin(formInput);

      if (account.length > 0) {
        /*On successful login, update the redux state 
        with account info and push the home screen*/

        dispatch(signIn(account[0]));
        navigation.navigate("Main", { screen: "Bike Availability" });
      } else {
        alert("login failed, try again");
      }
    }

    asyncDispatch();
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Please check your email."
    );

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
            onChangeText={(text) => inputNameChanged(text)}
            mode="outlined"
            label="Knight's Email"
            outlineColor="#b1b1b1"
            activeOutlineColor="#000000"
          />

          <TouchableOpacity onPress={createTwoButtonAlert} style={styles.signInButton}>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                textAlign: "center",
              }}
            >
              Reset Password
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
                Return to{" "}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    top: 22,
    right: 6,
    backgroundColor: "#F4FEFF",
    zIndex: 300,
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
    width: 130,
    backgroundColor: "#F4FEFF",
    marginTop: 28,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 40,
  },
});
