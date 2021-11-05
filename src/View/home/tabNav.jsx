import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import HomeTab from './tabs/homeTab';
import RentOutTab from './tabs/rentOutTab';
import RenewTab from './tabs/renewTab';
import BlacklistTab from './tabs/blacklistTab';
import AssignRolesTab from './tabs/assignRolesTab';
import './tabNav.css';

export default ()=>{
    const [currTab,setCurrTab] = useState(<HomeTab/>);
    const {acc} = useSelector(state=>state);

    return(
        <>
            <div classname="background">
                <button className='tab' onClick={()=>setCurrTab(<HomeTab/>)}>Home</button>
                <button className='tab' onClick={()=>setCurrTab(<RentOutTab/>)}>Rent Out</button>
                <button className='tab' onClick={()=>setCurrTab(<RenewTab/>)}>Renew/Return</button>
                <button className='tab' onClick={()=>setCurrTab(<BlacklistTab/>)}>Blacklist</button>
                {
                    acc.role=='admin' && 
                    <button className='tab' onClick={()=>setCurrTab(<AssignRolesTab/>)}>Assign Roles</button>
                }
            </div>
            {currTab}
        </>
    )
}