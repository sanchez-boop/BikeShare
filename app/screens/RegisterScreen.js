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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import logo from "../assets/Shop-Logo.png";
import { Ionicons } from "@expo/vector-icons";
import eye from "../assets/icons8-eye-30.png";
import { postUser } from "../controller/postUser";
import colors from "../config/colors";

export default function RegisterScreen({ navigation }) {
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);
  const [isSecureEntry2, changeIsSecureEntry2] = React.useState(true);

  const [formInput, setFormInput] = useState({
    /*set initial credentials to ""*/
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    phone: "",
  });

  function inputFirstNameChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      firstName: text,
    });
  }

  function inputLastNameChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      lastName: text,
    });
  }

  function inputEmailChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      email: text,
    });
  }

  function inputPasswordChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      password: text,
    });
  }

  function verifyPasswordChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      verifyPassword: text,
    });
  }

  function inputPhoneChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      phone: text,
    });
  }

  async function registerUser() {
    if (formInput.firstName == "" || formInput.lastName == "" || formInput.email == "" || 
    formInput.password == "" || formInput.verifyPassword == "" || formInput.phone == "") {
      alert("Please fill all text fields!");
      return;
    }
    if (formInput.password == formInput.verifyPassword) {
      const credentials = {
        /*set initial credentials to ""*/
        name: formInput.firstName + " " + formInput.lastName,
        email: formInput.email,
        password: formInput.password,
        phone: formInput.phone,
        role: "customer",
        waiver: false,
        blacklist: false,
      };

      const account = await postUser(credentials);

      if (account.blacklist == false) {
        /*On successful login, go back to login*/
        navigation.navigate("Main", { screen: "Bike Availability" });
      } else {
        alert("login failed, try again");
      }
    } else {
      alert("Passwords do not match, try again");
    }
  }

  function eyeState() {
    if (isSecureEntry == true) {
      return <Ionicons name="eye" size={24} color="black" />;
    } else if (isSecureEntry == false) {
      return <Ionicons name="eye-off" size={24} color="black" />;
    }
  }

  function eyeState2() {
    if (isSecureEntry2 == true) {
      return <Ionicons name="eye" size={24} color="black" />;
    } else if (isSecureEntry2 == false) {
      return <Ionicons name="eye-off" size={24} color="black" />;
    }
  }

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

          <View style={styles.nameContainer}>
            <TextInput
              style={styles.nameTextInput}
              onChangeText={(text) => inputFirstNameChanged(text)}
              mode="outlined"
              label="First Name"
              outlineColor="#b1b1b1"
              activeOutlineColor="#000000"
            />
            <TextInput
              style={styles.nameTextInput}
              onChangeText={(text) => inputLastNameChanged(text)}
              mode="outlined"
              label="Last Name"
              outlineColor="#b1b1b1"
              activeOutlineColor="#000000"
            />
          </View>

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => inputPhoneChanged(text)}
            mode="outlined"
            label="Phone Number"
            outlineColor="#b1b1b1"
            activeOutlineColor="#000000"
          />

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => inputEmailChanged(text)}
            mode="outlined"
            label="Knight's Email"
            outlineColor="#b1b1b1"
            activeOutlineColor="#000000"
          />
          <View style={styles.textAndEyeContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={isSecureEntry}
              mode="outlined"
              onChangeText={(text) => inputPasswordChanged(text)}
              label="Password"
              outlineColor="#b1b1b1"
              activeOutlineColor="#000000"
              numberOfLines={1}
              textContentType={"oneTimeCode"}
            />
            <TouchableOpacity
              onPress={() => {
                changeIsSecureEntry((prev) => !prev);
              }}
              style={styles.eyeContainer}
            >
              {eyeState()}
            </TouchableOpacity>
          </View>
          <View style={styles.textAndEyeContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={isSecureEntry2}
              mode="outlined"
              onChangeText={(text) => verifyPasswordChanged(text)}
              label="Re-enter Password"
              outlineColor="#b1b1b1"
              activeOutlineColor="#000000"
              numberOfLines={1}
            />
            <TouchableOpacity
              onPress={() => {
                changeIsSecureEntry2((prev) => !prev);
              }}
              style={styles.eyeContainer}
            >
              {eyeState2()}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={registerUser} style={styles.signUpButton}>
            <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>
              Sign up
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
    marginBottom: 10,
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
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
    marginTop: 15,
  },
  nameTextInput: {
    width: 135,
    height: 55,
    backgroundColor: "#F4FEFF",
    lineHeight: 40,
    marginBottom: 15,
  },
  textInput: {
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
  eyeContainer: {
    position: "absolute",
    height: "40%",
    width: "10%",
    top: 22,
    right: 6,
    zIndex: 300,
    backgroundColor: "#F4FEFF",
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
    marginTop: 15,
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
