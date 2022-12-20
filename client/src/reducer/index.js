const inicialState= {
    videogames: []
}

function rootReducer(state= inicialState, action) {
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                characters: action.payload
            }
    }
}
export default rootReducer;