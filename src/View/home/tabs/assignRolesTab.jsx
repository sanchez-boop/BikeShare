import React from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assignRolesTab.css'

export default ()=>{

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>WAIVER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>111-111-1111</td>
                        <td>@mdo</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>111-111-1111</td>
                        <td>@fat</td>
                        <td>No</td>
                    </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>111-111-1111</td>
                        <td>@twitter</td>
                        <td>No</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}