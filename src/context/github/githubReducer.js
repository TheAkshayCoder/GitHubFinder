import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_USER,
    GET_REPOS,
    SET_ALERT,
    REMOVE_ALERT
 } from '../types'

 const reducer = (state,action)=>{
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
        case CLEAR_USER:
            return {
                ...state,
                users:[],
                loading:false
            }
        case GET_USER:
            return {
                ...state,
                user:action.payload,
                loading:false
            }
        case GET_REPOS:
            return {
                ...state,
                repos:action.payload,
                loading:false
            }
        case SET_ALERT:
            return {
                ...state,
                alert:action.payload,
                loading:false
            }
        case REMOVE_ALERT:
            return{
                ...state,
                alert:null
            }
         default:
             return state;
     }
 }

 export default reducer