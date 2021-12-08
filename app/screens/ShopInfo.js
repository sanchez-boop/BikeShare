import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncements } from "../controller/getAnnouncements";
import colors from "../config/colors";
/*
const AnnouncementsHolder = [
  {
    id: 1,
    dateDay: 10,
    dateMonth: 29,
    dateYear: 21,
    message: 'Welcome all incoming bike enthusiasts! Due to UCF Homecoming week, we will be closing at 4:00pm instead of the usual time.',
  },
  {
    id: 2,
    dateDay: 10,
    dateMonth: 11,
    dateYear: 21,
    message: 'Due to a sudden fire, we will not be able to rent out bikes for the week.',
  },
  {
    id: 3,
    dateDay: 10,
    dateMonth: 3,
    dateYear: 21,
    message: 'Before coming to the shop, please be sure to sign your waivers for a smoother rental process!',
  },
  {
    id: 4,
    dateDay: 9,
    dateMonth: 1,
    dateYear: 21,
    message: 'Happy September everyone! Remember you can bring your bikes into the shop for a repair.',
  },
  {
    id: 5,
    dateDay: 8,
    dateMonth: 21,
    dateYear: 21,
    message: 'Bike safe everyone! Always wear your helmet.',
  },
  {
    id: 6,
    dateDay: 8,
    dateMonth: 12,
    dateYear: 21,
    message: 'This is a test announcement. ',
  },
];
*/
const bikeHours = [
  {
    id: 1,
    inText: "Monday - Friday: 8am - 5pm",
  },
  {
    id: 2,
    inText: "Saturday - Sunday: Closed",
  },
];

const socMedia = [
  {
    id: 1,
    inText: "FaceBook: https://www.facebook.com/bikengold/",
    press: "https://www.facebook.com/bikengold/",
  },
  {
    id: 2,
    inText: "Instagram: https://www.instagram.com/ucfbikengold/?hl=en",
    press: "https://www.instagram.com/ucfbikengold/?hl=en",
  },
];

export default function ShopInfo(props) {
  const dispatch = useDispatch();
  const [announcementArray, setAnnouncementArray] = useState("");

  // useEffect will render once when given arg of []x
  useEffect(() => {
    async function asyncDispatch() {
      /* the API returns an arr of announcement objects. 
        await both APIs and map through arr*/
      let response = await getAnnouncements();
      response.reverse();
      setAnnouncementArray(response);
      //response.map((bike) => {
      //  dispatch(addBikeToAvailable(bike));
      //});
    }

    asyncDispatch();
  }, []);

  const renderAnnouncement = ({ item }) => {
    return (
      <Announcement
        item={item}
        id={item.date}
        //dateDay={item.dateDay}
        //dateMonth={item.dateMonth}
        //dateYear={item.dateYear}
        message={item.note}
      />
    );
  };

  const Announcement = ({ id, dateDay, dateMonth, dateYear, message }) => (
    <View style={[styles.itemAnnouncement]}>
      <View style={styles.itemAnnouncementContainer}>
        <View style={styles.announcementTextDate}>
          <Text style={[styles.itemTextDate]}>{id}</Text>
        </View>
        <View style={styles.announcementText}>
          <Text style={[styles.itemTextAnnouncement]}>{message}</Text>
        </View>
      </View>
    </View>
  );

  const renderHour = ({ item }) => {
    return <Hour item={item} id={item.id} inText={item.inText} />;
  };

  const Hour = ({ id, inText }) => (
    <View style={[styles.item]}>
      <View style={styles.itemContainer}>
        <Text style={[styles.itemText]}>{inText}</Text>
      </View>
    </View>
  );

  const renderMedia = ({ item }) => {
    const color = "#0645AD";
    return (
      <Media
        item={item}
        id={item.id}
        textColor={{ color }}
        inText={item.inText}
        press={item.press}
      />
    );
  };

  const Media = ({ id, inText, press, textColor }) => (
    <View style={[styles.item]}>
      <View style={styles.itemContainer}>
        <Text
          style={[styles.itemText, textColor]}
          onPress={() => Linking.openURL(press)}
        >
          {inText}
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

  const AnnouncementHeader = () => {
    //View to set in Header
    return (
      <View>
        <View style={styles.listHeaderStyle}>
          <View style={styles.headerTextStyle}>
            <Text style={styles.itemHeaderText}>Admin Announcements</Text>
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
  console.log("\n\narray is " + JSON.stringify(announcementArray));
  const HoursHeader = () => {
    //View to set in Header
    return (
      <View>
        <View style={styles.listHeaderStyle}>
          <View style={styles.headerTextStyle}>
            <Text style={styles.itemHeaderText}>Bike Shop Hours</Text>
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

  const MediaHeader = () => {
    //View to set in Header
    return (
      <View>
        <View style={styles.listHeaderStyle}>
          <View style={styles.headerTextStyle}>
            <Text style={styles.itemHeaderText}>Social Media</Text>
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
  // let j = announcementArray.length - 1;
  // for (let i = 0; i > j; i++) {
  //   const tmp = announcementArray[j];
  //   announcementArray[j] = announcementArray[i];
  //   announcementArray[i] = tmp;
  //   j--;
  // }
  //setAnnouncementArray(announcementArray.reverse());
  // setAnnouncementArray({
  //   ...announcementArray,
  //   announcementArray.reverse()
  // });
  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}>
        <Text style={styles.headerText}>Bike Shop Info</Text>
      </View>
      <ScrollView style={styles.content}>
        <SafeAreaView style={styles.announcements}>
          <FlatList
            nestedScrollEnabled
            data={announcementArray}
            renderItem={renderAnnouncement}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparatorView}
            ListHeaderComponent={AnnouncementHeader}
          />
        </SafeAreaView>
        <View style={styles.shopHours}>
          <FlatList
            data={bikeHours}
            renderItem={renderHour}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparatorView}
            ListHeaderComponent={HoursHeader}
          />
        </View>
        <View style={styles.socialMedia}>
          <FlatList
            data={socMedia}
            renderItem={renderMedia}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparatorView}
            ListHeaderComponent={MediaHeader}
          />
        </View>
      </ScrollView>
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
  headerText: {
    fontFamily: "HindVadodara_600SemiBold",
    fontSize: 20,
    marginBottom: 4,
  },
  content: {},
  announcements: {
    flex: 1,
    width: "95%",
    marginTop: "6%",
    height: 400,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    marginLeft: 10,
  },
  shopHours: {
    marginTop: "6%",
    width: "95%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    marginLeft: 10,
  },
  socialMedia: {
    marginTop: "6%",
    marginBottom: "6%",
    width: "95%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    marginLeft: 10,
  },
  itemAnnouncement: {
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  item: {
    paddingVertical: 14,
  },
  listHeaderStyle: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  headerTextStyle: {
    color: "#000000",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemHeaderText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15.5,
  },
  itemAnnouncementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    //backgroundColor: "red",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    //backgroundColor: "blue",
  },
  itemTextAnnouncement: {
    fontSize: 12.5,
  },
  itemTextDate: {
    fontSize: 12.5,
    fontWeight: "bold",
  },
  announcementTextDate: { width: 80 },
  announcementText: { width: 210, marginLeft: 10 },
});
