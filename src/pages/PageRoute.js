import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Register, Login } from './auth'
import { Bookings } from './bookings'
import { Pets } from './pets'
import { Users } from './users'
import { Settings } from './settings'


function PageRoute() {
  return (
      <Switch>
        <Route path="/bookings" exact component={Bookings} />
        <Route path="/pets" exact component={Pets} />
        <Route path="/users" exact component={Users} />
        <Route path="/settings" exact component={Settings} />
      </Switch>
  );
}

export default PageRoute;
