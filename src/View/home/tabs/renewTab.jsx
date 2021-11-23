import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toggleRenew } from '../../../Model/bikesSlice';
import 'bootstrap/dist/css/bootstrap.css';
import './renewTab.css'

export default ()=>{
    const {bikes} = useSelector(state=>state);
    const dispatch = useDispatch();

    function toggleRow(_id){
        dispatch(toggleRenew({_id:_id}))
    }

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
            <input type="text" placeholder="Search.."/>
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