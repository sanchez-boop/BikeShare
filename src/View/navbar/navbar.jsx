import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

export default ()=>{
    return(
        <nav>
            <Link to="/" className='tab'>Home</Link>
            <Link to="/rent-out" className='tab'>Rent Out</Link>
            <Link to="/renew-return" className='tab'>Renew/Return</Link>
            <Link to="/repair" className='tab'>Repair</Link>
            <Link to="/blacklist" className='tab'>Blacklist</Link>
            <Link to="/assign-roles" className='tab'>Assign Roles</Link>
        </nav> 
    )
}