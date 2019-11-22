import React from 'react'
import { Route } from 'react-router-dom'
import { BookingRoutes } from '../bookings'
import { PetRoutes } from '../pets'
import { UserRoutes } from '../users'
import { SettingsRoutes } from '../settings'

export const ManagerRoutes = () => (
    <Route>
        {console.log('s')}
        <Route path='/pets' component={PetRoutes} />
        <Route path='/users' component= {UserRoutes} />
        <Route path='/bookings' component={BookingRoutes} />
        <Route path='/settings' component={SettingsRoutes} />
    </Route>
)