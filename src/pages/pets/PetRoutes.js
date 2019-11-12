import React from 'react'
import { Switch,Route } from 'react-router-dom'
import { PetForm,Pets } from './index'

export default function PetRoutes({match}){
    return (
        <Switch>
            <Route exact path={`${match.url}/`} component={Pets} />
            <Route exact path={`${match.url}/new`} component={PetForm} />
        </Switch>
    )

}