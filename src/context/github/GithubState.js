import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_USER,
    GET_REPOS
 } from '../types'

 const GithubState = props => {
     const intitalState = {
         users:[],
         user:{},
         repos:[],
         loading:false
     }

     const [state,dispatch]=useReducer(GithubReducer,intitalState)

    //  Search User



    // Get User
    // Get Repos
    // Clear Users
    // Set Loading

    return <GithubContext.Provider
    value = {{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading
    }}>

{props.children}
    </GithubContext.Provider>
 }

 export default GithubState