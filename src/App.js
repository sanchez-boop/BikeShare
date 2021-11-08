import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./View/auth/login";
import Register from "./View/auth/register";
import HomeScreen from "./View/home/homeScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/homeScreen">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
