import React, { useState } from 'react';
import { Table , Button} from 'react-bootstrap';
import { AiOutlineSearch } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.css';
import './repairTab.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleRepair } from '../../../Model/customersSlice';
import { postUserSearch } from '../../../Controller/postUserSearch';

export default ()=>{
    const {customers} = useSelector(state=>state);
    const dispatch = useDispatch();
    const [searchResults,setSearchResults] = useState([]);
    const [isActive1, setActive1] = useState(false);
    const [isActive2, setActive2] = useState(false);
    const [isActive4, setActive4] = useState(false);

    function searchCustomers(e){
        /*search only if query not empty*/
        if(e.target.value!='')
        {
          async function asyncSearch(){
            let results = await postUserSearch({key:e.target.value});
            setSearchResults(searchResults=>{return results});
          }
          asyncSearch();
        }
        else
        {
          setSearchResults(searchResults=>{return []});
        }
      }

    function toggle(_id){
        dispatch(toggleRepair({_id:_id}))
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

    function confirmRepair(_id,customer){
        /*Use prompt to add bike model and notes. 
          Post new repair with bike model, notes and 
          customer info to API. Update redux state*/
        const bikeModel = prompt('Add bike model for this repair')
        const notes = prompt('Add notes for this repair');
        const repair = {
            bikeModel : bikeModel,
            notes : notes,
            status : 'IN-SHOP',
            name : customer.name,
            email : customer.email,
            phone : customer.phone
        }

    }

    return(
        <>
            <div
                className={isActive1 ? "search-field-active" : "search-field"}
                onFocus={toggleClass1}
                onBlur={unToggleClass1}
              >
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
            {/*this table searches users */}
            <Table striped bordered hover>
                <thead>
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
                            <tr onClick={()=>toggle(_id)}>
                                <td>{customers.unblacklisted[_id]['name']}</td>
                                <td>{customers.unblacklisted[_id]['phone']}</td>
                                <td>{customers.unblacklisted[_id]['email']}</td>
                                <td>
                                    {customers.unblacklisted[_id]['waiver']?'true':'false'}
                                    {customers.unblacklisted[_id]['repairClicked'] && 
                                        <>
                                            <button className="renew" onClick={()=>confirmRepair(_id,customers.unblacklisted[_id])}>REPAIR</button>
                                        </>
                                    }
                                </td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
        </>
    )
}