import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVgById, clearDetail } from "../actions";


export default function VideogameDetails (props) {

    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogameDetails)
    const errors = ['Error', 'SequelizeDatabaseError'];
    console.log(props.match.params.id);

    useEffect(() => {
        dispatch(getVgById(props.match.params.id));
        return () => dispatch(clearDetail());
    },[dispatch, props.match.params.id]);
    
    if (errors.includes(videogame)) return alert('Error 404 has ocurred!');

    return (
        <>
        {videogame?
        <div className="container-details">
            <h1>{videogame.name}</h1>

            <div className="details" >
                <div className="basic-details">
                    <img src={videogame.image} />
                   
                    <h3>ID: {props.match.params.id}</h3>
                    
                    <h3>Released: <br/> {videogame.dateOfRelease}</h3>
                    
                    <h3>Rating: <br/> {videogame.rating}</h3>

                    <h3> Genres:
                        {videogame.genres? videogame.genres.map((g) => (
                            <li >{g}</li>)) : <p>No está asociado a un genero</p>
                        }

                    </h3>
                    
                    <h3>Platforms: <br/>
                        {videogame.platforms? videogame.platforms.map((p) => (
                            <span>{`${p} - `}</span>)) : <p>No está asociado a ninguna plataforma</p>
                        }
                    </h3>
                    
                   
                </div>
                <div className='details-text'>
                    <h3>DESCRIPTION
                        <br/>
                        <br/>
                        {videogame.description} </h3>
                </div>
            </div>
        </div>
        : <div className="background" >
        <div className="container" >
            <h1 className="loading" >Cargando detalles</h1>
        </div>
        </div>
        }
        </>
    );
};



