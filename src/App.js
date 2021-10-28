import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import HomeScreen from './View/home/homeScreen';

function App() {
  /* Set up routing at app level in App.js */
  return (
    <Router>
      <Switch>
        <Route path="/" exact><HomeScreen/></Route>
      </Switch>
    </Router>
  );
}

export default App;
