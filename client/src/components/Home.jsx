import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import {Link} from 'react-router-dom';

export default function Home() {
    const dispatch= useDispatch();
    const allVideogames= useSelector ((state)=> state.videogames)

    useEffect (()=> {
        dispatch(getVideogames());
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

return (
    <div>
        <Link to= '/videogame'>Crear Videojuego</Link>
        <button onClick= {e=> {handleClick(e)}}>
            Cargar todos los personajes
        </button>
        <div>
            <select>
                <option value= 'asc'>Ascendente</option>   {/*si o si necesito ponerle el value para poder después hacer la lógica! */}
                <option value= 'desc'>Descendente</option>
            </select>
        </div>
    </div>
)    

}
