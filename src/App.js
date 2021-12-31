import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import { Spinner } from './components/layout/Spinner';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';

import './App.css';

class App extends Component {

  state = {
    users:[],
    user:{},
    repos:[],
    loding:false,
    alert:null
}


componentDidMount(){
   this.setState({loading:true})
    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res => this.setState({users:res.data})).then(()=>this.setState({loading:false}))
}

searchUsers=(text)=>{
console.log(text)
axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res => this.setState({users:res.data.items})).then(()=>this.setState({loading:false}))
}

getUser=(userName)=>{
  this.setState({loading:true})
  axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res=>this.setState({user:res.data})).then(()=>this.setState({loading:false}))  
}

getUserRepos=(userName)=>{
  this.setState({loading:true})
  axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res=>this.setState({repos:res.data})).then(()=>this.setState({loading:false}))  
}

clearUsers=()=>{
  this.setState({users:[]})
}

setAlert=(msg,type)=>{
  this.setState({alert:{
    msg:msg,
    type:type
  }})
  setTimeout(()=>this.setState({alert:null}),3000)
}

  render(){
    return (
      <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path="/" render={props=> (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0?true:false} setAlert={this.setAlert}/>
                {this.state.loding?<Spinner/>:this.state.users.map((user,i)=><Users loading={this.state.loading} key={i} users={this.state.users}/>)}
              
              </Fragment>
            )}>
            </Route>
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" render={props=>(
              <User {...props} getUsers={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.loading}/>
            )}/>
              
           
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
  
}

export default App;
