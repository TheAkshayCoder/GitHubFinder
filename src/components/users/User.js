import React, { Fragment,Component } from 'react'
import { Spinner } from '../layout/Spinner';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

export class User extends Component {

    componentDidMount(){
        this.props.getUsers(this.props.match.params.login);
    }

    static propTypes={
        loading:PropTypes.bool,
        user:PropTypes.object.isRequired,
        getUsers:PropTypes.func.isRequired
    }

    render() {
        const {name,avatar_url,location,bio,blog,login,html_url,followers,following,public_repos,public_gists,hireable}=this.props.user
        const {loading}=this.props;
        if (loading) return <Spinner/>
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                </Link>Available to hire : {' '}
                {hireable?<span style={{color:"green",fontWeight:700}}>Yes</span>:<span style={{color:"red",fontWeight:700}}>No</span>}
            </Fragment>
        )
    }
}

export default User
