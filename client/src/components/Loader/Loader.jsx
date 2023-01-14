import { React } from 'react';
import loader from '../../images/loader.gif';
import './loader.css';

export default function Loader() {
    return (
        <div className='loader-container'>
            <img src={loader} alt='loader image'/>
        </div>
    );
};