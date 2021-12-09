import React from 'react'
import UserItems from './UserItems'
// import axios from 'axios'
import { Spinner } from '../layout/Spinner.js'
import PropTypes from 'prop-types'


 const Users = (props) => {
    if (props.loading){
        return <Spinner/>
    }else{
        return (
            <div style={userStyle}>
                {props.users.map((user,i)=><UserItems key={i} user={user}/>)}
            </div>
        )
    }
    
}

Users.prototype = {
    users:PropTypes.array.isRequired,
    loading:PropTypes.bool.isRequired,
}

const userStyle = {
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
}

export default Users