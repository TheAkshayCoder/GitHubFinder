import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USER,
    SET_LOADING,
    CLEAR_USER,
    GET_USER,
    GET_REPOS,
    SET_ALERT,
    REMOVE_ALERT
 } from '../types'

 let githubClientId;
 let githubClientSecret;

 if (process.env.NODE_ENV!=='production'){
     githubClientId=process.env.REACT_APP_GITHUB_CLIENT_ID;
     githubClientSecret=process.env.REACT_APP_GITHUB_CLIENT_SECRET;
 }else{
    githubClientId=process.env.GITHUB_CLIENT_ID;
    githubClientSecret=process.env.GITHUB_CLIENT_SECRET;
 }

 const GithubState = props => {
     const intitalState = {
         users:[],
         user:{},
         repos:[],
         loading:false,
         alert:null
     }

     const [state,dispatch]=useReducer(GithubReducer,intitalState)

    //  Set alert
    const setAlert=(msg,type)=>{
        dispatch({
            type:SET_ALERT,
            payload:{
                msg:msg,
                type:type
            }})
        setTimeout(()=>dispatch({type:REMOVE_ALERT}),3000)
      }

    //  Search User
    const searchUsers=async (text)=>{
        setLoading()
        console.log(text)
       const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

        dispatch({type:SEARCH_USER,payload:res.data.items})
        }


    // Get User
    const getUser=async (userName)=>{
        setLoading()
      const res =   await axios.get(`https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)

        dispatch({
            type:GET_USER,
            payload:res.data
        })

      }


    // Get Repos
    const getUserRepos=async (userName)=>{
        setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
      }

    // Clear Users
    const clearUsers=()=>dispatch({type:CLEAR_USER})
      
    // Set Loading

    const setLoading=()=>dispatch({type:SET_LOADING});

    return <GithubContext.Provider
    value = {{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        alert:state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        setAlert
    }}>

{props.children}
    </GithubContext.Provider>
 }

 export default GithubState