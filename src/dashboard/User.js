import React,{useState} from 'react'
import './dashboard.css'
import useGlobal from '../hooks'
import store from 'store'

export default function User(){

    const [isToggle,setIsToggle] = useState(false)
    const [state,actions] = useGlobal()

    const logOut = () =>{
        actions.logOut()
    }
    return(
    <div>
        <div className="nav-link" id="user" onClick={ () => setIsToggle(!isToggle) }>
            <span id="name">{state.user.email.length > 10 ? state.user.email.substring(0,10)+'...' : state.user.email}</span> &nbsp;
            <span id="no-name"></span> &nbsp;
            <i className="fa fa-caret-down"></i>
        </div>
        {/* Drop down result */}
        {
            isToggle ? 
            <ul className="drop-down">
                <li>Edit Profile</li>
                <li onClick={ logOut }>Logout</li>
            </ul>
            : ''
        }
    </div>
    )
} 
