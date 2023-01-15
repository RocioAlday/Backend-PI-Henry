import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVgByName, clearSearch, clearFilter } from "../../actions";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";
import Filters from "../Filters/Filter";
import './searchResults.css';
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import { clearErrorMessage } from "../../actions";
import { Link } from "react-router-dom";

export default function SearchResults() {
    const { name }= useParams();
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.searchVideogame);
	const searchedVideogames = useSelector((state) => state.searchVideogameCopy);
    const errorMessage= useSelector((state)=> state.errorMessage);
   console.log(errorMessage);
	useEffect(() => {
        dispatch(clearFilter());
        dispatch(getVgByName(name));
        
        return () => { 
            dispatch(clearSearch());
            dispatch(clearErrorMessage()) 
        }
	}, [dispatch, name]);

    if (!searchedVideogames.length && !errorMessage.message){
      return <Loader />
    } 
    if (errorMessage.message=== 'Videogame not found'){
    return <ErrorPage />;
    }
  
    return (
        <div>
            <div className='container-home' >
                <Searchbar />
            </div>
            
            <Filters />
            <Link to= '/home'>
                <button className="back-button">🡄 GO BACK</button>
            </Link>
            <Pagination videogames={searchedVideogames} />

        </div>
    );
};