import { React, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineSearch } from "react-icons/ai";
import "./homeTab.css";
import { useSelector } from "react-redux";

export default () => {
  //due table, search the due table, repair table, search repair table
  //use css classes to style tables
  //the following arr is an example
  const arr = [
    [1, "mark", "111-111-1111", "today"],
    [2, "murk", "111-111-1111", "today"],
    [2, "merk", "111-111-1111", "today"],
    [4, "m0rk", "111-111-1111", "today"],
  ];

  const {bikes,repairs} = useSelector(state=>state);

  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);

  /* Toggle the outline for the first search bar */
  const toggleClass1 = () => {
    if (!isActive1) {
      setActive1(!isActive1);
    }
  };
  /* Untoggle the outline for the first search bar */
  const unToggleClass1 = () => {
    setActive1(!isActive1);
  };
  /* Toggle the outline for the second search bar */
  const toggleClass2 = () => {
    if (!isActive2) {
      setActive2(!isActive2);
    }
  };
  /* Untoggle the outline for the second search bar */
  const unToggleClass2 = () => {
    setActive2(!isActive2);
  };
  return (
    <>
      <div className="content">
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">DUE</div>
            <div className="search-bar-container">
              <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
                onBlur={unToggleClass1}
              >
                <input
                  type="text"
                  placeholder="Search bikes that are due"
                  className="search-bar"
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
          {/*this table searches bikes */}
          <Table borderless className="table">
            <thead className="table-header">
              <tr>
                <th>BIKE NUMBER</th>
                <th>NAME</th>
                <th>PHONE NUMBER</th>
                <th>DATE CHECKED OUT</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((user, key) => {
                return (
                  <tr className="table-body gray-highlight">
                    <td>{user[0]}</td>
                    <td>{user[1]}</td>
                    <td>{user[2]}</td>
                    <td>{user[3]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">REPAIRS</div>
            <div className="search-bar-container">
              <div
                className={isActive2 ? "search-field-active" : "search-field"}
                onFocus={toggleClass2}
                onBlur={unToggleClass2}
              >
                <input
                  type="text"
                  placeholder="Search current repairs"
                  className="search-bar"
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
          {/*this table searches repairs */}
          <Table borderless className="table">
            <thead className="table-header">
              <tr>
                <th>NAME</th>
                <th>PHONE NUMBER</th>
                <th>EMAIL</th>
                <th>BIKE MODEL</th>
                <th>NOTES</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(repairs).map((repair, key) => {
                return (
                  <tr className="table-body gray-highlight">
                    <td>{repair['name']}</td>
                    <td>{repair['phone']}</td>
                    <td>{repair['email']}</td>
                    <td>{repair['bikeModel']}</td>
                    <td>{repair['notes']}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
