
import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import { Spinner } from './components/layout/Spinner';

import './App.css';

class App extends Component() {
  render(){
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
        <Spinner/>
        <Users/>
        </div>
      </div>
    );
  }
  
}

export default App;
