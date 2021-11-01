import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './homeTab.css'

export default ()=>{
    //due table, search the due table, repair table, search repair table


    return(
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>BIKE NUMBER</th>
                    <th>Name</th>
                    <th>PHONE NUMBER</th>
                    <th>DATE CHECKED OUT</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>111-111-1111</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>111-111-1111</td>
                    <td>@fat</td>
                </tr>
                    <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>111-111-1111</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table> 
    )
}