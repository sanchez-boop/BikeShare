import { React, useState } from "react";
import { Table, Button, Toast, Col, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BsFillFileCheckFill, BsFillFileXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { postCustomerSearch } from "../../../Controller/postCustomerSearch";
import { postBikeSearch } from "../../../Controller/postBikeSearch";
import "./rentOutTab.css";
import { patchRentedBike } from "../../../Controller/patchRentedBike";
import { editBikeToRented } from "../../../Model/bikesSlice";

export default () => {
  const { customers, bikes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [selectedUser,setSelectedUser] = useState({
    name:'',
    email:'',
    phone:''
  });
  const [selectedBikeId,setSelectedBikeId] = useState('');
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

  function searchBikes(e) {
    /*search only if query not empty*/
    if (e.target.value != "") {
      async function asyncSearch() {
        /*since we need to toggle to show buttons,
          add a boolean to results */
        let results = await postBikeSearch({ key: e.target.value });
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

  /* Toggle the outline for the first search bar */
  const toggleClass1 = () => {
    if (!isActive1) {
      setActive1(!isActive1);
    }
  };

  /*Untoggle the outline for the first search bar 
    and clear search results*/
  const unToggleClass1 = () => {
    setActive1(false);
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
  /* Toggle the outline for the second search bar */
  const toggleClass4 = () => {
    if (!isActive4) {
      setActive4(!isActive4);
    }
  };
  /* Untoggle the outline for the second search bar */
  const unToggleClass4 = () => {
    setActive4(!isActive4);
  };

  async function rentOutBike(){
    if(selectedUser.name!='' && selectedBikeId!='')
    {
      //set dateRented to today formatted in mm/dd/yyyy
      var today = new Date(); 
      var dd = today.getDate(); 
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear(); 

      const credentials = {
        id : selectedBikeId,
        name : selectedUser.name,
        email : selectedUser.email,
        phone : selectedUser.phone,
        dateRented : mm+'/'+dd+'/'+yyyy
      }
      const res = await patchRentedBike(credentials);
      console.log(res);
      if (res.id==selectedBikeId) {
        dispatch(editBikeToRented(res));
        alert(`Rented bike numer ${selectedBikeId} to ${selectedUser.name}`);
      } else {
        alert("Server might be out of sync with recent changes");
      }
    }
  }

  return (
    <>
      <div className="content">
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">RENT TO</div>
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
                    ? searchResults.map((customer) => {
                        return (
                          <tr className="table-body gray-highlight yellow-highlight">
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
                            </td>
                          </tr>
                        );
                      })
                    : Object.keys(customers.unblacklisted).map((_id, key) => {
                        return (
                          <tr
                            className="table-body gray-highlight yellow-highlight"
                            onClick={() => {setSelectedUser((selectedUser)=>{
                                const newSelected = {
                                  name: customers.unblacklisted[_id]["name"],
                                  phone: customers.unblacklisted[_id]["phone"],
                                  email: customers.unblacklisted[_id]["email"]
                                }
                                console.log(newSelected);
                                return newSelected;
                            });}
                            }
                          >
                            <td>{customers.unblacklisted[_id]["name"]}</td>
                            <td>{customers.unblacklisted[_id]["phone"]}</td>
                            <td>{customers.unblacklisted[_id]["email"]}</td>
                            <td>
                              {customers.unblacklisted[_id]["waiver"] ? (
                                <BsFillFileCheckFill
                                  size={23}
                                  color="#22C16B"
                                />
                              ) : (
                                <BsFillFileXFill size={23} color="#FF4141" />
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
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">BIKES AVAILABLE</div>
            <div className="search-bar-container-adjust">
              <div
                className={isActive2 ? "search-field-active" : "search-field"}
                onFocus={toggleClass2}
              >
                {isActive2 && <button onClick={unToggleClass2}>cancel</button>}
                <input
                  type="text"
                  placeholder="Search available bikes"
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
                  <th className="header-border">STYLE OF BIKE</th>
                  <th className="header-border">SERIAL NUMBER</th>
                </tr>
              </thead>
              <tbody>
                {
                  /*if the search bar is active, display 
                search results. else, display initial
                table*/
                  isActive2
                    ? searchResults2.map((bike, key) => {
                        return (
                          <tr className="table-body gray-highlight yellow-highlight">
                            <td>{bike["id"]}</td>
                            <td>{bike["model"]}</td>
                            <td>{bike["serialNumber"]}</td>
                          </tr>
                        );
                      })
                    : Object.values(bikes.available).map((bike, key) => {
                        return (
                          <tr
                            className="table-body gray-highlight yellow-highlight"
                            onClick={() => {setSelectedBikeId((selectedBikeId)=>{
                                console.log(bike["id"]);
                                return bike["id"];
                            });}
                            }
                          >
                            <td>{bike["id"]}</td>
                            <td>{bike["model"]}</td>
                            <td>{bike["serialNumber"]}</td>
                          </tr>
                        );
                      })
                }
              </tbody>
            </Table>
          </div>
        </div>
        <Button variant="success" onClick={rentOutBike}>Rent out bike</Button>
      </div>
    </>
  );
};
