import { React, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { postCustomerSearch } from "../../../Controller/postCustomerSearch";
import "./rentOutTab.css";

export default () => {
  const {customers,bikes} = useSelector(state=>state);
  const [searchResults,setSearchResults] = useState([]);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive4, setActive4] = useState(false);

  function searchCustomers(e){
    /*search only if query not empty*/
    if(e.target.value!='')
    {
      async function asyncSearch(){
        let results = await postCustomerSearch({key:e.target.value});
        setSearchResults(searchResults=>{return results});
      }
      asyncSearch();
    }
    else
    {
      setSearchResults(searchResults=>{return []});
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
                {
                    isActive1 && 
                    <button onClick={unToggleClass1}>
                        cancel
                    </button>
                }
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
          <Table borderless className="table">
            <thead className="table-header">
              <tr>
                <th>NAME</th>
                <th>PHONE</th>
                <th>EMAIL</th>
                <th>WAIVER</th>
              </tr>
            </thead>
            <tbody>
            {
              /*if the search bar is active, display 
                search results. else, display initial
                table*/
              isActive1
              ?
              searchResults.map(customer=>{
                return(
                  <tr>
                      <td>{customer['name']}</td>
                      <td>{customer['phone']}</td>
                      <td>{customer['email']}</td>
                      <td>{customer['waiver']?'true':'false'}</td>
                  </tr>
              )})
              :
              Object.keys(customers.unblacklisted).map((_id,key)=>{
                return(
                    <tr>
                        <td>{customers.unblacklisted[_id]['name']}</td>
                        <td>{customers.unblacklisted[_id]['phone']}</td>
                        <td>{customers.unblacklisted[_id]['email']}</td>
                        <td>{customers.unblacklisted[_id]['waiver']?'true':'false'}</td>
                    </tr>
              )})
            }
            </tbody>
          </Table>
        </div>
        <div className="table-content">
          <div className="title-search-container">
            <div className="table-title">BIKES AVAILABLE</div>
            <div className="search-bar-container-adjust">
              <div
                className={isActive2 ? "search-field-active" : "search-field"}
                onFocus={toggleClass2}
                onBlur={unToggleClass2}
              >
                <input
                  type="text"
                  placeholder="Search available bikes"
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
                <th>STYLE OF BIKE</th>
                <th>SERIAL NUMBER</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(bikes.available).map((bike, key) => {
                  return (
                    <tr className="table-body gray-highlight">
                      <td>{bike['id']}</td>
                      <td>{bike['model']}</td>
                      <td>{bike['serialNumber']}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <Button variant="success">Rent out bike</Button>
      </div>
    </>
  );
};
