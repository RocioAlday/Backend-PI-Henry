const inicialState= {
    videogames: [],   // lo que se renderiza siempre
    videogamesCopy: [],   //acá están TODOS los videojuegos que llegan del back para el ordenamiento tengo esta copia del estado, no se renderiza
    searchVideogame: [],
    searchVideogameCopy: [],
    videogameDetails : [],
    genres: [],
    platforms: [],
}

function rootReducer(state= inicialState, action) {
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            };
           
        
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
            let filterByGenreSearch= [];

            if(genre === 'all'){
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }
            } else {
            
                filterByGenre= state.videogames.filter(vg => vg.genres.map(data => data.toLowerCase()).includes(genre));
                //console.log(filterByGenre);
                filterByGenreSearch= state.searchVideogame.filter(vg=> vg.genres.map(data=> data.toLowerCase()).includes(genre));
                
                return{
                    ...state,
                    videogamesCopy: filterByGenre,
                    searchVideogameCopy: filterByGenreSearch,
                }
            }


            case 'ORDER_BY_NAME':
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
                orderNameSearch = [...state.searchVideogame].sort(function(a, b) {
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
                orderNameSearch = [...state.searchVideogame].sort(function(a, b) {
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
                orderName= [...state.videogames].sort(function(a, b) {
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

            case 'FILTER_BY_ORIGIN':
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
                filterOrigin= state.videogames.filter(vg => !vg.createdInDb);
                filterOriginSearch= state.searchVideogame.filter(vg=> !vg.createdInDb)
                } else{
                    filterOrigin = state.videogames.filter(vg => vg.createdInDb);
                    filterOriginSearch= state.searchVideogame.filter(vg => vg.createdInDb)
                }
            
            return {
                ...state,
                videogamesCopy: filterOrigin,
                searchVideogameCopy: filterOriginSearch
                };

            case 'ORDER_BY_RATING':
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
                    orderRatingSearch = [...state.searchVideogame].sort(function(a, b) {
                        return a.rating - b.rating
                    })
                    orderRating = [...state.videogames].sort(function(a, b) {
                        return a.rating - b.rating
                    })
                }
                if (rating === 'high') {
                    orderRatingSearch = [...state.searchVideogame].sort(function(a, b) {
                        return b.rating - a.rating
                    })
                    orderRating = [...state.videogames].sort(function(a, b) {
                        return b.rating - a.rating
                    })
                }
                return {
                    ...state,
                    searchVideogameCopy: orderRatingSearch,
                    videogamesCopy: orderRating,
                };

            case 'CLEAR_FILTER':
                return {
                    ...state,
                    videogamesCopy: state.videogames,
                    searchVideogameCopy: state.searchVideogame
                }
            case 'CLEAR_DETAIL':
                return {
                    ...state,
                    videogameDetails: [],
                }
        
            case 'CLEAR_SEARCH':
                return {
                    ...state,
                    searchVideogame: [],
                    searchVideogameCopy: [],
                }
        default:
            return state;
    }
}
export default rootReducer;