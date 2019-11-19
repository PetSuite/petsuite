import React from 'react'
import { Route,Switch } from 'react-router-dom'
import { BookingRoutes } from '../bookings'
import { PetRoutes } from '../pets'
import PageNotFound from '../PageNotFound'

export const PetOwnerRoutes = () => (
        <Switch>
            <Route exact path='/pets' component={PetRoutes} />
            <Route exact path='/bookings' component={BookingRoutes} />
        </Switch>
   )