import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
    state={
        text:""
    }

    static propTypes = {
        searchUsers:PropTypes.func.isRequired,
        showClear:PropTypes.bool.isRequired,
        clearUsers:PropTypes.func.isRequired,
        setAlert:PropTypes.func.isRequired
    }

    onChange = (e) => {this.setState({[e.target.name]:e.target.value})}
    onSubmit = (e) => {e.preventDefault()
        if(this.state.text===""){
            this.props.setAlert('Please enter the text', 'light')
        }else{
            this.props.searchUsers(this.state.text)
            this.setState({[e.target.name]:""})
        }
    }

    onClear = (e) =>{
        e.preventDefault()
        this.props.clearUsers()
    }
    render() {
        return (
            <div>
                <form className="form">
                    <input type="text" name="text" value={this.state.text} onChange={this.onChange} placeholder="Search Users..."/>
                    <input type="submit" value="Search" onClick={this.onSubmit} className="btn btn-dark btn-block"/> 
                    {this.props.showClear&&<input type="submit" value="Clear" onClick={this.onClear} className="btn btn-grey btn-block"/> }
                    
                </form>
            </div>
        )
    }
}

export default Search
