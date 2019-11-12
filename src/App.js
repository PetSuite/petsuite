import React, { useState,useEffect} from 'react';
import { PageRoute,PageNotFound } from './pages/'
import '../src/styles/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { NavigationBar, Header } from '../src/dashboard'
import useGlobal from '../src/hooks'
import { Login } from '../src/pages/auth'
import store from 'store'

function Routes(){
  return(
    <Router>
      <Switch>
        <Route path="/" component={App} />
        {/* <Route exact path="/bookings" component={App} />
        <Route exact path="/pets" component={App} />
        <Route exact path="/users" component={App} />
        <Route exact path="/settings" component={App} /> */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}


function App() {
  const [isToggle,setIsToggle] = useState(false)
  const [state,actions] = useGlobal()

  useEffect(() => {
    // store.clearAll()
    console.log('use  effect user')
    const user = store.get('user')
    if (user){
      actions.loggedIn(user,store.get('token'))
    }

  },[])


  // If user is logged in
  if (state.user){
  return (
    <Switch>
      <Router>
          <div className="wrapper">
          {/* <!-- Sidebar --> */}
            <NavigationBar isToggle={isToggle}/>
          
          {/* Page Content */}
            <div id="content">
              <Header setIsToggle={setIsToggle} isToggle={isToggle} />
              <Route component={PageRoute} />
            </div>
          </div>
      </Router>
    </Switch>
      )
  } 
else{
    return(
      <div style={{ block: 'block' }} className="row"> 
        <div className="bg" style={{ width: '60%' }}></div>
        <div className="col-md-4"style={{ width: '40%', padding: '5%'}}>
          <h1>PetSuite</h1> <br/>
          <Login />
        </div>
      </div>
    )
  }
}

export default Routes;
