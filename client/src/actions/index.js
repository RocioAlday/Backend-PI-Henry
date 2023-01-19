import axios from 'axios';
import {GET_VIDEOGAMES, GET_GENRES, GET_PLATFORMS, GET_VG_BY_NAME, ERROR_MESSAGE, GET_VG_BY_ID, POST_VIDEOGAME,
 FILTER_BY_GENRE, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_RATING, CLEAR_FILTER, CLEAR_DETAIL, CLEAR_SEARCH,
 CLEAR_ERR_MSG} from '../actions/actionsTypes';

export function getVideogames(){
    return async function(dispatch){
        try{
            var json= await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: GET_VIDEOGAMES,  
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
                type: GET_GENRES,
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
                type: GET_PLATFORMS,
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
                type: GET_VG_BY_NAME,
                payload: json.data
            })
        } catch(err){
            console.log(err);
            return dispatch({
                type: ERROR_MESSAGE,
                payload: err.response.data,
            })
        }
    }
}

export function getVgById(id){
    return async function(dispatch){
        try {
            var json= await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_VG_BY_ID,
                payload: json.data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function createVideogame(payload){
    return function (dispatch) {
        return fetch ('http://localhost:3001/videogames', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then (response => response.json())
        .then (newGame => dispatch({type: POST_VIDEOGAME, payload: newGame}))
        .catch (error => alert ('Your videogame could not be created', error.message));
    };

        // return async function(dispatch){
    //     try {
    //         var json= await axios.post('http://localhost:3001/videogames');
    //         return dispatch({
    //             type: 'POST_VIDEOGAME',
    //             payload: json.data
    //         })
    //     } catch(err){
    //         alert('Your videogame could not be created', err)
    //     }
    // }
}

export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function OrderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export function OrderByRating(payload){ 
    return {
        type: ORDER_BY_RATING,
        payload
    };
};

export function clearFilter(){
    return {
        type: CLEAR_FILTER
    };
};

export function clearDetail(){
    return {
        type: CLEAR_DETAIL
    };
};

export function clearSearch(){
    return {
        type: CLEAR_SEARCH
    };
};

export function clearErrorMessage(){
    return {
        type: CLEAR_ERR_MSG
    }
}