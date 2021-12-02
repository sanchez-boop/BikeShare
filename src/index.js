import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//reducers
import accReducer from "./Model/accSlice";
import bikesReducer from "./Model/bikesSlice";
import customersSlice from "./Model/customersSlice";
import repairsSlice from "./Model/repairsSlice";

//Redux configuration
const reducer = combineReducers({
  acc: accReducer,
  bikes: bikesReducer,
  customers: customersSlice,
  repairs: repairsSlice,
});

const store = configureStore({
  reducer,
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
