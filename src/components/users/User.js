import React, { useEffect,Fragment,useContext } from 'react'
import { Spinner } from '../layout/Spinner';
import { Repos } from '../repos/Repos';
import Link from 'react-router-dom/Link';
import GithubContext from '../../context/github/githubContext';

const User =({match,repos})=> {
const githubContext = useContext(GithubContext)
    useEffect(()=>{
        githubContext.getUser(match.params.login);
        githubContext.getUserRepos(match.params.login);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

        const {name,company,avatar_url,location,bio,blog,login,html_url,followers,following,public_repos,public_gists,hireable}=githubContext.user
        if (githubContext.loading) return <Spinner/>
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                </Link>Available to hire : {' '}
                {hireable?<span style={{color:"green",fontWeight:700}}>Yes</span>:<span style={{color:"red",fontWeight:700}}>No</span>}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} alt="img" className='round-img' style={{width:'150px'}} />
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
                <Repos repos={repos}/>
            </Fragment>
        )
    }


export default User
