import React, { useState } from "react";
import "./register.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import logo from "../../Images/bikengold.png";

import { Container, FormControl } from "react-bootstrap";

class ShowPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "password",
    };
    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  }

  render() {
    return (
      <FloatingLabel controlId="floatingPassword" label="Re-enter Password">
        <Form.Control type={this.state.type} placeholder="Re-enter Password" />
        <span onClick={this.showHide}>
          {this.state.type === "input" ? "Show" : "Hide"}
        </span>
      </FloatingLabel>
    );
  }
}

export default () => {
  function ForgetPasswordAlert() {
    alert("Forget Password clicked");
  }

  function signinLinkAlert() {
    alert("Sign in link clicked");
  }

  function signinAlert() {
    alert("Sign in clicked");
  }

  return (
    <>
      <div id="center">
        <div id="container-register">
          <div id="left-side">
            <div className="title">Welcome to BikeN'Gold</div>
            <div className="input-field">
              <div id="name-container" className="mb-3">
                <FloatingLabel label="First Name" className="name-textfield">
                  <Form.Control type="text" placeholder="First Name" />
                </FloatingLabel>
                <FloatingLabel label="Last Name" className="name-textfield">
                  <Form.Control type="text" placeholder="Last Name" />
                </FloatingLabel>
              </div>
              <FloatingLabel
                controlId="floatingInput"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="XXX-XXX-XXXX" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Knights Email"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <ShowPassword />
            </div>
            <Link to="/homeScreen" className="signup">
              Sign up
            </Link>
          </div>
          <div id="right-side">
            <img className="logoBig" src={logo} alt="BikeN'Gold Logo" />
            <div className="linkField-register">
              <span>Have an account?</span>{" "}
              <span className="link">
                <Link to="./">Sign in</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
