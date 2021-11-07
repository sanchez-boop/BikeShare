import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './renewTab.css'

export default ()=>{
    //create state of false arrays. toggle them to show return renew
    const arr = [[1,'mark','111-111-1111','today','bike','bike'],[1,'mdrk','111-111-1111','today','bike','bike'],[1,'mfrk','111-111-1111','today','bike','bike']];
    const [userClicked,setUserClicked] = useState(arr.map(()=>{return false}));

    function toggleRow(idx){
        userClicked[idx]= !userClicked[idx];
        setUserClicked([...userClicked]);
    }

    function confirmRenew(){
        if (window.confirm("Are you sure you want to renew?")) {
            //post renew
            alert('Renewed');
        }          
    }

    function confirmReturn(){
        if (window.confirm("Are you sure you want to return?")) {
            //post return
            alert('Returned');
        }          
    }

    return(
        <>
            <input type="text" placeholder="Search.."/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>BIKE NUMBER</th>
                        <th>SERIAL NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                {
                    //map thru arr & toggle btn based on row idx (key)
                    arr.map((user,key)=>{
                        return(
                        <tr onClick={()=>{toggleRow(key)}}>
                            <td>{user[0]}</td>
                            <td>{user[1]}</td>
                            <td>{user[2]}</td>
                            <td>{user[3]}</td>
                            <td>{user[4]}</td>
                            <td>
                                {user[5]}
                                {userClicked[key] && 
                                    <>
                                        <button className="return" onClick={confirmReturn}>Return</button>
                                        <button className="renew" onClick={confirmRenew}>Renew</button>
                                    </>
                                }
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </Table> 
        </>
    )
}