import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import logo from "../../Images/bikengold.png";
import { postLogin } from "../../Controller/postLogin";

export default () => {
  const history = useHistory();
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

  function logIn() {
    async function asyncDispatch() {
      /*Await the API response. The API returns an 
      array of a single object with user info, such
      as an email. if arr>0, log the user in.
      else, return login failed*/
      const account = await postLogin(formInput);

      if (account.length > 0) {
        /*On successful login, push the home screen
        and update the redux state with account info*/
        history.push("/homeScreen");
      } else {
        alert("login failed, try again");
      }
    }

    asyncDispatch();
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="password-field"
          >
            <Form.Control
              type={this.state.type}
              placeholder="Password"
              onChange={inputPasswordChanged}
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

  return (
    <>
      <div id="center">
        <div id="container-login">
          <div id="left-side">
            <div className="title">Sign in to BikeN'Gold</div>
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
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="password-field"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={inputPasswordChanged}
                />
              </FloatingLabel>
              <div id="forget-password">
                <span onClick={ForgetPasswordAlert}>Forget your password?</span>
              </div>
            </div>
            <button className="signin" onClick={logIn}>
              Sign in
            </button>
          </div>
          <div id="right-side">
            <img className="logoBig" src={logo} alt="BikeN'Gold Logo" />
            <div className="linkField-login">
              <span>New to BikeN'Gold?</span>{" "}
              <span className="link">
                <Link to="/register">Create an account</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
