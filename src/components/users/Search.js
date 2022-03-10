import React, { useState,useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'


const Search = ({showClear, clearUsers,setAlert}) => {
    const githubContext = useContext(GithubContext)
    const [text,setText] = useState("")


    const onChange = (e) => {setText(e.target.value)}
    const onSubmit = (e) => {e.preventDefault()
        if(text===""){
            setAlert('Please enter the text', 'light')
        }else{
            githubContext.searchUsers(text)
            setText("")
        }
    }

    const onClear = (e) =>{
        e.preventDefault()
        clearUsers()
    }
    
        return (
            <div>
                <form className="form">
                    <input type="text" name="text" value={text} onChange={onChange} placeholder="Search Users..."/>
                    <input type="submit" value="Search" onClick={onSubmit} className="btn btn-dark btn-block"/> 
                    {showClear&&<input type="submit" value="Clear" onClick={onClear} className="btn btn-grey btn-block"/> }
                    
                </form>
            </div>
        )
    }


Search.propTypes = {
    showClear:PropTypes.bool.isRequired,
    clearUsers:PropTypes.func.isRequired,
    setAlert:PropTypes.func.isRequired
}

export default Search
