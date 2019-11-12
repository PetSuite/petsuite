import React from 'react'
import { Route,Redirect,Switch } from 'react-router-dom'
import { Users,UserForm } from './index'
import { PageNotFound } from '../../pages'

const UserRouter = ({ match }) => (
        <Switch>
            <Route exact path={`${match.url}/`} component={Users} />
            <Route exact path={`${match.url}/new`} component={UserForm} />
            <Route exact path={`${match.url}/:id`} component={UserForm} />
            <Route exact path={`${match.url}/:id/edit`} component={UserForm} />
            {/* <Route path="/404" component={PageNotFound} /> */}
            <Redirect to={`${match.url}`} />
        </Switch>
)
export default UserRouter