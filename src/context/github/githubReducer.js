import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_USER,
    GET_REPOS
 } from '../types'

 export default (state,action)=>{
     switch (action.type) {
         case SET_LOADING:
             return {
                 ...state,
                 loading:true
             };
        case SEARCH_USER:
            return {
                ...state,
                users:action.payload,
                loading:false
            }
     
         default:
             return state;
     }
 }