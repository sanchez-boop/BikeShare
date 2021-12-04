import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.css";
import "./repairTab.css";
import { BsFillFileCheckFill, BsFillFileXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleRepair } from "../../../Model/customersSlice";
import { postCustomerSearch } from "../../../Controller/postCustomerSearch";

export default () => {
  const { customers } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive4, setActive4] = useState(false);

  function searchCustomers(e) {
    /*search only if query not empty*/
    if (e.target.value != "") {
      async function asyncSearch() {
        /*since we need to toggle to show buttons,
              add a boolean to results */
        let results = await postCustomerSearch({ key: e.target.value });

        results.map((customer) => {
          customer["repairClicked"] = false;
        });

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

  function toggle(_id) {
    dispatch(toggleRepair({ _id: _id }));
  }

  function toggleSearchResults(key) {
    //keep searchbar active and toggle repairClicked
    searchResults[key]["repairClicked"] = !searchResults[key]["repairClicked"];
    setSearchResults((searchResults) => {
      return searchResults;
    });
  }

  /* Toggle the outline for the first search bar */
  const toggleClass1 = () => {
    if (!isActive1) {
      setActive1(!isActive1);
    }
  };
  /* Untoggle the outline for the first search bar */
  const unToggleClass1 = () => {
    setActive1(false);
  };

  function confirmRepair(_id, customer) {
    /*Use prompt to add bike model and notes. 
          Post new repair with bike model, notes and 
          customer info to API. Update redux state*/
    const bikeModel = prompt("Add bike model for this repair");
    const notes = prompt("Add notes for this repair");
    const repair = {
      bikeModel: bikeModel,
      notes: notes,
      status: "IN-SHOP",
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    };
  }

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
                onChange={searchCustomers}
              />
              <div className="search-button" tabindex="0">
                <AiOutlineSearch />
              </div>
            </div>
          </div>
          {/*this table searches users */}
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">NAME</th>
                  <th className="header-border">PHONE</th>
                  <th className="header-border">EMAIL</th>
                  <th className="header-border">WAIVER</th>
                </tr>
              </thead>
              <tbody>
                {
                  /*if the search bar is active, display 
                      search results. else, display initial
                      table*/
                  isActive1
                    ? searchResults.map((customer, key) => {
                        return (
                          <tr
                            className="table-body gray-highlight"
                            onClick={() => toggleSearchResults(key)}
                          >
                            <td>{customer["name"]}</td>
                            <td>{customer["phone"]}</td>
                            <td>{customer["email"]}</td>
                            <td className="anchor">
                              {customer["waiver"] ? (
                                <BsFillFileCheckFill
                                  size={23}
                                  color="#22C16B"
                                />
                              ) : (
                                <BsFillFileXFill size={23} color="#FF4141" />
                              )}
                              <>
                                <button
                                  className="renew"
                                  onClick={() =>
                                    confirmRepair(customer["_id"], customer)
                                  }
                                >
                                  REPAIR
                                </button>
                              </>
                            </td>
                          </tr>
                        );
                      })
                    : Object.keys(customers.unblacklisted).map((_id, key) => {
                        //console.log("key is: " + key);
                        return (
                          <tr
                            className="table-body gray-highlight"
                            onClick={() => toggle(_id)}
                          >
                            <td>{customers.unblacklisted[_id]["name"]}</td>
                            <td>{customers.unblacklisted[_id]["phone"]}</td>
                            <td>{customers.unblacklisted[_id]["email"]}</td>
                            <td className="anchor">
                              {customers.unblacklisted[_id]["waiver"] ? (
                                <BsFillFileCheckFill
                                  size={23}
                                  color="#22C16B"
                                />
                              ) : (
                                <BsFillFileXFill size={23} color="#FF4141" />
                              )}
                              {customers.unblacklisted[_id][
                                "repairClicked"
                              ] && (
                                <>
                                  <div class="dropdown2-menu show">
                                    <button
                                      className="renew"
                                      onClick={() =>
                                        confirmRepair(
                                          _id,
                                          customers.unblacklisted[_id]
                                        )
                                      }
                                    >
                                      REPAIR
                                    </button>
                                  </div>
                                </>
                              )}
                            </td>
                          </tr>
                        );
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
