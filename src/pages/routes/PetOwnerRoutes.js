import React from 'react'
import { Route,Switch } from 'react-router-dom'
import { BookingRoutes } from '../bookings'
import { PetRoutes } from '../pets'
import PageNotFound from '../PageNotFound'

export const PetOwnerRoutes = () => (
        <Switch>
        {console.log('pet owner routes')}
            <Route path='/pets' component={PetRoutes} />
            <Route path='/bookings' component={BookingRoutes} />
        </Switch>
   )