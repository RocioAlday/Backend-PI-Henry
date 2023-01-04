const inicialState= {
    videogames: [],   //acá están TODOS los videojuegos que llegan del back
    videogamesCopy: [],   //para el ordenamiento tengo esta copia del estado, es lo que se encuentra renderizado en el páginado
    genres: [],
    platforms: [],
    videogameDetails : [],
}

function rootReducer(state= inicialState, action) {
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            }
        
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        
        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }
        
        case 'GET_VG_BY_NAME':
            return {
                ...state,
                searchVideogame: action.payload,
                searchVideogameCopy: action.payload
            }
        
        case 'GET_VG_BY_ID':
            return {
                ...state,
                videogameDetails: action.payload
            }
        case 'POST_VIDEOGAME':
            return {
                ...state,
            }

        case 'FILTER_BY_GENRE':
            const genre= action.payload.toLowerCase();
            console.log(genre);
            let filterByGenre= [];

            if(genre === 'all'){
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                }
            } else {
            for(let i=0; i<state.videogames.length; i++){
                const videogame= state.videogames[i];
                //ahora recorro todos los generos de ese videojuego
                for(let j=0; j<videogame.genres.length; j++){
                    if(videogame.genres[j].name.toLowerCase().includes(genre)){
                        filterByGenre.push(videogame);
                        break
                    }
                }
            }
            
            return {
                ...state,
                videogamesCopy: filterByGenre,
            }
            }


            case 'ORDER_BY_NAME':
            const order = action.payload;
            let orderName;

            if (order === 'all') {
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                }
            }

            if (order === 'asc') {
                orderName = [...state.videogames].sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (order === 'des') {
                orderName = [...state.videogames].sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                videogamesCopy: orderName,
            }


            case 'CLEAR_FILTER':
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }

        default:
            return state;
    }
}
export default rootReducer;