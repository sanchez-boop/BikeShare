import React, {useState} from 'react';
import HomeTab from '../tabs/homeTab';
import './tabNav.css';

export default ()=>{
    const [currTab,setCurrTab] = useState(<HomeTab/>);

    return(
        <>
            <button className='tab' onClick={()=>setCurrTab(<HomeTab/>)}>Home</button>
            <button className='tab' onClick={()=>alert('not implemented')}>Rent Out</button>
            <button className='tab' onClick={()=>alert('not implemented')}>Renew/Return</button>
            <button className='tab' onClick={()=>alert('not implemented')}>Blacklist</button>
            <button className='tab' onClick={()=>alert('not implemented')}>Assign Roles</button>
            {currTab}
        </>
    )
}