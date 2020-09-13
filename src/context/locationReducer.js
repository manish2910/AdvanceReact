import {
    ADD_LOCATION,
    DELETE_LOCATION,
    UPDATE_LOCATION,
    SET_CURRENT,
    CLEAR_CURRENT
} from './types';

export default (state,action) => {
    switch(action.type){
        case ADD_LOCATION:
            return {
                ...state,
                locations:[ ...state.locations, { ...action.payload } ]
            };
        case DELETE_LOCATION:
            return {
                ...state,
                locations:state.locations.filter(location => location.id !== action.payload)
            };
        case UPDATE_LOCATION:
            return {
                ...state,
                locations: state.locations.map(location =>
                    location.id === action.payload.id ? action.payload : location
                )
            };
        case SET_CURRENT:
            return {
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current:null
            };
        default:
            return state;
    }
}