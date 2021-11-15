import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList,SafeAreaView} from "react-native";

export default function BikeAvailability(props) {
  const [signInput, changeSignInput] = React.useState(null);
  var numBikesAvailable = 6;
  const DATA = [
    {
      id: 2,
      style: "Single-Speed",
      serial: 80720617,
      available: true,
    },
    {
      id: 3,
      style: "Single-Speed",
      serial: 20620211,
      available: true,
    },
    {
      id: 6,
      style: "Single-Speed",
      serial: 80720617,
      available: true,
    },
    {
      id: 24,
      style: "Single-Speed",
      serial: 80720617,
      available: true,
    },
    {
      id: 32,
      style: "Single-Speed",
      serial: 80720617,
      available: true,
    },
    {
      id: 33,
      style: "Single-Speed",
      serial: 80720617,
      available: true,
    },
    {
      id: 1,
      style: "Single-Speed",
      serial: 80720617,
      available: false,
    },
    {
      id: 4,
      style: "Single-Speed",
      serial: 80720617,
      available: false,
    },
    {
      id: 7,
      style: "Single-Speed",
      serial: 80720617,
      available: false,
    },
    {
      id: 10,
      style: "Single-Speed",
      serial: 80720617,
      available: false,
    },
    {
      id: 21,
      style: "Single-Speed",
      serial: 80720617,
      available: false,
    },
    {
      id: 23,
      style: "Single-Speed",
      serial: 80720617,
      available: false,
    },
  ];

  const renderItem = ({ item }) => {
    const backgroundColor = item.available ? "#fffff" : "#f4f4f4";
    console.log(backgroundColor);
    const color = item.available  ? '#000000' : '#9c9c9c';

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
        id= {item.id}
        style = {item.style}
        serial = {item.serial}
      />
    );
  };

  const Item = ({id, style, serial, backgroundColor, textColor}) => (
    <View style={[styles.item, backgroundColor]}>
      <Text style={{textAlign: 'center',}}>
      <Text style={textColor}>{id}</Text>
      <Text style={textColor}>{style}</Text>
      <Text style={textColor}>{serial}</Text>
      </Text>
    </View>
  );

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#DFDFDF',
        }}
      />
    );
  };

  const ListHeader = () => {
    //View to set in Header
    return (
      <View>
        <View style={styles.listHeaderStyle}>
          <Text style={styles.headerTextStyle}>
            BIKE NUMBER        STYLE OF BIKE        SERIAL NUMBER
          </Text>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#DFDFDF',
        }}
      />

      </View>
      
    );
  };
  

  return (
    <View style={styles.mainView}>
      <StatusBar style="auto" />
      <View style={styles.numBikesView}>
        <Text style={styles.numberBikesAvailable}><Text>{numBikesAvailable.toString()}</Text> bikes currently available</Text>
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
    padding: 16,
  },
  listHeaderStyle: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    height: 55,
    backgroundColor: '#f2f2f2',
  },
  headerTextStyle: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 12,
    padding: 18,
  },
  listContent: {
    backgroundColor: '#f9f9f9',
    height: '88%',
    width: '93.8%',
    marginTop: 12,
    marginBottom: 14,
    overflow: 'hidden',

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },  
});
