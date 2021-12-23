import React from 'react'
import PropTypes from 'prop-types'

const Alert=(props)=> {
    return (
    props.alert!==null&&(
        <div className={`alert alert-${props.alert.type}`}>
            {props.alert.msg}
        </div>
    )
    )
}

Alert.propTypes = {
    alert:PropTypes.object
}

export default Alert

