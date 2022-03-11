import React, {useContext} from 'react'
import UserItems from './UserItems'
// import axios from 'axios'
import { Spinner } from '../layout/Spinner.js'
import GithubContext from '../../context/github/githubContext'


 const Users = () => {
     const githubContext = useContext(GithubContext)
    if (githubContext.loading){
        return <Spinner/>
    }else{
        return (
            <div style={userStyle}>
                {githubContext.users.map((user,i)=><UserItems key={i} user={user}/>)}
            </div>
        )
    }
    
}


const userStyle = {
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
}

export default Users