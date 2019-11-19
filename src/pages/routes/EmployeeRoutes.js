import React from 'react'

import { Route,Switch } from 'react-router-dom'
import { BookingRoutes } from '../bookings'
import { PetRoutes } from '../pets'
import { UserRoutes } from '../users'
import PageNotFound from '../PageNotFound'

export const EmployeeRoutes = () => (
        <Switch>
            <Route exact path='/pets' component={PetRoutes} />
            <Route exaxt path='/users' component={UserRoutes} />
            <Route exact path='/bookings' component={BookingRoutes} />
            <Route component={PageNotFound} />
        </Switch>
    )
