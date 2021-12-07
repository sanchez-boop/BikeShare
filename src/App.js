import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import Login from "./View/auth/login";
import Register from "./View/auth/register";
import HomeScreen from "./View/home/homeScreen";
import CustomerScreen from "./View/home/customerScreen";
import RentOutTab from "./View/home/tabs/rentOutTab";

function App() {
  const { acc } = useSelector((state) => state);

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
          {acc.loggedIn == true ? (
            acc.role == "admin" || acc.role == "worker" ? (
              <Route path="/homeScreen">
                <HomeScreen />
              </Route>
            ) : (
              <Route path="/customerScreen">
                <CustomerScreen />
              </Route>
            )
          ) : (
            <>you're logged out</>
          )}
        </>
      </Switch>
    </Router>
  );
}

export default App;
