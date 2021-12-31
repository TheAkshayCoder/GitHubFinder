import React, { Fragment,Component } from 'react'
import { Spinner } from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Repos } from '../repos/Repos';
import Link from 'react-router-dom/Link';

export class User extends Component {

    componentDidMount(){
        this.props.getUsers(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    static propTypes={
        loading:PropTypes.bool,
        user:PropTypes.object.isRequired,
        getUsers:PropTypes.func.isRequired,
        repos:PropTypes.array.isRequired,
        getUserRepos:PropTypes.func.isRequired,
    }

    render() {
        const {name,company,avatar_url,location,bio,blog,login,html_url,followers,following,public_repos,public_gists,hireable}=this.props.user
        const {loading}=this.props;
        if (loading) return <Spinner/>
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                </Link>Available to hire : {' '}
                {hireable?<span style={{color:"green",fontWeight:700}}>Yes</span>:<span style={{color:"red",fontWeight:700}}>No</span>}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' style={{width:'150px'}} />
                        <h1>{name}</h1>
                        <p>Location : {location}</p>
                    </div>
                    <div>
                        {bio&&<Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                            </Fragment>}
                        <a href={html_url} className='my-1 btn btn-dark'>Visit Github Profile</a>
                        <ul>
                            <li>
                                {login&&<Fragment>
                                    <b>Username</b>: {login}
                                    </Fragment>}
                            </li>
                            <li>
                                {company&&<Fragment>
                                    <b>Company</b>: {company}
                                    </Fragment>}
                            </li>
                            <li>
                                {blog&&<Fragment>
                                    <b>Website</b>: {blog}
                                    </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-light'>
                        Followers : {followers}
                    </div>
                    <div className='badge badge-success'>
                        Following : {following}
                    </div>
                    <div className='badge badge-danger'>
                        Public Repos : {public_repos}
                    </div>
                    <div className='badge badge-dark'>
                        Public Gists : {public_gists}
                    </div>
                </div>
                <Repos repos={this.props.repos}/>
            </Fragment>
        )
    }
}

export default User
