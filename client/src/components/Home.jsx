import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import {Link} from 'react-router-dom';
import Paginado from './Paginado';
import Filters from './Filter';
import Searchbar from './Searchbar';
import ButtonCreateVg from './ButtonCreateVg';

export default function Home() {
    const dispatch= useDispatch();
    const allVideogames= useSelector ((state)=> state.videogamesCopy); 

    useEffect (()=> {
        dispatch(getVideogames());
        // if(genres.length < 1){
        //     dispatch(getGenres())
        // }
    }, [dispatch])


    function handleClickLoad(e) {
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
        <button onClick= {e=> {handleClickLoad(e)}}>
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
    <ButtonCreateVg />
    <Searchbar />
    <Paginado videogames= {allVideogames} />
   
    </div>
)    

}

