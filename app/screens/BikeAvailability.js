import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

export default function BikeAvailability(props) {
  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}>
        <Text style={styles.tabTitle}>Bike Availability</Text>
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
  tabTitle: {
    fontFamily: "HindVadodara_600SemiBold",
    fontSize: 20,
    marginBottom: 3,
  },
});
