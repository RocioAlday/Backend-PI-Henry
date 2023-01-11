import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css'

export default function LandingPage(){
    return (
        <div class= "containerLanding">
            <h1 class= "h1">
              Welcome to Videogames World!
            </h1>
            {/* <div class= "loader"></div> */}
            <Link to= "/home" className='homeLink'> Get Into ! </Link>
        </div>
    )
}