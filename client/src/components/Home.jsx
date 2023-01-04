import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import {Link} from 'react-router-dom';
// import { getGenres } from '../actions';
// import { filterByGenre } from '../actions';
import Paginado from './Paginado';
import Filters from './Filter';

export default function Home() {
    const dispatch= useDispatch();
    const allVideogames= useSelector ((state)=> state.videogamesCopy); 
    // const genres = useSelector((state) => state.genres);
    

    useEffect (()=> {
        dispatch(getVideogames());
        // if(genres.length < 1){
        //     dispatch(getGenres())
        // }
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    // function handleFilterGenre(e) {
    //     e.preventDefault();
    //     dispatch(filterByGenre(e.target.value));
    //     setCurrentPage(1)
    // };

return (
    <div>
        <Link to= '/videogame'>Create Videogame</Link>
        <br></br>
        <button onClick= {e=> {handleClick(e)}}>
            Load all videogames
        </button>
    
       
    
	{/* <div className="card-render">
			 {currentVideogames.map(v =>  <VideogameCard
						key={v.id}
						id={v.id}
						name={v.name}
						genres={v.genres }
						image= {v.image ? v.image : v.image = 'https://png.pngtree.com/thumb_back/fh260/background/20201013/pngtree-gameover-electric-sound-wind-game-video-game-background-map-image_412537.jpg'}
						rating= {v.rating}  //no me lo renderiza , verrrr
             />)}
    </div> */}
    <Filters />
    <Paginado videogames= {allVideogames} />
    </div>
)    

}

// PRIMERA FORMA QUE HICE PARA EL FILTRO DE GENEROS, NO ME FUNCIONÓ - VER
{/* <div>
<select>
    <option value= 'asc'>Ascending</option>   *si o si necesito ponerle el value para poder después hacer la lógica! 
    <option value= 'desc'>Descending</option>
</select>
</div>
<div >
<select onChange={e => handleFilterGenre(e)} defaultValue="default">
    <option className='filters-container' disabled value="default">
        Filter by Genres...
    </option>
    <option value="all">All Videogames</option>
    {
    genres.map((genre) => (
    <option key={genre.id} value={genre.name} >{genre.name}</option>
    ))}
</select>
</div> */}