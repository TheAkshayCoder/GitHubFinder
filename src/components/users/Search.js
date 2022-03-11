import React, { useState,useContext } from 'react'
import GithubContext from '../../context/github/githubContext'


const Search = () => {
    const githubContext = useContext(GithubContext)
    const [text,setText] = useState("")


    const onChange = (e) => {setText(e.target.value)}
    const onSubmit = (e) => {e.preventDefault()
        if(text===""){
            githubContext.setAlert('Please enter the text', 'light')
        }else{
            githubContext.searchUsers(text)
            setText("")
        }
    }

    
        return (
            <div>
                <form className="form">
                    <input type="text" name="text" value={text} onChange={onChange} placeholder="Search Users..."/>
                    <input type="submit" value="Search" onClick={onSubmit} className="btn btn-dark btn-block"/> 
                    {githubContext.users.length>0&&<input type="submit" value="Clear" onClick={githubContext.clearUsers} className="btn btn-grey btn-block"/> }
                    
                </form>
            </div>
        )
    }




export default Search
