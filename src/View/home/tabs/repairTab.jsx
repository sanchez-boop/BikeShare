import React from 'react';
import { Table , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './repairTab.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleRepair } from '../../../Model/customersSlice';

export default ()=>{
    const {customers} = useSelector(state=>state);
    const dispatch = useDispatch();

    function toggle(_id){
        dispatch(toggleRepair({_id:_id}))
    }

    function confirmRepair(_id,customer){
        /*Use prompt to add bike model and notes. 
          Post new repair with bike model, notes and 
          customer info to API. Update redux state*/
        const bikeModel = prompt('Add bike model for this repair')
        const notes = prompt('Add notes for this repair');
        const repair = {
            bikeModel : bikeModel,
            notes : notes,
            status : 'IN-SHOP',
            name : customer.name,
            email : customer.email,
            phone : customer.phone
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
                                    {customers.unblacklisted[_id]['repairClicked'] && 
                                        <>
                                            <button className="renew" onClick={()=>confirmRepair(_id,customers.unblacklisted[_id])}>REPAIR</button>
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