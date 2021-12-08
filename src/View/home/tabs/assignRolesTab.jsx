import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./assignRolesTab.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillFileCheckFill, BsFillFileXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAssign,
  editRole,
  addCustomerToUnblacklisted,
} from "../../../Model/customersSlice";
import { patchRole } from "../../../Controller/patchRole";
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
        let results = await postCustomerSearch({ key: e.target.value });
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

  function toggle(_id) {
    dispatch(toggleAssign({ _id: _id }));
  }

  function confirmAssign(_id, name, role) {
    if (window.confirm(`Are you sure you want to assign ${name} as ${role}?`)) {
      /*First, edit role on front end, then patch 
              changes to back end. sync the app by adding
              the returned object to unblacklisted*/
      async function asyncDispatch() {
        console.log(_id,role)
        const credentials = {
          _id: _id,
          role: role,
        };
        dispatch(editRole(credentials));

        /*now edit role on back end & sync changes*/
        const customer = await patchRole(credentials);
        if (customer != null) {
          //dispatch(addCustomerToUnblacklisted(customer));  DELETEME: This line will break
          //                                                 the buttons display when assigned a role
          alert(`Assigned ${name} as ${role}`);
        } else {
          alert("Server might be out of sync with recent changes");
        }
      }

      asyncDispatch();
    }
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
                          <tr className="table-body gray-highlight">
                            <td>{customer["name"]}</td>
                            <td>{customer["phone"]}</td>
                            <td>{customer["email"]}</td>
                            <td>
                              {customer["waiver"] ? (
                                <BsFillFileCheckFill
                                  size={23}
                                  color="#22C16B"
                                />
                              ) : (
                                <BsFillFileXFill size={23} color="#FF4141" />
                              )}
                              <>
                                {/*Make sure the button shown isn't the worker's current role*/}
                                {customer["role"] != "admin" && (
                                  <button
                                    className="renew"
                                    onMouseDown={() =>
                                      confirmAssign(
                                        customer["_id"],
                                        customer["name"],
                                        "admin"
                                      )
                                    }
                                  >
                                    ADMIN
                                  </button>
                                )}
                                {customer["role"] != "worker" && (
                                  <button
                                    className="renew"
                                    onMouseDown={() =>
                                      confirmAssign(
                                        customer["_id"],
                                        customer["name"],
                                        "worker"
                                      )
                                    }
                                  >
                                    WORKER
                                  </button>
                                )}
                                {customer["role"] != "customer" && (
                                  <button
                                    className="renew"
                                    onMouseDown={() =>
                                      confirmAssign(
                                        customer["_id"],
                                        customer["name"],
                                        "customer"
                                      )
                                    }
                                  >
                                    CUSTOMER
                                  </button>
                                )}
                              </>
                            </td>
                          </tr>
                        );
                      })
                    : Object.keys(customers.unblacklisted).map((_id, key) => {
                        return (
                          <tr
                            tabindex="-1"
                            className="table-body gray-highlight yellow-highlight"
                            onFocus={() => toggle(_id)}
                            onBlur={() => toggle(_id)}
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
                                "assignClicked"
                              ] && (
                                <>
                                  <div
                                    class="dropdown2-menu show"
                                    //tabindex="-1"
                                  >
                                    {/*Make sure the button shown isn't the worker's current role*/}
                                    {customers.unblacklisted[_id]["role"] !=
                                      "admin" && (
                                      <button
                                        className="renew"
                                        onMouseDown={() => {
                                          confirmAssign(
                                            _id,
                                            customers.unblacklisted[_id][
                                              "name"
                                            ],
                                            "admin"
                                          );
                                          console.log(
                                            "confirmAssign triggered"
                                          );
                                        }}
                                        /*onClick={(e) => e.currentTarget.blur()}
                                        onClick={(e) =>
                                          console.log(
                                            "e.currentTarget: " +
                                              e.currentTarget
                                          )
                                        }
                                        */
                                      >
                                        ADMIN
                                      </button>
                                    )}
                                    {customers.unblacklisted[_id]["role"] !=
                                      "worker" && (
                                      <button
                                        className="renew"
                                        onMouseDown={() =>
                                          confirmAssign(
                                            _id,
                                            customers.unblacklisted[_id][
                                              "name"
                                            ],
                                            "worker"
                                          )
                                        }
                                      >
                                        WORKER
                                      </button>
                                    )}
                                    {customers.unblacklisted[_id]["role"] !=
                                      "customer" && (
                                      <button
                                        className="renew"
                                        onMouseDown={() =>
                                          confirmAssign(
                                            _id,
                                            customers.unblacklisted[_id][
                                              "name"
                                            ],
                                            "customer"
                                          )
                                        }
                                      >
                                        CUSTOMER
                                      </button>
                                    )}
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
