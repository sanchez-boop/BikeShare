import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import colors from "../config/colors";

export default function BikeAvailability(props) {
  const [signInput, changeSignInput] = React.useState(null);
  var numBikesAvailable = 6;
  const DATA = [
    {
      id: 2,
      style: "Single-Speed",
      serial: "wvb80720617",
      available: true,
    },
    {
      id: 3,
      style: "Single-Speed",
      serial: "dkgr20211",
      available: true,
    },
    {
      id: 6,
      style: "Single-Speed",
      serial: "jkt20617",
      available: true,
    },
    {
      id: 24,
      style: "Single-Speed",
      serial: "gkjs20617",
      available: true,
    },
    {
      id: 32,
      style: "Single-Speed",
      serial: "fsd20617",
      available: true,
    },
    {
      id: 33,
      style: "Single-Speed",
      serial: "hge0720617",
      available: true,
    },
    {
      id: 1,
      style: "Single-Speed",
      serial: "gjd20617",
      available: false,
    },
    {
      id: 4,
      style: "Single-Speed",
      serial: "hge0720617",
      available: false,
    },
    {
      id: 7,
      style: "Single-Speed",
      serial: "hge0720617",
      available: false,
    },
    {
      id: 10,
      style: "Single-Speed",
      serial: "hge0720617",
      available: false,
    },
    {
      id: 21,
      style: "Single-Speed",
      serial: "hge0720617",
      available: false,
    },
    {
      id: 23,
      style: "Single-Speed",
      serial: "hge0720617",
      available: false,
    },
  ];

  const renderItem = ({ item }) => {
    const backgroundColor = item.available ? "#fffff" : "#f4f4f4";
    const color = item.available ? "#000000" : "#9c9c9c";

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        id={item.id}
        style={item.style}
        serial={item.serial}
      />
    );
  };

  const Item = ({ id, style, serial, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <View style={styles.itemContainer}>
        <Text style={[textColor, styles.id, styles.itemText]}>{id}</Text>
        <Text style={[textColor, styles.styleOfBike, styles.itemText]}>
          {style}
        </Text>
        <Text style={[textColor, styles.serialNumber, styles.itemText]}>
          {serial}
        </Text>
      </View>
    </View>
  );

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#DFDFDF",
        }}
      />
    );
  };

  const ListHeader = () => {
    //View to set in Header
    return (
      <View>
        <View style={styles.listHeaderStyle}>
          <View style={styles.headerTextStyle}>
            <Text style={styles.itemHeaderText}>BIKE NUMBER</Text>
            <Text style={[styles.itemHeaderText, styles.headerStyleOfBike]}>
              STYLE OF BIKE
            </Text>
            <Text style={styles.itemHeaderText}>SERIAL NUMBER</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#DFDFDF",
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}>
        <Text style={styles.headerText}>Bike Availability</Text>
      </View>
      <StatusBar style="auto" />
      <View style={styles.numBikesView}>
        <Text style={styles.numberBikesAvailable}>
          <Text>{numBikesAvailable.toString()}</Text> bikes currently available
        </Text>
      </View>
      <SafeAreaView style={styles.listContent}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorView}
          ListHeaderComponent={ListHeader}
        />
      </SafeAreaView>
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
  headerText: {
    fontFamily: "HindVadodara_600SemiBold",
    fontSize: 20,
    marginBottom: 4,
  },
  numBikesView: {
    height: "7.5%",
    width: "90%",
  },
  numberBikesAvailable: {
    fontSize: 18,
    padding: 10,
    marginTop: 8,
  },
  item: {
    padding: 18,
    paddingLeft: 49,
    paddingRight: 23,
  },
  listHeaderStyle: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "100%",
    height: 55,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  headerTextStyle: {
    color: "#000000",
    paddingLeft: 14,
    paddingRight: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerStyleOfBike: {
    position: "absolute",
    left: "36.2%",
  },
  itemHeaderText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  listContent: {
    backgroundColor: "#f9f9f9",
    height: "78%",
    width: "93.8%",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 12.5,
  },
  id: { fontFamily: "Inter_500Medium" },
  styleOfBike: {
    fontFamily: "Inter_500Medium",
    position: "absolute",
    left: "26.7%",
  },
  serialNumber: { fontFamily: "Inter_500Medium" },
});
