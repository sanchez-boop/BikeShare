import React, {useState} from 'react';
import TabNav from './tabNav';
import './homeScreen.css'
import logo from '../../Images/bikengold.png'

export default ()=>{

    return(
        <>
            <div className="logoBackground">
                <img className="logo" src={logo} alt="image error"/>
                BikeN'Gold
            </div>
            <TabNav/>
        </>
    )
}