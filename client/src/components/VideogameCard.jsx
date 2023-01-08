import React from 'react';
import { NavLink } from 'react-router-dom';

export function VideogameCard({name, image, id, genres, rating}) {
    return (
        <div className= "card-container">
            <NavLink to= {`/videogames/${id}`}>
                <div className= "card">
                    <img src= {image} alt= 'img' className= "card-img" width={800} />
                    <div className='card-details'>
                        <p className= "card-title" > Name: {name} </p>
                        <p className='card-body'> Genres: {genres && genres.map(g=> g + ',')}</p>
                        <p className='card-rating'> Rating: {rating} </p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}