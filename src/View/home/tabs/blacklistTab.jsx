import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineSearch } from "react-icons/ai";
import "./blacklistTab.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleBlackTab,
  addCustomerToBlacklisted,
  addCustomerToUnblacklisted,
  swapToUnblacklisted,
  swapToBlacklisted,
} from "../../../Model/customersSlice";
import { patchBlacklist } from "../../../Controller/patchBlacklist";

export default () => {
  const { customers } = useSelector((state) => state);
  const dispatch = useDispatch();

  function toggleBlacklist(_id) {
    dispatch(toggleBlackTab({ _id: _id }));
  }

  function confirmBlacklist(_id) {
    if (window.confirm("Are you sure you want to blacklist?")) {
      /*First, swap from unblack to black on 
              front end, then patch changes to back end. 
              sync the app by adding returned object to 
              blacklisted */
      async function asyncDispatch() {
        dispatch(swapToBlacklisted({ _id: _id }));

        /*now edit blacklist on back end & sync changes*/
        const credentials = {
          _id: _id,
          blacklist: true,
        };

        const customer = await patchBlacklist(credentials);
        if (customer != null) {
          dispatch(addCustomerToBlacklisted(customer));
          alert("Blacklisted");
        } else {
          alert("Server might be out of sync with recent changes");
        }
      }

      asyncDispatch();
    }
  }

  function confirmUnblacklist(_id) {
    if (window.confirm("Are you sure you want to unblacklist?")) {
      /*First, swap from unblack to black on 
              front end, then patch changes to back end. 
              sync the app by checking if object on 
              front end is same as object on back end */
      async function asyncDispatch() {
        dispatch(swapToUnblacklisted({ _id: _id }));

        /*now edit blacklist on back end & sync changes*/
        const credentials = {
          _id: _id,
          blacklist: false,
        };

        const customer = await patchBlacklist(credentials);
        if (customer != null) {
          dispatch(addCustomerToUnblacklisted(customer));
          alert("Unblacklisted");
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
            {/*
              <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
              >
                
                {isActive1 && <button onClick={unToggleClass1}>cancel</button>}
                */}
            <input
              type="text"
              placeholder="Search customers"
              className="search-bar"
              //onChange={searchBikes}
            />
            <div className="search-button" tabindex="0">
              <AiOutlineSearch />
            </div>
            {/*</div>*/}
          </div>
          {/*these tables searches users, but organize them by blacklist */}
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">NAME</th>
                  <th className="header-border">PHONE</th>
                  <th className="header-border">EMAIL</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(customers.unblacklisted).map((_id, key) => {
                  return (
                    <tr
                      tabindex="-1"
                      className="table-body gray-highlight"
                      onFocus={() => toggleBlacklist(_id)}
                      onBlur={() => toggleBlacklist(_id)}
                    >
                      <td>{customers.unblacklisted[_id]["name"]}</td>
                      <td>{customers.unblacklisted[_id]["phone"]}</td>
                      <td className="anchor">
                        {customers.unblacklisted[_id]["email"]}
                        {customers.unblacklisted[_id]["blackTabClicked"] && (
                          <>
                            <div class="dropdown2-menu show">
                              <button
                                className="blacklist"
                                onClick={() => confirmBlacklist(_id)}
                              >
                                Blacklist
                              </button>
                            </div>
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
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">BLACKLISTED</div>
            <div className="search-bar-container-adjust">
              {/*
              <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
              >
                
                {isActive1 && <button onClick={unToggleClass1}>cancel</button>}
                */}
              <input
                type="text"
                placeholder="Search customers"
                className="search-bar"
                //onChange={searchBikes}
              />
              <div className="search-button" tabindex="0">
                <AiOutlineSearch />
              </div>
              {/*</div>*/}
            </div>
          </div>
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">NAME</th>
                  <th className="header-border">PHONE</th>
                  <th className="header-border">EMAIL</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(customers.blacklisted).map((_id, key) => {
                  return (
                    <tr
                      tabindex="-1"
                      className="table-body gray-highlight"
                      onFocus={() => toggleBlacklist(_id)}
                      onBlur={() => toggleBlacklist(_id)}
                    >
                      <td>{customers.blacklisted[_id]["name"]}</td>
                      <td>{customers.blacklisted[_id]["phone"]}</td>
                      <td className="anchor">
                        {customers.blacklisted[_id]["email"]}
                        {customers.blacklisted[_id]["blackTabClicked"] && (
                          <>
                            <div class="dropdown2-menu show">
                              <button
                                className="renew"
                                onClick={() => confirmUnblacklist(_id)}
                              >
                                Unblacklist
                              </button>
                            </div>
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
