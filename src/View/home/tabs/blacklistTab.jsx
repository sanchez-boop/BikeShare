import React, {useState} from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './blacklistTab.css'

export default ()=>{
    const arr = [[1,'mark','111-111-1111','today'],[2,'murk','111-111-1111','today'],[2,'merk','111-111-1111','today'],[4,'m0rk','111-111-1111','today']]
    const arr2 = [[1,'mark','111-111-1111','today'],[2,'murk','111-111-1111','today'],[2,'merk','111-111-1111','today'],[4,'m0rk','111-111-1111','today']]
    const [blacklistButton,setBlacklistButton] = useState(arr.map(()=>{return false}));
    const [unblacklistButton,setUnblacklistButton] = useState(arr2.map(()=>{return false}));

    function toggleBlacklist(idx){
        blacklistButton[idx]= !blacklistButton[idx];
        setBlacklistButton([...blacklistButton]);
    }
    
    function toggleUnblacklist(idx){
        unblacklistButton[idx]= !unblacklistButton[idx];
        setUnblacklistButton([...unblacklistButton]);
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
                    arr.map((user,key)=>{
                        return(
                            <tr onClick={()=>{toggleBlacklist(key)}}>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>
                                    {user[3]}
                                    {blacklistButton[key] && 
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
                    arr2.map((user,key)=>{
                        return(
                            <tr onClick={()=>{toggleUnblacklist(key)}}>
                                <td>{user[0]}</td>
                                <td>{user[1]}</td>
                                <td>{user[2]}</td>
                                <td>
                                    {user[3]}
                                    {unblacklistButton[key] && 
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