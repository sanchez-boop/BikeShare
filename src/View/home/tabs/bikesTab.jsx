import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBikeToAvailable, deleteBike, toggleDelete } from "../../../Model/bikesSlice";
import { postBikeSearch } from "../../../Controller/postBikeSearch";
import { postBike } from "../../../Controller/postBike";
import { AiOutlineSearch } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.css";
import "./bikesTab.css";
import { deleteBikeReq } from "../../../Controller/deleteBikeReq";

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

  async function confirmDelete(_id,id) {
    if (window.confirm(`Are you sure you want to delete bike number ${id}?`)) {
      //delete bike
      const res = await deleteBikeReq(id);
      console.log(res)
      if(res.deletedCount==1)
      {
        //delete from bikes model
        await dispatch(deleteBike({_id:_id}));
        alert("Deleted");
      }
      else
      {
        alert("Server might not be up to date with changes");
      }
    }
  }

  async function confirmBike() {
    /*Use prompt to add bike model and notes. 
          Post new repair with bike model, notes and 
          customer info to API. Update redux state*/
    const id = prompt("Assign a bike number");
    const model = prompt("Add bike model");
    const serialNumber = prompt("Add a serial number for this bike");
    const newBike = {
      id: id,
      model: model,
      serialNumber: serialNumber,
      notes: "",
      name: "",
      email: "",
      phone: "",
      dateRented: "",
    };

    const ret = await postBike(newBike);

    if (ret.name == "") {
      dispatch(addBikeToAvailable(ret));
    } else {
      alert("Server might not be up to date with changes");
    }
  }

  return (
    <>
      <div className="content">
        <div className="table-content">
          <div className="search-bar-and-button-container">
            <div className="bike-search-bar-container">
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
                                  onMouseDown={() => confirmDelete(bike["_id"],bike["id"])}
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
                              className="table-body gray-highlight yellow-highlight"
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
                                          onMouseDown={() => confirmDelete(_id,bikeObjects[_id]["id"])}
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
