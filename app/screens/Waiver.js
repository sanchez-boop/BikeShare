import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView,  TextInput,} from "react-native";
import WaiverText from "./WaiverText";

export default function Waiver(props) {
  const [signInput, changeSignInput] = React.useState(null);
  return (
    <View style={styles.mainView}>
      <StatusBar style="auto" />
      <View style={styles.waiverTop}>
        <Text style={styles.waiverNotifText}>SIGN THIS WAIVER TO BE ELIGIBLE FOR</Text>
        <Text style={styles.waiverBulletText}>   {" "}<Text>{'\u2022'}</Text> RENT OUTS</Text>
        <Text style={styles.waiverBulletText}>   {" "}<Text>{'\u2022'}</Text> REPAIRS</Text>
      </View>
      <ScrollView style={styles.waiverContent}>
        <View style={{padding: 20}}>
          <Text style={styles.waiverFormTitle}>BikeShare Liability Form</Text>
          <Text style={styles.waiverText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, tellus sed auctor varius, 
        nulla orci porttitor arcu, accumsan ultricies magna nulla ac lacus. Morbi quis auctor orci. Donec non justo rhoncus, 
        venenatis sem ut, ornare mi. Ut facilisis vulputate euismod. Suspendisse potenti. Aliquam ac nunc sit amet odio placerat fermentum nec quis risus. 
        Duis ligula nisi, lobortis vitae libero feugiat, posuere tempor quam. Curabitur lorem massa, accumsan non lacus in, mattis scelerisque metus. 
        Quisque porta diam sed metus efficitur condimentum. Aenean sollicitudin eros ut augue tristique, eu mattis enim egestas.
        {"\n"}{"\n"}
    Aliquam ultrices arcu orci, id pretium enim consectetur in. Pellentesque ornare purus ut tempor rhoncus. Proin vehicula turpis sit amet augue venenatis 
    congue eu et risus. Suspendisse est justo, maximus eget eros ut, feugiat accumsan nibh. Sed commodo, augue molestie suscipit venenatis, velit purus luctus mi, 
    eget porttitor mauris augue ut Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, tellus sed auctor varius, 
        nulla orci porttitor arcu, accumsan ultricies magna nulla ac lacus. Morbi quis auctor orci. Donec non justo rhoncus, 
        venenatis sem ut, ornare mi. Ut facilisis vulputate euismod. Suspendisse potenti. Aliquam ac nunc sit amet odio placerat fermentum nec quis risus. 
        Duis ligula nisi, lobortis vitae libero feugiat, posuere tempor quam. Curabitur lorem massa, accumsan non lacus in, mattis scelerisque metus. 
        Quisque porta diam sed metus efficitur condimentum. Aenean sollicitudin eros ut augue tristique, eu mattis enim egestas.
        {"\n"}{"\n"}
    Aliquam ultrices arcu orci, id pretium enim consectetur in. Pellentesque ornare purus ut tempor rhoncus. Proin vehicula turpis sit amet augue venenatis 
    congue eu et risus. Suspendisse est justo, maximus eget eros ut, feugiat accumsan nibh. Sed commodo, augue molestie suscipit venenatis, velit purus luctus mi, 
    eget porttitor mauris augue ut</Text>
          <TextInput
            style={styles.waiverSign}
            onChangeText={changeSignInput}
            value={signInput}
            placeholder="Sign  Here"
          />
        </View>
      </ScrollView>
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
  waiverTop: {
    backgroundColor: '#f9f9f9',
    height: '18.5%',
    width: '93.8%',
    marginTop: 22,
    padding: 10,

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  }, 
  waiverNotifText: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10,
  }, 
  waiverBulletText: {
    fontSize: 18,
    margin: 5,
  },
  waiverContent: {
    backgroundColor: '#f9f9f9',
    height: '72%',
    width: '93.8%',
    marginTop: 22,
    marginBottom: 14,

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
  waiverFormTitle: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    marginTop: -10,
    marginBottom: 10,
  },  
  waiverText: {
    fontSize: 16,
  },
  waiverSign: {
    alignSelf: 'center',
    marginTop: 30,
    paddingLeft: 10,
    backgroundColor: "#dfdfdf",
    width: "90%",
    height: 55,

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },  
});
