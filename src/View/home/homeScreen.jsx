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
      <div className="logoBackground">
        <img className="logo" src={logo} alt="image error" />
        BikeN'Gold
      </div>
      <TabNav />
    </>
  );
};
