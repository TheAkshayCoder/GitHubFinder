import React, { Component } from 'react'
import UserItems from './UserItems'
import axios from 'axios'
// import { Spinner } from '../layout/Spinner.js'

export default class Users extends Component {
    state = {
        users:[],
        loding:false
    }
    
    
   componentDidMount(){
       this.setState({loading:true})
        axios.get('https://api.github.com/users').then(res => this.setState({users:res.data})).then(()=>this.setState({loading:false}))
    }
    
    


    render() {
        return (
            <div style={userStyle}>
                {this.state.loding?'loading...':this.state.users.map((user,i)=><UserItems key={i} user={user}/>)}
            </div>
        )
    }
}

const userStyle = {
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
}