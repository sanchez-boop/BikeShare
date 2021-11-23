import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toggleDelete } from '../../../Model/bikesSlice';
import 'bootstrap/dist/css/bootstrap.css';
import './bikesTab.css'

export default ()=>{
    const {bikes} = useSelector(state=>state);
    const dispatch = useDispatch();

    function toggleRow(_id){
        dispatch(toggleDelete({_id:_id}));
    }

    function confirmDelete(){
        if (window.confirm("Are you sure you want to delete?")) {
            //post delete
            alert('Deleted');
        }          
    }

    return(
        <>
            <input type="text" placeholder="Search.."/>
            {/*this table searches bikes */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>BIKE NUMBER</th>
                        <th>STYLE OF BIKE</th>
                        <th>SERIAL NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                {
                    /*return due, rented and available bikes */
                    Object.values(bikes).map((bikeObjects, key) => {
                        return Object.keys(bikeObjects).map((_id,key)=>{
                            return (
                                <tr className="table-body gray-highlight" onClick={()=>toggleRow(_id)}>
                                    <td>{bikeObjects[_id]['id']}</td>
                                    <td>{bikeObjects[_id]['model']}</td>
                                    <td>
                                        {bikeObjects[_id]['serialNumber']}
                                        {bikeObjects[_id]['deleteClicked'] && 
                                            <>
                                                <button className="return" onClick={()=>confirmDelete()}>Delete</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    })
                }
                </tbody>
            </Table> 
        </>
    )
}