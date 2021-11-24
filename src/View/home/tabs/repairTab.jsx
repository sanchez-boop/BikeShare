import React from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './repairTab.css'
import { useSelector } from 'react-redux';

export default ()=>{
    const {customers} = useSelector(state=>state);

    return(
        <>
            <input type="text" placeholder="Search.."/>
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
                    Object.keys(customers.unblacklisted).map((_id,key)=>{
                        return(
                            <tr>
                                <td>{customers.unblacklisted[_id]['name']}</td>
                                <td>{customers.unblacklisted[_id]['phone']}</td>
                                <td>{customers.unblacklisted[_id]['email']}</td>
                                <td>{customers.unblacklisted[_id]['waiver']?'true':'false'}</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
        </>
    )
}