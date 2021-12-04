import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TabNav from "./tabNav";
import { getBikes } from "../../Controller/getBikes";
import { getRepairs } from "../../Controller/getRepairs";
import { getCustomers } from "../../Controller/getCustomers";
import "./homeScreen.css";
import logo from "../../Images/bikengold.png";
import { VscSignOut } from "react-icons/vsc";
import { addRepair } from "../../Model/repairsSlice";
import {
  addBikeToAvailable,
  addBikeToDue,
  addBikeToRented,
} from "../../Model/bikesSlice";
import {
  addCustomerToUnblacklisted,
  addCustomerToBlacklisted,
} from "../../Model/customersSlice";

export default () => {
  const dispatch = useDispatch();

  //useEffect will render once when given arg of []
  useEffect(() => {
    /*since the home tab is due bikes and repairs,
      our first API calls go towards due bikes and
      repairs */
    async function asyncDispatch() {
      /*the API returns an arr of bike objects. 
        await both APIs and map through arr*/
      const bikes = await getBikes();
      const repairs = await getRepairs();

      bikes.map((bike) => {
        if (bike.dateRented.length > 0) {
          const today = new Date();
          const dueDate = new Date(bike.dateRented);
          dueDate.setDate(dueDate.getDate() + 7);

          /*if past due date, add to due bikes. else,
            add to rented*/
          if (today.setHours(0, 0, 0, 0) - dueDate.setHours(0, 0, 0, 0) >= 0) {
            dispatch(addBikeToDue(bike));
          } else {
            dispatch(addBikeToRented(bike));
          }
        } else {
          dispatch(addBikeToAvailable(bike));
        }
      });

      repairs.map((repair) => {
        dispatch(addRepair(repair));
      });

      /*now request users to complete all tables*/
      const customers = await getCustomers();
      customers.map((customer) => {
        if (customer.blacklist == false) {
          dispatch(addCustomerToUnblacklisted(customer));
        } else {
          dispatch(addCustomerToBlacklisted(customer));
        }
      });
    }

    asyncDispatch();
  }, []);

  function logOut() {}

  return (
    <>
      <div id="tab-background">
        <div className="logoBackground">
          <div id="logo-title-container">
            <img className="logo" src={logo} alt="image error" />
            <text id="title">BikeN'Gold</text>
          </div>
          <button className="signout" onClick={() => alert("Sign out clicked")}>
            Sign out
            <VscSignOut size={23} />
          </button>
        </div>
        <TabNav />
      </div>
    </>
  );
};
