import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { editWaiver } from "../model/accSlice";
import WaiverText from "./WaiverText";
import colors from "../config/colors";
import { patchWaiver } from "../controller/patchWaiver";

export default function Waiver(props) {
  const [signInput, changeSignInput] = React.useState(null);
  const dispatch = useDispatch();

  const { acc } = useSelector((state) => state);

  async function waiverSubmit() {
    const credentials = {
      _id: acc.id,
      waiver: true,
    };

    console.log("waiver credentials is " + JSON.stringify(credentials));
    dispatch(editWaiver(credentials));

    console.log(
      "await patchWaiver: " + JSON.stringify(await patchWaiver(credentials))
    );
    const response = await patchWaiver(credentials);

    if (response != null) {
      //here is where you would sync front end and back end
      dispatch(
        editWaiver({
          waiver: true,
        })
      );
    } else {
      alert("Server might be out of sync with recent changes");
    }
  }

  console.log("waiver button: " + acc.waiver);

  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}>
        <Text style={styles.headerText}>Waiver</Text>
      </View>
      <StatusBar style="auto" />
      <View style={styles.waiverTop}>
        <Text style={styles.waiverNotifText}>
          SIGN THIS WAIVER TO BE ELIGIBLE FOR
        </Text>
        <Text style={styles.waiverBulletText}>
          {" "}
          <Text>{"\u2022"}</Text> RENT OUTS
        </Text>
        <Text style={styles.waiverBulletText}>
          {" "}
          <Text>{"\u2022"}</Text> REPAIRS
        </Text>
      </View>
      <ScrollView style={styles.waiverContent}>
        <View style={{ padding: 20 }}>
          <Text style={styles.waiverFormTitle}>BikeShare Liability Form</Text>
          <Text style={styles.waiverText}>
            I understand that there are risks and dangers inherent in
            participating and/or receiving instruction in the UCF Student Union
            Bike Repair, hereinafter "Activity". I also understand that in order
            to be allowed to participate and/or receive instruction in Activity
            I must give up my rights to hold The University of Central Florida
            liable for any injury or damage which I may suffer while
            participating and/or receiving instruction in Activity.
            {"\n"}
            {"\n"}Knowing this, and in consideration of being permitted to
            participate and/or receive instruction in Activity, I hereby
            voluntarily release the Sponsor, The University of Central Florida,
            The UCF Board of Trustees, The State of Florida, and The Florida
            Board of Governors from any and all liability resulting from or
            arising out of my participation and/or receipt of instruction in
            Activity.{"\n"}
            {"\n"}I understand and agree that I am releasing not only the
            entities set forth in the paragraph above, but also the officers,
            agents, and employees of those entities, hereinafter known as
            Representatives.{"\n"}
            {"\n"}I understand and agree that by signing this Waiver/Release, I
            am assuming full responsibility for any and all risk of death or
            personal injury or property damage suffered by me while
            participating and/or receiving instruction in Activity.{"\n"}
            {"\n"}I, individually, and on behalf of my heirs, successors,
            assigns and personal representatives, hereby release, acquit and
            forever discharge the released entities listed above and their
            Representatives from any and all liability and claims whatsoever,
            including negligence on behalf of a Representative, for any and all
            damages, losses or injuries I sustain to my person or property, or
            both; including but not limited to any claims, demands, actions,
            causes of action, damages, costs, expenses and/or attorney’s fees
            which arise out of, occur during or occur in connection with my
            participation and/or instruction in the Activity.{"\n"}
            {"\n"}I, individually, and on behalf of my heirs, successors,
            assigns and personal representatives, hereby agree to indemnify,
            defend and hold harmless the University and its Representatives (in
            their official and individual capacities) from any and all
            liability, loss or damage they or any of them incur or sustain as a
            result of any claims, demands, actions, causes of action, judgments,
            costs or expenses, including attorney’s fees, which result from,
            occur during, or arise out of my participation and/or instruction in
            the Activity.{"\n"}
            {"\n"}I understand that this Waiver and Release Agreement is to be
            construed under the laws of the State of Florida that it is intended
            to be as broad and inclusive as permitted by the laws of the State
            of Florida and that if any portion hereof is held invalid, the
            balance hereof shall, notwithstanding, continue in full legal force
            and effect.{"\n"}
            {"\n"}I acknowledge that I have carefully read this waiver/release
            agreement, that I am 18 years of age or older, I understand its
            contents and purposes, and voluntarily agree to all the terms set
            forth for participation and/or instruction in Activity.{"\n"}
            {"\n"}This applies to all services below as well as all other
            rendered services:{"\n"}
            {"\n"}• Brake adjustment
            {"\n"}• Pump up tires
            {"\n"}• Gear (derailleur) adjustment
            {"\n"}• Change flat tube
            {"\n"}• Tighten loose part(s)
            {"\n"}• Part(s) replacement
            {"\n"}• Bottom bracket adjustment
            {"\n"}• Wheel truing
            {"\n"}• Hub adjustment
            {"\n"}• Chain maintenance
            {"\n"}• Bike advice{"\n"}
            {"\n"}By agreeing with the terms and conditions, you agree to the
            above statements.{"\n"}
            {"\n"}
            {"\n"}
            <Text style={styles.waiverTitle}>
              SG Bike Share – Rental Agreement
              {"\n"}
              {"\n"}
              {"\n"}
              GENERAL INFORMED CONSENT AND RELEASE: BIKE SHARE AGREEMENT:
            </Text>
            {"\n"}
            {"\n"}
            {"\n"}I, the undersigned, recognize that participation in the
            referenced activity is strictly voluntary and that such
            participation does not in any manner establish an employer-employee
            or an agency relationship with the Sponsor or the University of
            Central Florida.{"\n"}
            {"\n"}I, the undersigned, in consideration of the request and
            permission to participate in the referenced activity hereby assume
            full responsibility for all risk of injury or loss which may result
            from my participation in the activity and hereby agree to hold
            harmless, release and forever discharge the Sponsor and the
            University of Central Florida, their officers, agents, and employees
            from any and all claims and demands whatsoever which the undersigned
            or any representative of the undersigned, may have by reason of any
            accident, illness, injury to or death of any person or persons, or
            damage to or loss or destruction of any property arising or
            resulting directly or indirectly from participation in the
            aforementioned and occurring during said participation or any time
            subsequent thereto, save and except that the above provisions shall
            not be applicable to injury to or death of person, or damage to or
            loss of{"\n"}
            {"\n"}property arising out of the negligent or intentional acts of
            the Sponsor or the University of Central Florida. The terms of this
            release will serve as a release and assumption of risk for my heirs,
            executors and administrators for all my family members.
            {"\n"}
            {"\n"}I agree and acknowledge that some activities may be of a
            hazardous nature and /or include physical and/or strenuous exercise
            or activity and, understanding this, I state that to the best of my
            knowledge I have no medical, physical or mental health conditions
            that would hinder or prevent my active participation in the
            referenced activity.{"\n"}
            {"\n"}PLEASE NOTE: It is strongly recommended that each participant
            maintain some type of accident medical insurance for his/her own
            protection.{"\n"}
            {"\n"}I further agree to cover the cost of any lost equipment (while
            in my care) at the following rates:{"\n"}
            {"\n"}• Loss of lock and/or key $50.00 (key loss requires lock to be
            replaced).{"\n"}
            {"\n"}• Loss of Sign $20.00{"\n"}
            {"\n"}• Loss of bicycle $350.00{"\n"}
            {"\n"}UCF BIKE SHARE TERMS AND CONDITIONS{"\n"}
            {"\n"}1. CONDITION: Bicycle and lock must be returned in the same
            conditions as when issued to user.{"\n"}
            {"\n"}2. AGE RESTRICTION: Must be a minimum of 18 years old to
            participate in this program. By signing this waiver form, user
            acknowledges he/she is at least 18 years old.{"\n"}
            {"\n"}3. NO WARRANTY: The University of Central Florida makes no
            warranties express or implied including the warranties of
            merchantability and fitness for a particular purpose.{"\n"}
            {"\n"}4. BICYCLE RESTRICTED USE REQUIREMENTS:{"\n"}
            {"\n"}• Bike for user only: User agrees that only he/she will be
            riding the bicycle during the term of this bicycle agreement.
            {"\n"}
            {"\n"}• Helmet use: It is highly recommended that a bicycle helmet
            (that meets the Consumer Product Safety Commission for protective
            headgear) is worn while riding this loaner bicycle.{"\n"}
            {"\n"}5. FINES OR VIOLATIONS: User acknowledges that all traffic and
            parking citations received in the use of this bicycle are the sole
            responsibility of the user.{"\n"}
            {"\n"}6. RETURN: Bicycle and lock must be returned by the end of the
            loan period. User will be charged a $10.00/day late fee. After 10
            business days user will be charged the full cost of the bicycle
            ($350), sign ($20) and rented equipment ($50 for lock and/or key).
            Failure to return bicycle, helmet and lock will subject user to
            legal liability of $420.00, as well as having student account placed
            on hold.
            {"\n"}
            {"\n"}
            {"\n"}By agreeing with these terms and conditions, you agree to take
            responsibility for the bicycle while it's checked out and agree to
            report any problems, mechanical or otherwise upon returning the
            bicycle. You confirm that you 18 years of age (or older) and agree
            to all the terms and conditions of this agreement AND that you
            consent that (if a student) UCF may charge my student account and
            (if an employee) UCF may collect through payroll deduction, all
            associated fees (as listed above) for non-compliance with this
            agreement.
          </Text>
          <TouchableOpacity
            onPress={() => waiverSubmit()}
            style={styles.signWaiver}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                textAlign: "center",
              }}
            >
              I, {acc.name}, hereby acknowledge the contents of this waiver
            </Text>
          </TouchableOpacity>
          {acc.waiver == true && (
            <View style={styles.waiverSubmit}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Waiver submitted
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signWaiver: {
    backgroundColor: "#000000",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
  },
  waiverSubmit: {
    backgroundColor: "#22C16B",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
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
  waiverTop: {
    backgroundColor: "#f9f9f9",
    height: "18.5%",
    width: "93.8%",
    marginTop: 22,
    padding: 10,

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  waiverNotifText: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 10,
  },
  waiverBulletText: {
    fontSize: 18,
    margin: 5,
  },
  waiverContent: {
    backgroundColor: "#f9f9f9",
    height: "72%",
    width: "93.8%",
    marginTop: 22,
    marginBottom: 14,

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  waiverFormTitle: {
    fontSize: 20,
    alignSelf: "center",
    padding: 10,
    marginTop: -10,
    marginBottom: 10,
  },
  waiverText: {
    fontSize: 16,
  },
  waiverSign: {
    alignSelf: "center",
    marginTop: 30,
    paddingLeft: 10,
    backgroundColor: "#dfdfdf",
    width: "90%",
    height: 55,

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
  waiverTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
