
import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import { Spinner } from './components/layout/Spinner';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

import './App.css';

class App extends Component {

  state = {
    users:[],
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
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={this.state.alert}/>
        <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length>0?true:false} setAlert={this.setAlert}/>
        {this.state.loding?<Spinner/>:this.state.users.map((user,i)=><Users loading={this.state.loading} key={i} users={this.state.users}/>)}
        </div>
      </div>
    );
  }
  
}

export default App;
