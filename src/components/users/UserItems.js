import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';


 const UserItems = (props) => {
    // constructor(){
    //     super()
    //     this.state={
    //         id:'id',
    //         login:'mojombo',
    //         avatar_url:'https://avatars.githubusercontent.com/u/1?v=4',
    //         html_url:'https://github.com/mojombo'
    //     }
    // }
    
        const {login, avatar_url}=props.user
        return (
            <div className="card text-center">
                <img src={avatar_url} alt='' className='round-img' style={{width:'60px'}}/>
                <h3>{login}</h3>
                <div>
                    <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>More</Link>
                </div>
            </div>
        )
    
}

UserItems.prototype={
    user:PropTypes.array.isRequired,
}


export default UserItems