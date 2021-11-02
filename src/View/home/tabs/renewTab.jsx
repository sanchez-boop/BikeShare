import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './renewTab.css'

export default ()=>{
    //due table, search the due table, repair table, search repair table


    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>BIKE NUMBER</th>
                        <th>SERIAL NUMBER</th>
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
        </>
    )
}