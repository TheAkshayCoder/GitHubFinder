
import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import { Spinner } from './components/layout/Spinner';
import axios from 'axios';
import Search from './components/users/Search';

import './App.css';

class App extends Component {

  state = {
    users:[],
    loding:false
}


componentDidMount(){
   this.setState({loading:true})
    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res => this.setState({users:res.data})).then(()=>this.setState({loading:false}))
}

searchUsers=(text)=>{
console.log(text)
axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res => this.setState({users:res.data.items})).then(()=>this.setState({loading:false}))
}

clearUsers=()=>{
  this.setState({users:[]})
}

  render(){
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
        <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0?true:false}/>
        {this.state.loding?<Spinner/>:this.state.users.map((user,i)=><Users loading={this.state.loading} key={i} users={this.state.users}/>)}
        </div>
      </div>
    );
  }
  
}

export default App;
