import React from 'react';
import { NavLink } from 'react-router-dom';
import './videogameCard.css';

export function VideogameCard({name, image, id, genres, rating}) {
    return (
        <div className= "card-container">
            <NavLink to= {`/videogames/${id}`}>
                <img src= {image} alt= 'img' className= "card-img" width={800} />
                <p className= "card-title" > Name: {name} </p>
                <p className='card-genres'> Genres: {genres && genres.map(g=> g + ',')}</p>
                <p className='card-rating'> Rating: {rating} </p>
                
            </NavLink>
        </div>
    )
}