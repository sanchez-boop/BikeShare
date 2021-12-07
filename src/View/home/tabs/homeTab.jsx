import { React, useState } from "react";
import {
  Table,
  DropdownButton,
  Dropdown,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineSearch } from "react-icons/ai";
import "./homeTab.css";
import { useDispatch, useSelector } from "react-redux";
import { editStatus } from "../../../Model/repairsSlice";
import { patchStatus } from "../../../Controller/patchStatus";
import { postBikeSearch } from "../../../Controller/postBikeSearch";
import { postRepairSearch } from "../../../Controller/postRepairSearch";
import { postAnnouncement } from "../../../Controller/postAnnouncement";

export default () => {
  const { bikes, repairs } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);

  const { acc } = useSelector((state) => state);

  const [formInput, setFormInput] = useState({
    /*set initial credentials to ""*/
    announcement: "",
  });

  function inputAnnouncementChanged(e) {
    /*change the state of the credentials to the name you typed*/
    setFormInput({
      ...formInput,
      announcement: e.target.value,
    });
  }

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

  function searchRepairs(e) {
    /*search only if query not empty*/
    if (e.target.value != "") {
      async function asyncSearch() {
        /*since we need to toggle to show buttons,
          add a boolean to results */
        let results = await postRepairSearch({ key: e.target.value });
        setSearchResults2((searchResults2) => {
          return results;
        });
      }
      asyncSearch();
    } else {
      setSearchResults2((searchResults2) => {
        return [];
      });
    }
  }

  async function dropdownClicked(_id, status) {
    /*toggle dropdown box on redux then edit
        status to back end. first edit the redux 
        status. then make an API call to edit status on
        back end. finally, get the API changes to sync
        back end and front end */
    dispatch(
      editStatus({
        _id: _id,
        status: status,
      })
    );

    /*now edit status on back end & pull changes*/
    const credentials = {
      _id: _id,
      status: status,
    };

    const response = await patchStatus(credentials);
    console.log("The response is " + response);

    if (response != null) {
      //here is where you would sync front end and back end
      dispatch(
        editStatus({
          _id: _id,
          status: response.status,
        })
      );
    } else {
      alert("Server might be out of sync with recent changes");
    }
  }

  function searchDropdownClicked(key, _id, status) {
    /*when you change dropdown from the search bar,
      you need to update the search results, the redux
      state and the back end. do the state update here 
      and redux/backend there*/
    searchResults2[key]["status"] = status;
    setSearchResults2((prevState) => {
      return searchResults2;
    });
    dropdownClicked(_id, status);
  }

  async function addAnnouncement(){
    if (window.confirm("Are you sure you want to make this announcement?")) {
      var today = new Date(); 
      var dd = today.getDate(); 
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear(); 

      const credentials = {
        id: 'fuck you',
        timeStamp : Date.now(),
        date : mm+'/'+dd+'/'+yyyy,
        note : formInput.announcement
      };
      const res = await postAnnouncement(credentials);

      console.log(res);
      if(res.note==formInput.announcement)
      {
        alert("Created announcement: ", formInput.announcement);
      }
      else
      {
        alert("System might not be up to date with recent changes");
      }
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

  function tagDisplay(status, _id) {
    if (status == "PICKED UP") {
      return (
        <DropdownButton
          id="dropdown-button-picked-up"
          title={repairs[_id]["status"]}
        >
          <Dropdown.Item
            href="#/action-1"
            onClick={() => dropdownClicked(_id, "IN-SHOP")}
          >
            <DropdownButton id="dropdown-button-in-shop" title={"IN-SHOP"} />
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => dropdownClicked(_id, "CUSTOMER NOTIFIED")}
          >
            <DropdownButton
              id="dropdown-button-customer-notified"
              title={"CUSTOMER NOTIFIED"}
            />
          </Dropdown.Item>
        </DropdownButton>
      );
    } else if (status == "IN-SHOP") {
      return (
        <DropdownButton
          id="dropdown-button-in-shop"
          title={repairs[_id]["status"]}
        >
          <Dropdown.Item
            href="#/action-3"
            onClick={() => dropdownClicked(_id, "PICKED UP")}
          >
            <DropdownButton
              id="dropdown-button-picked-up"
              title={"PICKED UP"}
            />
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => dropdownClicked(_id, "CUSTOMER NOTIFIED")}
          >
            <DropdownButton
              id="dropdown-button-customer-notified"
              title={"CUSTOMER NOTIFIED"}
            />
          </Dropdown.Item>
        </DropdownButton>
      );
    } else if (status == "CUSTOMER NOTIFIED") {
      return (
        <DropdownButton
          id="dropdown-button-customer-notified"
          title={repairs[_id]["status"]}
        >
          <Dropdown.Item
            href="#/action-1"
            onClick={() => dropdownClicked(_id, "IN-SHOP")}
          >
            <DropdownButton id="dropdown-button-in-shop" title={"IN-SHOP"} />
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => dropdownClicked(_id, "PICKED UP")}
          >
            <DropdownButton
              id="dropdown-button-picked-up"
              title={"PICKED UP"}
            />
          </Dropdown.Item>
        </DropdownButton>
      );
    }
  }
  return (
    <>
      <div className="content">
        {acc.role == "admin" && (
          <div className="table-content">
            <div className="announcement-title">MAKE AN ANNOUNCEMENT</div>
            <div className="announcement-content">
              <Form.Control
                as="textarea"
                placeholder="Type your announcement here..."
                className="announcement-text"
                onChange={inputAnnouncementChanged}
              />
              <button
                className={
                  formInput.announcement == ""
                    ? "submit-announcement-dim"
                    : "submit-announcement"
                }
                onClick={() =>
                  formInput.announcement == ""
                    ? ""
                    : 
                    addAnnouncement()
                }
              >
                Submit
              </button>
            </div>
          </div>
        )}
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">DUE</div>
            <div className="search-bar-container">
              <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
              >
                {isActive1 && <button onClick={unToggleClass1}>cancel</button>}
                <input
                  type="text"
                  placeholder="Search bikes that are due"
                  className="search-bar"
                  onChange={searchBikes}
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
          {/*this table searches bikes */}
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">BIKE NUMBER</th>
                  <th className="header-border">NAME</th>
                  <th className="header-border">PHONE NUMBER</th>
                  <th className="header-border">EMAIL</th>
                  <th className="header-border">NOTES</th>
                  <th className="header-border">DATE CHECKED OUT</th>
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
                            <td>{bike["name"]}</td>
                            <td>{bike["phone"]}</td>
                            <td>{bike["email"]}</td>
                            <td>{bike["notes"]}</td>
                            <td>{bike["dateRented"]}</td>
                          </tr>
                        );
                      })
                    : Object.values(bikes.due).map((bike, key) => {
                        return (
                          <tr className="table-body gray-highlight">
                            <td>{bike["id"]}</td>
                            <td>{bike["name"]}</td>
                            <td>{bike["phone"]}</td>
                            <td>{bike["email"]}</td>
                            <td>{bike["notes"]}</td>
                            <td>{bike["dateRented"]}</td>
                          </tr>
                        );
                      })
                }
              </tbody>
            </Table>
          </div>
        </div>
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">REPAIRS</div>
            <div className="search-bar-container">
              <div
                className={isActive2 ? "search-field-active" : "search-field"}
                onFocus={toggleClass2}
              >
                {isActive2 && <button onClick={unToggleClass2}>cancel</button>}
                <input
                  type="text"
                  placeholder="Search current repairs"
                  className="search-bar"
                  onChange={searchRepairs}
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
          {/*this table searches repairs */}
          <div className="margin" />
          <div className="scroll">
            <Table borderless className="table">
              <thead className="table-header">
                <tr className="sticky">
                  <th className="header-border">NAME</th>
                  <th className="header-border">PHONE NUMBER</th>
                  <th className="header-border">EMAIL</th>
                  <th className="header-border">BIKE MODEL</th>
                  <th className="header-border">NOTES</th>
                  <th className="header-border"></th>
                </tr>
              </thead>
              <tbody>
                {
                  /*if the search bar is active, display 
                  search results. else, display initial
                  table*/
                  isActive2
                    ? searchResults2.map((repair, key) => {
                        return (
                          <tr className="table-body gray-highlight">
                            <td>{repair["name"]}</td>
                            <td>{repair["phone"]}</td>
                            <td>{repair["email"]}</td>
                            <td>{repair["bikeModel"]}</td>
                            <td>{repair["notes"]}</td>
                            <td>
                              <DropdownButton
                                id="dropdown-basic-button"
                                title={repair["status"]}
                              >
                                <Dropdown.Item
                                  href="#/action-1"
                                  onClick={() =>
                                    searchDropdownClicked(
                                      key,
                                      repair["_id"],
                                      "IN-SHOP"
                                    )
                                  }
                                >
                                  IN-SHOP
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-2"
                                  onClick={() =>
                                    searchDropdownClicked(
                                      key,
                                      repair["_id"],
                                      "CUSTOMER NOTIFIED"
                                    )
                                  }
                                >
                                  CUSTOMER NOTIFIED
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#/action-3"
                                  onClick={() =>
                                    searchDropdownClicked(
                                      key,
                                      repair["_id"],
                                      "PICKED UP"
                                    )
                                  }
                                >
                                  PICKED UP
                                </Dropdown.Item>
                              </DropdownButton>
                            </td>
                          </tr>
                        );
                      })
                    : Object.keys(repairs).map((_id, key) => {
                        return (
                          <tr className="table-body gray-highlight">
                            <td>{repairs[_id]["name"]}</td>
                            <td>{repairs[_id]["phone"]}</td>
                            <td>{repairs[_id]["email"]}</td>
                            <td>{repairs[_id]["bikeModel"]}</td>
                            <td>{repairs[_id]["notes"]}</td>
                            <td>{tagDisplay(repairs[_id]["status"], _id)}</td>
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
