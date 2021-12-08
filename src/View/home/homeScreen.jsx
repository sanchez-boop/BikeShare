import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TabNav from "./tabNav";
import "./homeScreen.css";
import logo from "../../Images/bikengold.png";
import { VscSignOut } from "react-icons/vsc";
import { signIn, signOut } from "../../Model/accSlice";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();

  function logOut() {
    dispatch(signOut());
    history.goBack();
  }

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
