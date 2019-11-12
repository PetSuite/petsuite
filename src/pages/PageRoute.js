import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'
import { Bookings } from './bookings'
import { PetRoutes } from './pets'
import { UserRoutes } from './users'
import { Settings } from './settings'
import PageNotFound from './PageNotFound'

function PageRoute() {
  return (
      <Switch>
        <Route path="/bookings" component={Bookings} />
        <Route path="/pets" component={PetRoutes} />
        <Route path="/users" component={UserRoutes} />
        <Route path="/settings" component={Settings} />
        <Redirect exact from="/" to="/users"/>
        <Route component={PageNotFound} />
      </Switch>
  );
}

export default PageRoute;
