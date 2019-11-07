import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Login, Register } from './auth/'

function Pages() {
  return (
    <Router>
      <Switch>
        <Route path="/register" exaxt >
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default Pages;
