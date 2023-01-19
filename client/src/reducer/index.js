import {GET_VIDEOGAMES, GET_GENRES, GET_PLATFORMS, GET_VG_BY_NAME, ERROR_MESSAGE, GET_VG_BY_ID, POST_VIDEOGAME,
    FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING, CLEAR_FILTER, CLEAR_DETAIL, CLEAR_SEARCH,
    CLEAR_ERR_MSG} from '../actions/actionsTypes';

const inicialState= {
    videogames: [],   // guardo todos los vg q traigo desde mi back
    videogamesCopy: [],   //acá se van guardando los videojuegos que filtro/ordeno 
    searchVideogame: [],
    searchVideogameCopy: [],
    videogameDetails : [],
    genres: [],
    platforms: [],
    errorMessage: {}
}

function rootReducer(state= inicialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            };
           
        
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        
        case GET_VG_BY_NAME:
            return {
                ...state,
                searchVideogame: action.payload,
                searchVideogameCopy: action.payload
            }
        
        case GET_VG_BY_ID:
            console.log(action.payload);
            return {
                ...state,
                videogameDetails: action.payload
            }
            
        case POST_VIDEOGAME:
            return {
                ...state,
            }

        case FILTER_BY_GENRE:
            const genre= action.payload.toLowerCase();
            console.log(genre);
            let filterByGenre= [];
            let filterByGenreSearch= [];

            if(genre === 'all'){
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }
            } else {
            
                filterByGenre= state.videogamesCopy.filter(vg => vg.genres.map(data => data.toLowerCase()).includes(genre));
                //console.log(filterByGenre);     
                filterByGenreSearch= state.searchVideogameCopy.filter(vg=> vg.genres.map(data=> data.toLowerCase()).includes(genre));
                
                return{
                    ...state,
                    videogamesCopy: filterByGenre,
                    searchVideogameCopy: filterByGenreSearch,
                }
            }


            case ORDER_BY_NAME:
            const order = action.payload;
            let orderName;
            let orderNameSearch;

            if (order === 'all') {
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }
            }

            if (order === 'asc') {
                orderNameSearch = [...state.searchVideogameCopy].sort(function(a, b) {
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
                orderNameSearch = [...state.searchVideogameCopy].sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (order === 'asc') {
                orderName = [...state.videogamesCopy].sort(function(a, b) {
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
                orderName= [...state.videogamesCopy].sort(function(a, b) {
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
                searchVideogameCopy: orderNameSearch,
                videogamesCopy: orderName,
            }

            case FILTER_BY_ORIGIN:
            const origin = action.payload;
            let filterOrigin;
            let filterOriginSearch;

            if (origin === 'all') {
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }
            }

            if(origin === 'api'){
                filterOrigin= state.videogamesCopy.filter(vg => vg.createdInDb === undefined);
                
                filterOriginSearch= state.searchVideogameCopy.filter(vg=> vg.createdInDb === undefined)
                } else if (origin === 'created'){
                    filterOrigin = state.videogamesCopy.filter(vg => vg.createdInDb === true);
                    
                    filterOriginSearch= state.searchVideogameCopy.filter(vg => vg.createdInDb === true)
                }
            
            return {
                ...state,
                videogamesCopy: filterOrigin,
                searchVideogameCopy: filterOriginSearch
                };

            case ORDER_BY_RATING:
                const rating = action.payload;
                let orderRating;
                let orderRatingSearch;
        
                if (rating === 'all') {
                    return {
                        ...state,
                        videogamesCopy: state.videogames,
                        searchVideogameCopy: state.searchVideogame
                    }
                }
        
                if (rating === 'low') {
                    orderRatingSearch = [...state.searchVideogameCopy].sort(function(a, b) {
                        return a.rating - b.rating
                    })
                    orderRating = [...state.videogamesCopy].sort(function(a, b) {
                        return a.rating - b.rating
                    })
                }
                if (rating === 'high') {
                    orderRatingSearch = [...state.searchVideogameCopy].sort(function(a, b) {
                        return b.rating - a.rating
                    })
                    orderRating = [...state.videogamesCopy].sort(function(a, b) {
                        return b.rating - a.rating
                    })
                }
                return {
                    ...state,
                    searchVideogameCopy: orderRatingSearch,
                    videogamesCopy: orderRating,
                };

            case CLEAR_FILTER:
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }
            case CLEAR_DETAIL:
                return {
                    ...state,
                    videogameDetails: [],
                }
        
            case CLEAR_SEARCH:
                return {
                    ...state,
                    searchVideogame: [],
                    searchVideogameCopy: [],
                }
            
            case ERROR_MESSAGE:
                console.log(action.payload);
            return {
                ...state,
                errorMessage: action.payload,
            };

            case CLEAR_ERR_MSG:
                return {
                    ...state,
                    errorMessage: {}
                }

        default:
            return state;
    }
}
export default rootReducer;