import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import logo from "../../Images/bikengold.png";

import { Container } from "react-bootstrap";

export default () => {
  function ForgetPasswordAlert() {
    alert("Forget Password clicked");
  }

  function createAccountAlert() {
    alert("Create an account clicked");
  }

  function signinAlert() {
    alert("Sign in clicked");
  }

  return (
    <>
      <div id="center">
        <div id="container">
          <div id="left-side">
            <div className="title">Sign in to BikeN'Gold</div>
            <div className="input-field">
              <FloatingLabel
                controlId="floatingInput"
                label="Knights Email"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <div id="forget-password">
                <span onClick={ForgetPasswordAlert}>Forget your password?</span>
              </div>
            </div>
            <button className="signin" onClick={signinAlert}>
              Sign in
            </button>
          </div>
          <div id="right-side">
            <img className="logoBig" src={logo} alt="BikeN'Gold Logo" />
            <div className="linkField">
              <span>New to BikeN'Gold?</span>{" "}
              <span className="link" onClick={createAccountAlert}>
                Create an account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
