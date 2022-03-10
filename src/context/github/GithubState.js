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
    const searchUsers=async (text)=>{
        setLoading()
        console.log(text)
       const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({type:SEARCH_USER,payload:res.data.items})
        }


    // Get User
    // Get Repos
    // Clear Users
    // Set Loading

    const setLoading=()=>dispatch({type:SET_LOADING});

    return <GithubContext.Provider
    value = {{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        searchUsers
    }}>

{props.children}
    </GithubContext.Provider>
 }

 export default GithubState