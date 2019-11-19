import React from 'react';
import { Route,Redirect,Switch } from 'react-router-dom'
import { EmployeeRoutes, ManagerRoutes, PetOwnerRoutes } from './routes'
import PageNotFound from './PageNotFound'
import useGlobal from '../hooks'


function PageRoute() {
  const [state,actions] = useGlobal()
  console.log(state.user.role)

  return (
      <Switch>
        {/* <Route path="/bookings" component={BookingRoutes} />
        <Route path="/pets" component={PetRoutes} />
        <Route path="/users" component={UserRoutes} />
        <Route path="/settings" component={Settings} /> */}
        {/* <Redirect exact from="/" to="/users"/> */}
        {state.user.role==='Pet Owner' && <PetOwnerRoutes />}
        {state.user.role==='Employee' && <EmployeeRoutes />}
        {state.user.role==='Manager' && <ManagerRoutes />}
        {/* <Redirect exact from="/" to="/bookings"/> */}
      </Switch>
  );
}
export default PageRoute;
