import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { editName } from "../model/accSlice";
import { patchUserInfo } from "../controller/patchUserInfo";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import eye from "../assets/icons8-eye-30.png";
import colors from "../config/colors";

export default function ProfileNameChange({ navigation }) {
  const [passwordInput, changePasswordInput] = React.useState(null);
  const [firstNameInput, changeFirstNameInput] = React.useState(null);
  const [lastNameInput, changeLastNameInput] = React.useState(null);
  const [isSecureEntry, changeIsSecureEntry] = React.useState(true);

  const dispatch = useDispatch();
  const { acc } = useSelector((state) => state);
  const [formInput, setFormInput] = useState({
    /*set initial credentials to ""*/
    name: "",
  });

  function inputNameChanged(text) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      name: text,
    });
  }

  async function nameChangeSubmit() {
    const credentials = {
      _id: acc.id,
      name: formInput.name,
    };

    dispatch(editName(credentials));

    const response = await patchUserInfo(credentials);

    if (response != null) {
      //here is where you would sync front end and back end
      dispatch(
        editName({
          _id: response._id,
          name: response.name,
        })
      );
    } else {
      alert("Server might be out of sync with recent changes");
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
        <View style={styles.topRectangle}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileHome")}
            style={styles.backButton}
          >
            <FontAwesome5 name="chevron-left" size={22} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => inputNameChanged(text)}
            mode="outlined"
            label="First Name"
            outlineColor="#b1b1b1"
            activeOutlineColor="#000000"
          />

          <TextInput
            style={styles.textInput}
            onChangeText={changeLastNameInput}
            value={lastNameInput}
            mode="outlined"
            label="Last Name"
            outlineColor="#b1b1b1"
            activeOutlineColor="#000000"
          />
          <View style={styles.textAndEyeContainer}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={isSecureEntry}
              mode="outlined"
              onChangeText={changePasswordInput}
              value={passwordInput}
              label="Current Password"
              outlineColor="#b1b1b1"
              activeOutlineColor="#000000"
              numberOfLines={1}
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
            onPress={nameChangeSubmit}
            style={styles.signUpButton}
          >
            <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("Continue to password forget here!")}
            style={{ marginTop: 30 }}
          >
            <Text style={styles.forgotPassword}>Forget your password?</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
}

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
    height: "9.4%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backText: {
    fontSize: 17,
    color: "#000000",
    paddingLeft: 6,
  },
  backButton: {
    flexDirection: "row",
    position: "absolute",
    left: 20,
    bottom: 7,
  },
  headerText: {
    fontFamily: "HindVadodara_600SemiBold",
    fontSize: 20,
    marginBottom: 4,
  },
  content: {
    width: "90%",
    alignItems: "center",
    marginTop: "5%",
  },
  title: {
    marginTop: 20,
    fontSize: 48,
    fontWeight: "bold",
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
    top: 23,
    right: 4,
    zIndex: 300,
    backgroundColor: "#F4FEFF",
  },
  eye: {
    height: 22,
    width: 22,
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
  forgotPassword: {
    fontSize: 13.3,
    color: "#555555",
  },
});
