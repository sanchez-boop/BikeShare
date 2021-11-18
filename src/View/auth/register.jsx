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
      <div style={{ display: "flex", alignItems: "center" }}>
        <FloatingLabel controlId="floatingPassword" label="Re-enter Password">
          <Form.Control
            type={this.state.type}
            placeholder="Re-enter Password"
          />
        </FloatingLabel>
        <span onClick={this.showHide} className="eye">
          {this.state.type === "input" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash-fill"
              viewBox="0 0 16 16"
            >
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          )}
        </span>
      </div>
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
