import { React, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineSearch } from "react-icons/ai";
import "./homeTab.css";
import { useDispatch, useSelector } from "react-redux";
import { editStatus , addRepair } from "../../../Model/repairsSlice";
import { getRepairs } from "../../../Controller/getRepairs"

export default () => {
  const {bikes,repairs} = useSelector(state=>state);
  const dispatch = useDispatch();

  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);

  function dropdownClicked(_id,status){
      /*toggle dropdown box on redux then edit
        status to back end. first edit the redux 
        status. then make an API call to edit status on
        back end. finally, get the API changes to sync
        back end and front end */
      async function asyncDispatch(){
        dispatch(editStatus({
          _id : _id,
          status : status
        }));

        /*now edit status on back end & pull changes*/
        
        /*change this code when we get a better api */
        const credentials = {
          id : 4545,
          status : status
        }

        const curl = 'https://bikengold.herokuapp.com/repairs';
        const options = {
            method : 'PATCH',
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                },
            body : JSON.stringify(credentials)
        };

        const response = await fetch(curl,options)
        .then(response=>{return response.json()})
        .catch(error=>{alert(error)});

        if(response.modifiedCount==1)
        {
          //here is where you would sync front end and back end
          const aux = await getRepairs();
          aux.map(repair=>{
            dispatch(addRepair(repair))
          })
        }
        else
        {
          alert('Upload failed. Server might not be up to date')
        }
        /*change above code when we get a better api */
      }

      /*ONLY change status if dropdown option is true*/
      if(repairs[_id].dropdown==true){
        asyncDispatch()
      }
      else
      {
        dispatch(editStatus({
          _id : _id,
          status : status
        }));
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
              {Object.values(bikes.due).map((bike, key) => {
                return (
                  <tr className="table-body gray-highlight">
                    <td>{bike['serialNumber']}</td>
                    <td>{'fix api'}</td>
                    <td>{'fix api'}</td>
                    <td>{bike['dateRented']}</td>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(repairs).map((_id, key) => {
                return (
                  <tr className="table-body gray-highlight">
                    <td>{repairs[_id]['name']}</td>
                    <td>{repairs[_id]['phone']}</td>
                    <td>{repairs[_id]['email']}</td>
                    <td>{repairs[_id]['bikeModel']}</td>
                    <td>
                      {repairs[_id]['notes']}
                    </td>
                    <td>
                      {
                        /*the dropdown will be done on redux since
                          state management will be cleaner. The 
                          dropdown menu will show curr status first, 
                          then rest of statuses that arent curr status
                          */
                        repairs[_id]['dropdown']
                        ?
                        <>
                          <button className="repair-status" onClick={()=>dropdownClicked(_id,repairs[_id]['status'])}>{repairs[_id]['status']}</button>
                          {
                            repairs[_id]['status']!='IN-SHOP' &&
                            <button className="repair-status" onClick={()=>dropdownClicked(_id,'IN-SHOP')}>{'IN-SHOP'}</button>
                          }
                          {
                            repairs[_id]['status']!='CUSTOMER NOTIFIED' &&
                            <button className="repair-status" onClick={()=>dropdownClicked(_id,'CUSTOMER NOTIFIED')}>{'CUSTOMER NOTIFIED'}</button>
                          }
                          {
                            repairs[_id]['status']!='PICKED UP' &&
                            <button className="repair-status" onClick={()=>dropdownClicked(_id,'PICKED UP')}>{'PICKED UP'}</button>
                          }
                        </>
                        :
                        <button className="repair-status" onClick={()=>dropdownClicked(_id,repairs[_id]['status'])}>{repairs[_id]['status']}</button>
                      }
                    </td>
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
