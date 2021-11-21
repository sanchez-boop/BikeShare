import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabNav from "./tabNav";
import "./homeScreen.css";
import logo from "../../Images/bikengold.png";

export default () => {
  const dispatch = useDispatch();

  /*render the bugs once or refresh*/
  useEffect(() => {
    //update the user and bike info
  }, []);

  return (
    <>
      <div id="tab-background">
        <div className="logoBackground">
          <div id="logo-title-container">
            <img className="logo" src={logo} alt="image error" />
            <text id="title">BikeN'Gold</text>
          </div>
        </div>
        <TabNav />
      </div>
    </>
  );
};
