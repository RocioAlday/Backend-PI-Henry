import { React, useEffect } from 'react';
import ErrorImage from '../../images/ErrorImage.png'
import './errorPage.css';
import { Link } from 'react-router-dom';

export default function ErrorPage() {

    return (
        <div className='errorPage-container'>
            <Link to= '/home'>
            <button className='button'>BACK TO HOME ➜</button>
            </Link>
        </div>
    );
};

