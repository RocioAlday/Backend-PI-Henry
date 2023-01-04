import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        try{
            var json= await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: 'GET_VIDEOGAMES',  //PONER LOS TYPES EN ARCHIVO SEPARADO
                payload: json.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function getGenres(){
    return async function(dispatch) {
        try{
            var json= await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: 'GET_GENRES',
                payload: json.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function getPlatforms(){
    return async function(dispatch) {
        try {
            var json= await axios.get('http://localhost:3001/platforms');
            return dispatch({
                type: 'GET_PLATFORMS',
                payload: json.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function getVgByName(name){
    return async function(dispatch) {
        try {
            var json= await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'GET_VG_BY_NAME',
                payload: json.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function getVgById(id){
    return async function(dispatch){
        try {
            var json= await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: 'GET_VG_BY_ID',
                payload: json.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function createVideogame(payload){
    return async function(dispatch){
        try {
            var json= await axios.post('http://localhost:3001/videogames');
            return dispatch({
                type: 'POST_VIDEOGAME',
                payload: json.data
            })
        } catch(err){
            alert('Your videogame could not be created', err)
        }
    }
}

export function filterByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterByOrigin(payload){
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function OrderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

export function OrderByRating(payload){ 
    return {
        type: 'ORDER_BY_RATING',
        payload
    };
};

export function clearFilter(){
    return {
        type: 'CLEAR_FILTER'
    };
};