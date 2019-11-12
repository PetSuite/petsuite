import React from 'react'
import { BrowserRouter as Router,NavLink } from 'react-router-dom'
import '../styles/App.css'

export default function NavigationBar(props){
    return(
        <div className="wrapper">
                <nav id="sidebar" className={props.isToggle ? 'active': ''}>
                    <div className="sidebar-header">
                        <h3>PetSuite</h3>
                        <strong>PS  </strong>
                    </div>

                    <ul className="list-unstyled components">
                        <li>
                            <NavLink to="/users" activeClassName="active">
                                <i className="fa fa-users"></i>
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/bookings" activeClassName="active"> 
                                <i className="fa fa-clipboard-list"></i>
                                Bookings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/pets" activeClassName="active">
                                <i className="fa fa-dog"></i>
                                Pets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/settings" activeClassName="active">
                                <i className="fa fa-cogs"></i>
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                </nav>
        </div>
    )
}