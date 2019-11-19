import React from 'react'
import { Route } from 'react-router-dom'
import { BookingRoutes } from '../bookings'
import { PetRoutes } from '../pets'
import { UserRoutes } from '../users'
import { SettingsRoutes } from '../settings'

export const ManagerRoutes = () => (
    <Route>
        <Route exact path='/pets' component={PetRoutes} />
        <Route exact path='/users' component= {UserRoutes} />
        <Route exact path='/bookings' component={BookingRoutes} />
        <Route exact path='/settings' component={SettingsRoutes} />
    </Route>
)