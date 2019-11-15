import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import { PetForm,Pets } from './index'

export default function PetRoutes({match}){
    return (
        <Switch>
            <Route exact path={`${match.url}/`} component={Pets} />
            <Route exact path={`${match.url}/new`} component={PetForm} />
            <Route exact path={`${match.url}/:id`} component={PetForm} />
            <Route exact path={`${match.url}/:editId/edit`} component={PetForm} />
            {/* <Route path="/404" component={PageNotFound} /> */}
            <Redirect to={`${match.url}`} />
        </Switch>
    )

}