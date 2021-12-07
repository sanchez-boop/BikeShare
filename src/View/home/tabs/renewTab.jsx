import React, { useState, className } from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleRenew } from "../../../Model/bikesSlice";
import { postBikeSearch } from "../../../Controller/postBikeSearch";
import { AiOutlineSearch } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.css";
import "./renewTab.css";

export default () => {
  const { bikes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [isActive1, setActive1] = useState(false);
  //const [selectedRow, setSelectedRow] = useState(false);

  const [selectedRow, setSelectedRow] = useState(
    "table-body gray-highlight yellow-highlight"
  );

  function searchBikes(e) {
    /*search only if query not empty*/
    if (e.target.value != "") {
      async function asyncSearch() {
        /*since we need to toggle to show buttons,
              add a boolean to results */
        let results = await postBikeSearch({ key: e.target.value });
        setSearchResults((searchResults) => {
          return results;
        });
      }
      asyncSearch();
    } else {
      setSearchResults((searchResults) => {
        return [];
      });
    }
  }

  function toggleRow(_id, toggled) {
    //console.log("ID clicked: " + _id);
    //setSelectedRow(!selectedRow);
    //setColor(_id);
    dispatch(toggleRenew({ _id: _id }));

    //if (toggled == false) {
    //  setSelectedRow("table-body gray-highlight yellow-highlight");
    //} else if (toggled == true) {
    //  setSelectedRow("table-body yellow-highlight-active");
    //}
  }
  /*
  function setColor(_id) {
    console.log("Set color was triggered by id: " + _id);
    return (className = "table-body gray-highlight yellow-highlight");
  }
*/
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

  function confirmRenew() {
    if (window.confirm("Are you sure you want to renew?")) {
      //post renew
      alert("Renewed");
    }
  }

  function confirmReturn() {
    if (window.confirm("Are you sure you want to return?")) {
      //post return
      alert("Returned");
    }
  }
  /*
  function toggleActive(i) {
    console.log("toggleActive clicked");
    console.log("isActive is: " + isActive4);
    //Remove the if statement if you don't want to unselect an already selected item
    if (i === isActive4) {
      setActive4({
        isActive4: null,
      });
    } else {
      setActive4({
        isActive4: i,
      });
    }
  }
*/
  /*
  function changeColor(selectedRow) {
    console.log("change color was triggered");
    console.log("selectedRow before: " + selectedRow);
    if (selectedRow !== undefined) {
      console.log("setSelectedRow triggered!!!!");
      setSelectedRow({ selectedRow });
      console.log("selectedRow after: " + selectedRow);
    }
  }
*/
  return (
    <>
      <div className="content">
        <div className="table-content">
          <div className="search-bar-container">
            <div
              className={isActive1 ? "search-field-active" : "search-field"}
              onFocus={toggleClass1}
            >
              {isActive1 && <button onClick={unToggleClass1}>cancel</button>}
              <input
                type="text"
                placeholder="Search customers"
                className="search-bar"
                onChange={searchBikes}
              />
              <div className="search-button" tabindex="0">
                <AiOutlineSearch />
              </div>
            </div>
          </div>
          {/*this table searches bikes */}
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">NAME</th>
                  <th className="header-border">PHONE</th>
                  <th className="header-border">EMAIL</th>
                  <th className="header-border">BIKE NUMBER</th>
                  <th className="header-border">SERIAL NUMBER</th>
                </tr>
              </thead>
              <tbody>
                {
                  /*if the search bar is active, display 
                    search results. else, display initial
                    table*/
                  isActive1
                    ? searchResults.map((bike, key) => {
                        return (
                          <tr className="table-body gray-highlight">
                            <td>{bike["name"]}</td>
                            <td>{bike["phone"]}</td>
                            <td>{bike["email"]}</td>
                            <td>{bike["id"]}</td>
                            <td>
                              {bike["serialNumber"]}
                              <>
                                <button
                                  className="return"
                                  onMouseDown={() => confirmReturn()}
                                >
                                  Return
                                </button>
                                <button
                                  className="renew"
                                  onMouseDown={() => confirmRenew()}
                                >
                                  Renew
                                </button>
                              </>
                            </td>
                          </tr>
                        );
                      })
                    : Object.keys(bikes.due).map((_id, i) => {
                        //console.log("_id is: " + _id);
                        //console.log(
                        //  "selectedRow: " + selectedRow + "\ni: " + i
                        //);
                        return (
                          <tr
                            tabindex="-1"
                            className={selectedRow}
                            //className={
                            //  "table-body gray-highlight yellow-highlight"
                            //}
                            //className={
                            //  isActive4 ? "search-field-active" : "search-field"
                            //}
                            //{setColor(_id)}
                            //style={
                            //  isActive4 === key
                            //    ? { backgroundColor: "#ffcc0099" }
                            //    : { backgroundColor: "#ff9999" }
                            //}
                            //key={key}
                            //key={i}
                            //onClick={() => changeColor(i)}
                            //className={"yellow-highlight"}
                            //className={
                            //  JSON.stringify(selectedRow) === i
                            //    ? "yellow-highlight"
                            //    : "test-highlight"
                            //}
                            //className={
                            //selectedRow
                            //   ? "yellow-highlight"
                            //    : "test-highlight "
                            //}
                            onFocus={() => {
                              toggleRow(_id, bikes.due[_id]["renewClicked"]);
                              console.log(
                                "RenewClicked when focused: " +
                                  bikes.due[_id]["renewClicked"]
                              );
                            }}
                            onBlur={() => {
                              toggleRow(_id, bikes.due[_id]["renewClicked"]);
                              console.log(
                                "RenewClicked when blurred: " +
                                  bikes.due[_id]["renewClicked"]
                              );
                            }}
                            //onClick={() => toggleActive(key)}
                            //onClick={() => setColor(_id)}
                          >
                            {console.log(
                              "selectedRow: " + selectedRow + "\ni: " + i
                            )}
                            <td>{bikes.due[_id]["name"]}</td>
                            <td>{bikes.due[_id]["phone"]}</td>
                            <td>{bikes.due[_id]["email"]}</td>
                            <td>{bikes.due[_id]["id"]}</td>
                            <td className="anchor">
                              {bikes.due[_id]["serialNumber"]}
                              {bikes.due[_id]["renewClicked"] && (
                                <>
                                  <div class="dropdown2-menu show">
                                    <button
                                      className="return"
                                      //onMouseDown={() => confirmReturn()}
                                      onClick={() => {
                                        setSelectedRow(
                                          "table-body yellow-highlight-active"
                                        );
                                        console.log("I was clicked");
                                      }}
                                    >
                                      Return
                                    </button>
                                    <button
                                      className="renew"
                                      onMouseDown={() => confirmRenew()}
                                    >
                                      Renew
                                    </button>
                                  </div>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                }
                {!isActive1 &&
                  Object.keys(bikes.rented).map((_id, key) => {
                    return (
                      <tr
                        className="table-body gray-highlight"
                        onClick={() => toggleRow(_id)}
                      >
                        <td>{bikes.rented[_id]["name"]}</td>
                        <td>{bikes.rented[_id]["phone"]}</td>
                        <td>{bikes.rented[_id]["email"]}</td>
                        <td>{bikes.rented[_id]["id"]}</td>
                        <td>
                          {bikes.rented[_id]["serialNumber"]}
                          {bikes.rented[_id]["renewClicked"] && (
                            <>
                              <button
                                className="return"
                                onMouseDown={() => confirmReturn()}
                              >
                                Return
                              </button>
                              <button
                                className="renew"
                                onMouseDown={() => confirmRenew()}
                              >
                                Renew
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
