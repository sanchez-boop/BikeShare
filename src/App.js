import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import Login from "./View/auth/login";
import Register from "./View/auth/register";
import ForgotPassword from "./View/auth/forgotPassword";
import HomeScreen from "./View/home/homeScreen";
import CustomerScreen from "./View/home/customerScreen";
import RentOutTab from "./View/home/tabs/rentOutTab";
import { getBikes } from "./Controller/getBikes";
import { getRepairs } from "./Controller/getRepairs";
import { getCustomers } from "./Controller/getCustomers";
import { addRepair } from "./Model/repairsSlice";
import {
  addBikeToAvailable,
  addBikeToDue,
  addBikeToRented,
} from "./Model/bikesSlice";
import {
  addCustomerToUnblacklisted,
  addCustomerToBlacklisted,
} from "./Model/customersSlice";
import forgotPassword from "./View/auth/forgotPassword";

function App() {
  const { acc } = useSelector((state) => state);
  const dispatch = useDispatch();

  /*SINCE NONE OF THESE APIS REQUIRE AN ACCOUNT,
    YOU CAN IMPLEMENT IN APP.JS TO SPEED UP APP*/

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

      /*now request users to complete all tables.
        limit to 100 customers*/
      const customers = await getCustomers();
      let count = 0;

      customers.map((customer) => {
        if (count < 101) {
          if (customer.blacklist == false) {
            dispatch(addCustomerToUnblacklisted(customer));
          } else {
            dispatch(addCustomerToBlacklisted(customer));
          }
        } else {
          return;
        }
      });
    }

    asyncDispatch();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <>
          {acc.loggedIn == true ? (
            acc.role == "admin" || acc.role == "worker" ? (
              <Route path="/homeScreen">
                <HomeScreen />
              </Route>
            ) : (
              <Route path="/customerScreen">
                <CustomerScreen />
              </Route>
            )
          ) : (
            <>
              <Route path="/homeScreen">
                <HomeScreen />
              </Route>
            </>
          )}
        </>
      </Switch>
    </Router>
  );
}

export default App;
