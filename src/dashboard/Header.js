import React from 'react'
import User from './User'

export default function Header({setIsToggle,isToggle}){
 return(
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      {/* toggle button */}
      <button onClick= { () => setIsToggle(!isToggle)} type="button" id="sidebarCollapse" className="btn btn-info">
          <i className="fa fa-align-left"></i>
      </button>
      <div className="d-sm-flex flex-row-reverse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item" style={{ cursor: 'pointer' }}>
              <User />
          </li>
        </ul>
      </div>
    </div>
  </nav>
// <Pages />
 )
}