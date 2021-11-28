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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../config/colors";

export default function ProfileNotificationChange({ navigation }) {
  const [repairStatus, setRepairStatus] = React.useState(false);
  const [bikeDue, setBikeDue] = React.useState(false);
  const [adminAnnouncements, setAdminAnnouncements] = React.useState(false);
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
          <Text style={styles.headerText}>Push Notifications</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.notificationBox}>
            <View style={styles.notificationButton}></View>
            <View style={styles.textPart}>
              <Text style={styles.titleText}>Admin Announcements</Text>
              <Text style={styles.descriptionText}>
                Recieve notifications when the admin sends out an announcment
              </Text>
            </View>
          </View>

          <View style={styles.notificationBox}>
            <View style={styles.notificationButton}></View>
            <View style={styles.textPart}>
              <Text style={styles.titleText}>Bike Repair Status</Text>
              <Text style={styles.descriptionText}>
                Recieve notifications when my bike is ready for pickup
              </Text>
            </View>
          </View>

          <View style={styles.notificationBox}>
            <View style={styles.notificationButton}></View>
            <View style={styles.textPart}>
              <Text style={styles.titleText}>Bike Due</Text>
              <Text style={styles.descriptionText}>
                Recieve notifications when my rental bike is due tomorrow
              </Text>
            </View>
          </View>
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
  },
  notificationBox: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#525252",
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  titleText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    color: "#DDB100",
    marginBottom: 10,
  },
});
