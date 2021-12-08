import React, { useState } from "react";
import "./forgotPassword.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import logo from "../../Images/bikengold.png";
import { postLogin } from "../../Controller/postLogin";
import { signIn } from "../../Model/accSlice";
import { useDispatch } from "react-redux";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    /*set initial credentials to ""*/
    email: "",
    password: "",
  });

  function inputNameChanged(e) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      email: e.target.value,
    });
  }

  function inputPasswordChanged(e) {
    /*change the state of the credentials to the password you typed*/
    setFormInput({
      ...formInput,
      password: e.target.value,
    });
  }

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
        <div id="container-login">
          <div id="left-side">
            <div className="title">Enter your email</div>
            <div className="input-field-auth">
              <FloatingLabel
                controlId="floatingInput"
                label="Knights Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={inputNameChanged}
                />
              </FloatingLabel>
            </div>
            <button className="forgotButton">
              <Link className="forgotLink" to="/">
                Go back to sign in
              </Link>
            </button>
          </div>
          <div id="right-side">
            <img className="logoBig" src={logo} alt="BikeN'Gold Logo" />
          </div>
        </div>
      </div>
    </>
  );
};
