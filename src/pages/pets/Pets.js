import React from 'react'
import { Button } from '../../components'
import { Breadcrumb } from '../../components'

export default function Pets({match,history}){
    return(
        <div>
            <Breadcrumb data={[ 
                    {path: '/', label: 'Home'},
                    {path: '/pets', label: 'Pets'}, 
                ]} 
            />
            <Button color="success" label="ADD NEW" onClick={ () => history.push(`${match.url}/new`) } />
            <h1>Pets Component</h1>
        </div>
    )
}