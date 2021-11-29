import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import Login from "./View/auth/login";
import Register from "./View/auth/register";
import HomeScreen from "./View/home/homeScreen";

function App() {
  const {acc} = useSelector(state=>state);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <>
          {
            acc.loggedIn==true 
            ?
            <Route path="/homeScreen">
              <HomeScreen />
            </Route>
            :
            <>
              you're logged out
            </>
          }
        </>
      </Switch>
    </Router>
  );
}

export default App;
