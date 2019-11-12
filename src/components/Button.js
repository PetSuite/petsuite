import React from 'react'

const Button = ({ color,label,onClick}) => {
    return(
        <button type="button" className={`btn btn-${color}`} onClick={onClick}>
            {label}
        </button>
    )
}
export default Button