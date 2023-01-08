import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVgById, clearDetail } from "../actions";

export default function VideogameDetails (props) {

    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogameDetails)
    console.log(videogame);

    useEffect(() => {
        dispatch(getVgById(props.match.params.id));
        return () => dispatch(clearDetail());
    },[dispatch, props.match.params.id]);
    
    
    return (

        <div className="container-details">
            <h1>{videogame[0].name}</h1>

            <div className="details" >
                <div className="basic-details">
                    <img src={videogame[0].image} />
                   
                    <h3>ID: {videogame[0].id}</h3>
                    
                    <h3>Released: <br/> {videogame[0].released}</h3>
                    
                    <h3>Rating: <br/> {videogame[0].rating}</h3>
                    
                    <h3>Platforms: <br/>{videogame[0].platforms.map(platform => platform.name + ' ')}</h3>
                    
                    <h3>Genres: <br/>{videogame[0].genres.map(genre => genre.name + ' ')}</h3>
                   
                </div>
                <div className='details-text'>
                    <h3>DESCRIPTION
                        <br/>
                        <br/>
                        {videogame[0].description} </h3>
                </div>
            </div>
        </div>
    );
};