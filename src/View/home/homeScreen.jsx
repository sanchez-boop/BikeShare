import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabNav from "./tabNav";
import "./homeScreen.css";
import logo from "../../Images/bikengold.png";
import { VscSignOut } from "react-icons/vsc";
import { signIn, signOut } from "../../Model/accSlice";
import { useHistory } from "react-router";
import { getCustomers } from "../../Controller/getCustomers";
import { addCustomerToUnblacklisted, addCustomerToBlacklisted } from "../../Model/customersSlice";

export default () => {
  const {acc} = useSelector(state=>state);
  const history = useHistory();
  const dispatch = useDispatch();

  function logOut() {
    dispatch(signOut());
    history.goBack();
  }

  //useEffect will render once when given arg of []
  useEffect(() => {
    async function asyncDispatch() {
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
    <>
      <div id="tab-background">
        <div className="logoBackground">
          <div id="logo-title-container">
            <img className="logo" src={logo} alt="image error" />
            <text id="title">BikeN'Gold</text>
          </div>
          <button className="signout" onClick={logOut}>
            Sign out
            <VscSignOut size={23} />
          </button>
        </div>
        <TabNav />
      </div>
    </>
  );
};
