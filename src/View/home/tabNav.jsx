import React, {useState} from 'react';
import HomeTab from './tabs/homeTab';
import RentOutTab from './tabs/rentOutTab';
import RenewTab from './tabs/renewTab';
import BlacklistTab from './tabs/blacklistTab';
import AssignRolesTab from './tabs/assignRolesTab';
import './tabNav.css';

export default ()=>{
    const [currTab,setCurrTab] = useState(<HomeTab/>);

    return(
        <>
            <button className='tab' onClick={()=>setCurrTab(<HomeTab/>)}>Home</button>
            <button className='tab' onClick={()=>setCurrTab(<RentOutTab/>)}>Rent Out</button>
            <button className='tab' onClick={()=>setCurrTab(<RenewTab/>)}>Renew/Return</button>
            <button className='tab' onClick={()=>setCurrTab(<BlacklistTab/>)}>Blacklist</button>
            <button className='tab' onClick={()=>setCurrTab(<AssignRolesTab/>)}>Assign Roles</button>
            {currTab}
        </>
    )
}