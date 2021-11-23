import React, {useState} from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import './bikesTab.css'

export default ()=>{
    const {bikes,repairs} = useSelector(state=>state);
    const dispatch = useDispatch();

    //create state of false arrays. toggle them to show return renew
    const arr = [[1,'mark','111-111-1111','today','bike','bike'],[1,'mdrk','111-111-1111','today','bike','bike'],[1,'mfrk','111-111-1111','today','bike','bike']];
    const [userClicked,setUserClicked] = useState(arr.map(()=>{return false}));

    function toggleRow(idx){
        userClicked[idx]= !userClicked[idx];
        setUserClicked([...userClicked]);
    }

    function confirmDelete(){
        if (window.confirm("Are you sure you want to delete?")) {
            //post return
            alert('Deleted');
        }          
    }

    return(
        <>
            <input type="text" placeholder="Search.."/>
            {/*this table searches bikes */}
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
                    // arr.map((user,key)=>{
                    //     return(
                    //     <tr onClick={()=>{toggleRow(key)}}>
                    //         <td>{user[0]}</td>
                    //         <td>{user[1]}</td>
                    //         <td>{user[2]}</td>
                    //         <td>{user[3]}</td>
                    //         <td>{user[4]}</td>
                    //         <td>
                    //             {user[5]}
                    //             {userClicked[key] && 
                    //                 <>
                    //                     <button className="return" onClick={()=>confirmDelete()}>Delete</button>
                    //                 </>
                    //             }
                    //         </td>
                    //     </tr>
                    //     )
                    // })
                    // Object.values(bikes).map((bikeObjects, key) => {
                    //     Object.values(bikeObjects).map(())
                    //     // return (
                    //     //   <tr className="table-body gray-highlight">
                    //     //     <td>{bike['id']}</td>
                    //     //     <td>{bike['name']}</td>
                    //     //     <td>{bike['phone']}</td>
                    //     //     <td>{bike['email']}</td>               
                    //     //     <td>{bike['notes']}</td>
                    //     //     <td>{bike['dateRented']}</td>
                    //     //   </tr>
                    //     // );
                    //   })
                }
                </tbody>
            </Table> 
        </>
    )
}