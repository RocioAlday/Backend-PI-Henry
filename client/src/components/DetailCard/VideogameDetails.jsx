import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVgById, clearDetail} from "../../actions/index";
import './videogameDetails.css';
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";


export default function VideogameDetails (props) {

    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogameDetails)

    console.log(props.match.params.id);

    useEffect(() => {
        dispatch(getVgById(props.match.params.id));
        return () => dispatch(clearDetail());
    },[dispatch, props.match.params.id]);
    
    if (videogame.length<1){
        return <Loader />
    } else {
    
    return (
        <>
     
        <div className="container-details">
            <h1 id="detailName">{videogame.name}</h1>

     
                <div className="basic-details">
                    <img src={videogame.image} />
                   <div className="detail-data">
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
                <div className='container-description'>
                    <h3>DESCRIPTION
                        <br/>
                        <br/>
                        {videogame.description && videogame.description.replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br />', "\n")}
                    </h3>
                </div>
                </div>
            
          

            <Link to= '/home'>
            <button className="back-button">🡄 GO BACK</button>
            </Link>
        </div>
       
        
        
        </>
    );
    }
};




