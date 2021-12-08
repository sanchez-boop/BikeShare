import React from "react";
import "./customerScreen.css";
import { useDispatch } from "react-redux";
import iPhone from "../../Images/iPhone.png";
import android from "../../Images/android.png";
import { VscSignOut } from "react-icons/vsc";
import { signIn, signOut } from "../../Model/accSlice";
import { useHistory } from "react-router";
import logo from "../../Images/bikengold.png";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();

  function logOut() {
    dispatch(signOut());
    history.goBack();
  }

  return (
    <>
      <div id="customer-background">
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
              account to a worker.
            </li>
          </div>
          <div className="phone-container">
            <img className="iPhone" src={iPhone} alt="iPhone image" />
            <img className="android" src={android} alt="Android image" />
          </div>
        </div>
      </div>
    </>
  );
};
