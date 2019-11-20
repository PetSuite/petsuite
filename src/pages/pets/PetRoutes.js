import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import { PetForm,Pets } from './index'
import PageNotFound from '../PageNotFound'

export default function PetRoutes({match}){
    console.log(match,'pets route')
    return (
        <Switch>
            <Route exact path={`${match.url}/404`} component={PageNotFound} />
            <Route exact path={`${match.url}/`} component={Pets} />
            <Route exact path={`${match.url}/new`} component={PetForm} />
            <Route exact path={`${match.url}/:id`} component={PetForm} />
            <Route exact path={`${match.url}/:editId/edit`} component={PetForm} />
            <Redirect to={`${match.url}/404`} />
        </Switch>
    )

}