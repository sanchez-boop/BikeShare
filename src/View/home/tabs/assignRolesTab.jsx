import React from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assignRolesTab.css'

export default ()=>{
    const arr = [['mark','111-111-1111','today','Yes'],[1,'mdrk','111-111-1111','today','No'],[1,'madd','111-111-1111','today','No']]

    return(
        <>
            <input type="text" placeholder="Search.."/>
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
                    arr.map((user,key)=>{
                        return(
                            <tr>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>{user[3]}</td>
                                <td>{user[4]}</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
        </>
    )
}