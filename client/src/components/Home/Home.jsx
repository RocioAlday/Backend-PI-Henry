import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../../actions';
import Paginado from '../Pagination/Pagination';
import Filters from '../Filters/Filter';
import Searchbar from '../Searchbar/Searchbar';
import ButtonCreateVg from '../ButtonCreate/ButtonCreateVg';
import "./home.css"
import Loader from '../Loader/Loader';

export default function Home() {
    const dispatch= useDispatch();
    const allVideogames= useSelector ((state)=> state.videogamesCopy); 
    let [loading, setLoading] = useState(true);

    useEffect (()=> {
      const chargeVideogames= async()=>{  
        await dispatch(getVideogames());
        setLoading(false)
      }
      chargeVideogames();
    }, [dispatch]);



    function handleClickLoad(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }



return loading? <Loader /> :
 (
    <div>
    <div className='home-container'>
        <Searchbar />
    </div>
 
    <div className='prueba'>
        <button className='load-button' onClick= {e=> {handleClickLoad(e)}}>
            Load All Videogames
        </button>
        <ButtonCreateVg />
        <div className='filters-column'> 
        <Filters />
        </div> 
    </div>
    <Paginado videogames= {allVideogames} />
    </div>
   
)    

}

