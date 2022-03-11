import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import GithubState from './context/github/GithubState';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';

import './App.css';

const App = ()=> {

// useEffect(async ()=>{
//   setLoading(true)
//    const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
//    setUsers(response.data)
//    setLoading(false)
// },[])

    return (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/user/:login" component={User}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
  }
  


export default App;
