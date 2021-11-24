import React from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assignRolesTab.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAssign,editRole,addCustomerToUnblacklisted } from '../../../Model/customersSlice';
import { patchRole } from '../../../Controller/patchRole';

export default ()=>{
    const {customers} = useSelector(state=>state);
    const dispatch = useDispatch();

    function toggle(_id){
        dispatch(toggleAssign({_id:_id}))
    }

    function confirmAssign(_id,name,role){
        if (window.confirm(`Are you sure you want to assign ${name} as ${role}?`)) {
            /*First, edit role on front end, then patch 
              changes to back end. sync the app by adding
              the returned object to unblacklisted*/
            async function asyncDispatch(){
                const credentials = {
                    _id : _id,
                    role : role
                }
                dispatch(editRole(credentials));
                
                /*now edit role on back end & sync changes*/
                const customer = await patchRole(credentials);
                if(customer!=null)
                {
                    dispatch(addCustomerToUnblacklisted(customer))
                    alert(`Assigned ${name} as ${role}`);
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
                            <tr onClick={()=>toggle(_id)}>
                                <td>{customers.unblacklisted[_id]['name']}</td>
                                <td>{customers.unblacklisted[_id]['phone']}</td>
                                <td>{customers.unblacklisted[_id]['email']}</td>
                                <td>
                                    {customers.unblacklisted[_id]['waiver']?'true':'false'}
                                    {customers.unblacklisted[_id]['assignClicked'] && 
                                        <>
                                            {/*Make sure the button shown isn't the worker's current role*/}
                                            {customers.unblacklisted[_id]['role']!='admin' &&
                                                <button className="renew" onClick={()=>confirmAssign(_id,customers.unblacklisted[_id]['name'],'admin')}>ADMIN</button>
                                            }
                                            {customers.unblacklisted[_id]['role']!='worker' &&
                                                <button className="renew" onClick={()=>confirmAssign(_id,customers.unblacklisted[_id]['name'],'worker')}>WORKER</button>
                                            }
                                            {customers.unblacklisted[_id]['role']!='customer' &&
                                                <button className="renew" onClick={()=>confirmAssign(_id,customers.unblacklisted[_id]['name'],'customer')}>CUSTOMER</button>
                                            }
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