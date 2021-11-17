import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './homeTab.css'

export default ()=>{
    //due table, search the due table, repair table, search repair table
    //use css classes to style tables
    //the following arr is an example
    const arr = [[1,'mark','111-111-1111','today'],[2,'murk','111-111-1111','today'],[2,'merk','111-111-1111','today'],[4,'m0rk','111-111-1111','today']]
    
    return(
        <>
            <div>
                DUE
            </div>
            <input type="text" placeholder="Search.."/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>BIKE NUMBER</th>
                        <th>NAME</th>
                        <th>PHONE NUMBER</th>
                        <th>DATE CHECKED OUT</th>
                    </tr>
                </thead>
                <tbody>
                {
                    arr.map((user,key)=>{
                        return(
                            <tr>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>{user[3]}</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
            <div>
                REPAIRS
            </div>
            <input type="text" placeholder="Search.."/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE NUMBER</th>
                        <th>BIKE MODEL</th>
                        <th>NOTES</th>
                    </tr>
                </thead>
                <tbody>
                {
                    arr.map((user,key)=>{
                        return(
                            <tr>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>{user[3]}</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table> 
        </>
    )
}