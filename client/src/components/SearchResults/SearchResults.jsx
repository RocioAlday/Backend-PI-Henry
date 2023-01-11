import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVgByName, clearSearch, clearFilter } from "../../actions";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";
import Filters from "../Filters/Filter";
import './searchResults.css';
import Loader from "../Loader/Loader";


export default function SearchResults() {
    const { name }= useParams();
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.searchVideogame);
	const searchedVideogames = useSelector((state) => state.searchVideogameCopy);
   
	useEffect(() => {
        dispatch(clearFilter());
        dispatch(getVgByName(name));
        
        return () => { dispatch(clearSearch()) }
	}, [dispatch, name]);

    if (!searchedVideogames.length){
      return <Loader />
    }

    return (
        <div>
            <div className='container-home' >
                <Searchbar />
            </div>
            
            <Filters />

            <Pagination videogames={searchedVideogames} />

        </div>
    );
};