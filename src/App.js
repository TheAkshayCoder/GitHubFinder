import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import React, {Component, Fragment, useEffect, useState} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import { Spinner } from './components/layout/Spinner';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import GithubState from './context/github/GithubState';

import './App.css';

const App = ()=> {

  const [users,setUsers] = useState([])
  const [user,setUser] = useState({})
  const [repos,setRepos] = useState([])
  const [loading,setLoading] = useState(false)
  const [alert,setAlert] = useState(null)


useEffect(async ()=>{
  setLoading(true)
   const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
   setUsers(response.data)
   setLoading(false)
},[])


const searchUsers=(text)=>{
console.log(text)
axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res => setUsers(res.data.items)).then(()=>setLoading(false))
}

const getUser=(userName)=>{
  setLoading(true)
  axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res=>setUser(res.data)).then(()=>setLoading(false))  
}

const getUserRepos=(userName)=>{
  setLoading(true)
  axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res=>setRepos(res.data)).then(()=>setLoading(false))  
}

const clearUsers=()=>{
  setUsers([])
}

const setAlertFun=(msg,type)=>{
  setAlert({
    msg:msg,
    type:type
  })
  setTimeout(()=>setAlert(null),3000)
}

  
    return (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path="/" render={props=> (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length>0?true:false} setAlert={setAlertFun}/>
                {loading?<Spinner/>:users.map((user,i)=><Users loading={loading} key={i} users={users}/>)}
              
              </Fragment>
            )}>
            </Route>
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props=>(
              <User {...props} getUsers={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading}/>
            )}/>
              
           
          </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
  }
  


export default App;
