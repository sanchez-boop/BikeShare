import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toggleRenew } from '../../../Model/bikesSlice';
import { postBikeSearch } from '../../../Controller/postBikeSearch';
import { AiOutlineSearch } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.css';
import './renewTab.css'

export default ()=>{
    const {bikes} = useSelector(state=>state);
    const dispatch = useDispatch();
    const [searchResults,setSearchResults] = useState([]);
    const [isActive1, setActive1] = useState(false);

    function searchBikes(e){
        /*search only if query not empty*/
        if(e.target.value!='')
        {
          async function asyncSearch(){
            /*since we need to toggle to show buttons,
              add a boolean to results */
            let results = await postBikeSearch({key:e.target.value});
            setSearchResults(searchResults=>{return results});
          }
          asyncSearch();
        }
        else
        {
          setSearchResults(searchResults=>{return []});
        }
      }

    function toggleRow(_id){
        dispatch(toggleRenew({_id:_id}))
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

    function confirmRenew(){
        if (window.confirm("Are you sure you want to renew?")) {
            //post renew
            alert('Renewed');
        }          
    }

    function confirmReturn(){
        if (window.confirm("Are you sure you want to return?")) {
            //post return
            alert('Returned');
        }          
    }

    return(
        <>
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
                  placeholder="Search bikes that are due"
                  className="search-bar"
                  onChange={searchBikes}
                />
                <div className="search-button" tabindex="0">
                  <AiOutlineSearch />
                </div>
            </div>
            {/*this table searches bikes */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>BIKE NUMBER</th>
                        <th>SERIAL NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    /*if the search bar is active, display 
                    search results. else, display initial
                    table*/
                    isActive1
                    ?
                    searchResults.map((bike,key)=>{
                        return(
                            <tr className="table-body gray-highlight">
                                <td>{bike['name']}</td>
                                <td>{bike['phone']}</td>
                                <td>{bike['email']}</td>               
                                <td>{bike['id']}</td>
                                <td>
                                    {bike['serialNumber']}                                
                                    <>
                                        <button className="return" onClick={()=>confirmReturn()}>Return</button>
                                        <button className="renew" onClick={()=>confirmRenew()}>Renew</button>
                                    </>         
                                </td>
                            </tr>
                    )})
                    :
                        Object.keys(bikes.due).map((_id,key)=>{
                            return (
                                <tr className="table-body gray-highlight" onClick={()=>toggleRow(_id)}>
                                    <td>{bikes.due[_id]['name']}</td>
                                    <td>{bikes.due[_id]['phone']}</td>
                                    <td>{bikes.due[_id]['email']}</td>
                                    <td>{bikes.due[_id]['id']}</td>
                                    <td>
                                        {bikes.due[_id]['serialNumber']}
                                        {bikes.due[_id]['renewClicked'] && 
                                            <>
                                                <button className="return" onClick={()=>confirmReturn()}>Return</button>
                                                <button className="renew" onClick={()=>confirmRenew()}>Renew</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                    {
                        !isActive1 &&
                        Object.keys(bikes.rented).map((_id,key)=>{
                            return (
                                <tr className="table-body gray-highlight" onClick={()=>toggleRow(_id)}>
                                    <td>{bikes.rented[_id]['name']}</td>
                                    <td>{bikes.rented[_id]['phone']}</td>
                                    <td>{bikes.rented[_id]['email']}</td>
                                    <td>{bikes.rented[_id]['id']}</td>
                                    <td>
                                        {bikes.rented[_id]['serialNumber']}
                                        {bikes.rented[_id]['renewClicked'] && 
                                            <>
                                                <button className="return" onClick={()=>confirmReturn()}>Return</button>
                                                <button className="renew" onClick={()=>confirmRenew()}>Renew</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table> 
        </>
    )
}