import React from 'react'

const Alert = ({ label,color }) =>{
    return(
        <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
            <strong>{label}</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
export default Alert