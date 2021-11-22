import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabNav from "./tabNav";
import {getRepairs} from "../../Controller/getRepairs"
import "./homeScreen.css";
import logo from "../../Images/bikengold.png";
import { addRepair } from "../../Model/repairsSlice";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /*since the home tab is due bikes and repairs,
      our first API calls go towards due bikes and
      repairs */
    async function asyncDispatch(){
      //repairs will be an array of repair objects
      const repairs = await getRepairs();
      repairs.map(repair=>{
        dispatch(addRepair(repair))
      })
    }

    asyncDispatch()
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
