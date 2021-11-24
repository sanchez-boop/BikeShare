import React, {useState} from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './blacklistTab.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleBlackTab } from '../../../Model/customersSlice';

export default ()=>{
    const arr = [[1,'mark','111-111-1111','today'],[2,'murk','111-111-1111','today'],[2,'merk','111-111-1111','today'],[4,'m0rk','111-111-1111','today']]
    const arr2 = [[1,'mark','111-111-1111','today'],[2,'murk','111-111-1111','today'],[2,'merk','111-111-1111','today'],[4,'m0rk','111-111-1111','today']]
    const [blacklistButton,setBlacklistButton] = useState(arr.map(()=>{return false}));
    const [unblacklistButton,setUnblacklistButton] = useState(arr2.map(()=>{return false}));

    const {customers} = useSelector(state=>state);
    const dispatch = useDispatch();

    function toggleBlacklist(_id){
        console.log(_id)
        dispatch(toggleBlackTab({_id:_id}))
    }

    function confirmBlacklist(){
        if (window.confirm("Are you sure you want to blacklist?")) {
            //post renew
            alert('Blacklisted');
        }          
    }

    function confirmUnblacklist(){
        if (window.confirm("Are you sure you want to unblacklist?")) {
            //post renew
            alert('Unblacklisted');
        }          
    }

    return(
        <>
            <input type="text" placeholder="Search.."/>
            {/*these tables searches users, but organize them by blacklist */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                {
                    Object.keys(customers.unblacklisted).map((_id,key)=>{
                        return(
                            <tr onClick={()=>{toggleBlacklist(_id)}}>
                                <td>{customers.unblacklisted[_id]['name']}</td>
                                <td>{customers.unblacklisted[_id]['phone']}</td>
                                <td>
                                    {customers.unblacklisted[_id]['email']}
                                    {customers.unblacklisted[_id]['blackTabClicked'] && 
                                        <>
                                            <button className="blacklist" onClick={confirmBlacklist}>Blacklist</button>
                                        </>
                                    }
                                </td>
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
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                {
                    Object.keys(customers.blacklisted).map((_id,key)=>{
                        return(
                            <tr onClick={()=>{toggleBlacklist(_id)}}>
                                <td>{customers.blacklisted[_id]['name']}</td>
                                <td>{customers.blacklisted[_id]['phone']}</td>
                                <td>
                                    {customers.blacklisted[_id]['email']}
                                    {customers.blacklisted[_id]['blackTabClicked'] && 
                                        <>
                                            <button className="unblacklist" onClick={confirmUnblacklist}>Unblacklist</button>
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