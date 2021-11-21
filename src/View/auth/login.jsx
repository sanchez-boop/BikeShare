import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link ,useHistory} from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import logo from "../../Images/bikengold.png";
import { postLogin } from "../../Controller/postLogin";

export default () => {
  const history = useHistory();
  const [formInput,setFormInput] = useState({
      /*set initial credentials to ""*/
      email : "",
      password : ""
  })

  function inputNameChanged(e){
      /*change the state of the credentials to the name you typed*/
      setFormInput({
          ...formInput,
          'email' : e.target.value
      });
  }

  function inputPasswordChanged(e){
    /*change the state of the credentials to the password you typed*/
    setFormInput({
        ...formInput,
        'password' : e.target.value
    });
}

  function logIn(){
    async function asyncDispatch(){
      /*Await the API response. The API returns an 
      array of a single object with user info, such
      as an email. if arr>0, log the user in.
      else, return login failed*/
      const account = await postLogin(formInput);

      if(account.length>0)
      {
        /*On successful login, push the home screen
        and update the redux state with account info*/
        history.push('/homeScreen');
      }
      else
      {
        alert('login failed, try again');
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

  

  return (
    <>
      <div id="center">
        <div id="container-login">
          <div id="left-side">
            <div className="title">Sign in to BikeN'Gold</div>
            <div className="input-field">
              <FloatingLabel
                controlId="floatingInput"
                label="Knights Email"
                className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" onChange={inputNameChanged}/>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={inputPasswordChanged}/>
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
