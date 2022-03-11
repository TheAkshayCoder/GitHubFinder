import React,{useContext} from 'react'
import GithubContext from '../../context/github/githubContext'

const Alert=()=> {
    const githubContext = useContext(GithubContext)
    return (
    githubContext.alert!==null&&(
        <div className={`alert alert-${githubContext.alert.type}`}>
            {githubContext.alert.msg}
        </div>
    )
    )
}


export default Alert

