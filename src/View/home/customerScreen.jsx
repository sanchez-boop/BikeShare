import React from "react";
import "./customerScreen.css";
import iPhone from "../../Images/iPhone.png";
import { VscSignOut } from "react-icons/vsc";
import logo from "../../Images/bikengold.png";

export default () => {
  return (
    <>
      <div id="customer-background">
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
        <div className="customer-content">
          <h1>DOWNLOAD OUR APP</h1>
          <div className="customer-text-background">
            <b>
              <h6>
                You have signed in as a customer on the BikeShare website.
              </h6>
            </b>
            <li className="list">
              If you are a customer please download the BikeShare App to sign
              our waiver, check bike availability, and more.
            </li>
            <li className="list">
              If you are a worker, please notify an admin to promote your
              account as a worker.
            </li>
          </div>
          <img className="iPhone" src={iPhone} alt="iPhone image" />
        </div>
      </div>
    </>
  );
};
