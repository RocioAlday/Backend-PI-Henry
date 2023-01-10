import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVgByName, clearSearch, clearFilter } from "../actions";
import Pagination from "./Paginado";
import Searchbar from "./Searchbar";
import Filters from "./Filter";


export default function SearchResults() {
    const { name }= useParams();
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.searchVideogame);
	const searchedVideogames = useSelector((state) => state.searchVideogameCopy);
    const [currentPage, setCurrentPage] = useState(1);
    const errors = ['Error', 'SequelizeDatabaseError'];


	useEffect(() => {
        dispatch(clearFilter())
        setCurrentPage(1)
		dispatch(getVgByName(name));
        return () => { dispatch(clearSearch()) }
	}, [dispatch, name]);


    if (errors.includes(searchedVideogames)){
        return alert('404 ERROR HAS OCURRED')
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