import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import HomeScreen from './View/home/homeScreen';

function App() {
  /* Set up routing in App.js */
  return (
    <Router>
      <HomeScreen/>
    </Router>
  );
}

export default App;
