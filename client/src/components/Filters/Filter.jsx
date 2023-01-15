import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterByGenre, filterByOrigin, OrderByName, OrderByRating} from '../../actions';
import ClearFilters from '../ClearFilters/ClearFilters';
import './filter.css';

export default function Filters () {

	const dispatch = useDispatch();
	const genres = useSelector((state) => state.genres);
	const [currentPage, setCurrentPage]= useState(1);
	const [order, setOrder]= useState('');
	
    useEffect(() => {
        if(genres.length < 1){
            dispatch(getGenres())
        }
    },[dispatch, genres])

    const handleOrderByName= (e)=> {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
		setCurrentPage(1);
		setOrder(`Ordered ${e.target.value}`)
    };

	const handleOrderByRating= (e)=> {
		e.preventDefault();
        dispatch(OrderByRating(e.target.value));
		setCurrentPage(1);
		setOrder(`Ordered ${e.target.value}`)
	};

    const handleFilterByGenre= (e)=> {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
		setCurrentPage(1)
    };

    const handleFilterByOrigin= (e)=> {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
		setCurrentPage(1)
    };

    return (
        <div className='general-container'>
            <ClearFilters />
			<div>
				<select className='filters-container' name="filters" onChange={e => handleOrderByName(e)} defaultValue="default">
					<option disabled value="default">
						Order by Name...
					</option>
                    <option value="all">All Videogames</option>
					<option value="asc">Ascending</option>
					<option value="des">Descending</option>
				</select>
			</div>
			
			<div >
				<select className='filters-container' name="filters" onChange={e => handleOrderByRating(e)} defaultValue="default">
					<option disabled value="default">
						Order by Rating...
					</option>
                    <option value="all">All Videogames</option>
					<option value="high">High Rating</option>
					<option value="low">Low Rating</option>
				</select>
			</div>
            
			<div>
				<select className='filters-container' name="filters" onChange={e => handleFilterByGenre(e)} defaultValue="default">
					<option className='filters-container' disabled value="default">
						Filter by Genres...
					</option>
                    <option value="all">All Videogames</option>
					{
					genres.map((genre) => (
					<option key={genre.id} value={genre.name} >{genre.name}</option>
					))}
				</select>
			</div>

            <div >
				<select className='filters-container' name="filters" onChange={e => handleFilterByOrigin(e)} defaultValue="default">
					<option disabled value="default">
						Filter by Origin...
					</option>
					<option value="all">All Videogames</option>
					<option value="api">Videogames from API</option>
					<option value="created">Videogames from DB</option>
				</select>
			</div>

        </div>
    )
}