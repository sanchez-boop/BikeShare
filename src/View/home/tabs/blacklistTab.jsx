import React, {useState} from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './blacklistTab.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleBlackTab, addCustomerToBlacklisted, addCustomerToUnblacklisted, swapToUnblacklisted, swapToBlacklisted } from '../../../Model/customersSlice';
import { patchBlacklist } from '../../../Controller/patchBlacklist';

export default ()=>{
    const {customers} = useSelector(state=>state);
    const dispatch = useDispatch();

    function toggleBlacklist(_id){
        dispatch(toggleBlackTab({_id:_id}))
    }

    function confirmBlacklist(_id){
        if (window.confirm("Are you sure you want to blacklist?")) {
            /*First, swap from unblack to black on 
              front end, then patch changes to back end. 
              sync the app by checking if object on 
              front end is same as object on back end */
              async function asyncDispatch(){
                dispatch(swapToBlacklisted({_id:_id}));
                
                /*now edit blacklist on back end & sync changes*/
                const credentials = {
                  _id : _id,
                  blacklist : true
                }
        
                const customer = await patchBlacklist(credentials);
                if(customer!=null)
                {
                    dispatch(addCustomerToBlacklisted(customer))
                    alert('Blacklisted');
                }
                else
                {
                    alert('Server might be out of sync with recent changes')
                }
            }
        
            asyncDispatch();
        }          
    }

    function confirmUnblacklist(_id){
        if (window.confirm("Are you sure you want to unblacklist?")) {
            /*First, swap from unblack to black on 
              front end, then patch changes to back end. 
              sync the app by checking if object on 
              front end is same as object on back end */
              async function asyncDispatch(){
                dispatch(swapToUnblacklisted({_id:_id}));
                
                /*now edit blacklist on back end & sync changes*/
                const credentials = {
                  _id : _id,
                  blacklist : false
                }
        
                const customer = await patchBlacklist(credentials);
                if(customer!=null)
                {
                    dispatch(addCustomerToUnblacklisted(customer))
                    alert('Unblacklisted');
                }
                else
                {
                    alert('Server might be out of sync with recent changes')
                }
            }
        
            asyncDispatch();
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
                                            <button className="blacklist" onClick={()=>confirmBlacklist(_id)}>Blacklist</button>
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
                                            <button className="unblacklist" onClick={()=>confirmUnblacklist(_id)}>Unblacklist</button>
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