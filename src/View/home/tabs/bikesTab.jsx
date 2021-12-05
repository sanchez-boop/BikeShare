import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleDelete } from "../../../Model/bikesSlice";
import { postBikeSearch } from "../../../Controller/postBikeSearch";
import { AiOutlineSearch } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.css";
import "./bikesTab.css";

export default () => {
  const { bikes } = useSelector((state) => state);
  const { acc } = useSelector((state) => state);
  //console.log(bikes);

  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [isActive1, setActive1] = useState(false);

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

  function toggleRow(_id) {
    dispatch(toggleDelete({ _id: _id }));
  }

  function confirmDelete() {
    if (window.confirm("Are you sure you want to delete?")) {
      //post delete
      alert("Deleted");
    }
  }

  function confirmBike() {
    /*Use prompt to add bike model and notes. 
          Post new repair with bike model, notes and 
          customer info to API. Update redux state*/
    const bikeNumber = prompt("Assign a bike number");
    const bikeModel = prompt("Add bike model");
    const serialNumber = prompt("Add a serial number for this bike");
    const newBike = {
      bikeNumber: bikeNumber,
      bikeModel: bikeModel,
      serialNumber: serialNumber,
    };
  }

  return (
    <>
      <div className="content">
        <div className="table-content">
          <div className="search-bar-and-button-container">
            <div className="search-bar-container">
              <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
              >
                {isActive1 && <button onClick={unToggleClass1}>cancel</button>}
                <input
                  type="text"
                  placeholder="Search bike"
                  className="search-bar"
                  onChange={searchBikes}
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            {acc.role == "admin" && (
              <button className="add-bike" onClick={() => confirmBike()}>
                Add bike
              </button>
            )}
          </div>
          {/*this table searches bikes */}
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">BIKE NUMBER</th>
                  <th className="header-border">STYLE OF BIKE</th>
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
                            <td>{bike["id"]}</td>
                            <td>{bike["model"]}</td>
                            <td>
                              {bike["serialNumber"]}
                              <>
                                <button
                                  className="return"
                                  onClick={() => confirmDelete()}
                                >
                                  Delete
                                </button>
                              </>
                            </td>
                          </tr>
                        );
                      })
                    : /*return due, rented and available bikes */
                      Object.values(bikes).map((bikeObjects, key) => {
                        return Object.keys(bikeObjects).map((_id, key) => {
                          return (
                            <tr
                              tabindex="-1"
                              className="table-body gray-highlight"
                              onFocus={() => toggleRow(_id)}
                              onBlur={() => toggleRow(_id)}
                            >
                              <td>{bikeObjects[_id]["id"]}</td>
                              <td>{bikeObjects[_id]["model"]}</td>
                              <td className="anchor">
                                {bikeObjects[_id]["serialNumber"]}
                                {bikeObjects[_id]["deleteClicked"] && (
                                  <>
                                    {acc.role == "admin" && (
                                      <div class="dropdown2-menu show">
                                        <button
                                          className="return"
                                          onClick={() => confirmDelete()}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </td>
                            </tr>
                          );
                        });
                      })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
