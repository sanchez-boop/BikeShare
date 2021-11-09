import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

export default function ShopInfo(props) {
  return (
    <View style={styles.mainView}>
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
});
