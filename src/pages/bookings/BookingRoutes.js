import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import { BookingForm,Bookings } from './index'
import PageNotFound from '../PageNotFound'


export default function BookingRoutes({match}){
    return (
        <Switch>
            <Route exact path={`${match.url}/`} component={Bookings} />
            <Route exact path={`${match.url}/new`} component={BookingForm} />
            <Route exact path={`${match.url}/:id`} component={BookingForm} />
            <Route exact path={`${match.url}/:editId/edit`} component={BookingForm} />
            <Route path="/404" component={PageNotFound} />
            <Redirect to={`${match.url}`} />
        </Switch>
    )

}