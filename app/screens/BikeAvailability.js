import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { addBikeToAvailable } from "../model/bikesSlice";
import { getBikes } from "../controller/getBikes";
import { useSelector, useDispatch } from "react-redux";
import colors from "../config/colors";

export default function BikeAvailability(props) {
  const dispatch = useDispatch();

  // useEffect will render once when given arg of []x
  useEffect(() => {
    async function asyncDispatch() {
      /* the API returns an arr of bike objects. 
        await both APIs and map through arr*/
      const response = await getBikes();
      //console.log("getBikes: " + JSON.stringify(response[0]));
      response.map((bike) => {
        dispatch(addBikeToAvailable(bike));
      });
    }

    asyncDispatch();
  }, []);

  const { bikes } = useSelector((state) => state);

  var numBikesAvailable = Object.keys(bikes.available).length;

  const renderItem = ({ item }) => {
    const backgroundColor = "#fff";
    const color = "#000000";

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        id={item.id}
        model={item.model}
      />
    );
  };

  const Item = ({ id, model, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <View style={styles.itemContainer}>
        <View
          style={
            {
              //backgroundColor: "blue",
            }
          }
        >
          <Text style={[textColor, styles.id, styles.itemText]}>{id}</Text>
        </View>
        <Text style={[textColor, styles.styleOfBike, styles.itemText]}>
          {model}
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
          data={Object.values(bikes.available)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorView}
          ListHeaderComponent={ListHeader}
          // Performance settings
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={1} // Reduce initial render amount
          maxToRenderPerBatch={10} // Reduce number in each render batch
          updateCellsBatchingPeriod={10} // Increase time between renders
          windowSize={3} // Reduce the window size
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
    backgroundColor: "#f9f9f9",
    marginVertical: 9,
    marginLeft: 12,
    alignSelf: "flex-start",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  numberBikesAvailable: {
    fontSize: 18,
    padding: 10,
    paddingHorizontal: 12,
  },
  item: {
    paddingVertical: 18,
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

    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerStyleOfBike: {},
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
    paddingLeft: 78,
    paddingRight: 55,
    //backgroundColor: "red",
  },
  itemText: {
    fontSize: 12.5,
  },
  id: { fontFamily: "Inter_500Medium" },
  styleOfBike: {
    fontFamily: "Inter_500Medium",
  },
});
