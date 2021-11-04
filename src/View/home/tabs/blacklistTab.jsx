import React from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './blacklistTab.css'

export default ()=>{
    const arr = [[1,'mark','111-111-1111','today'],[2,'murk','111-111-1111','today'],[2,'merk','111-111-1111','today'],[4,'m0rk','111-111-1111','today']]

    return(
        <>
            <input type="text" placeholder="Search.."/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
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
                BLACKLISTED
            </div>
            <input type="text" placeholder="Search.."/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
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