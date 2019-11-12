import React from 'react'
import { Breadcrumb,Input } from '../../components'

export default function Petform({match}){
    return(
        <div>
            <Breadcrumb data={[ 
                    {path: '/', label: 'Home'},
                    {path: '/pets', label: 'Pets'}, 
                    {path : '', label: match.url.includes('new') ? 'Add Pet' : !match.url.includes('edit') ? 'View' : 'Edit' } 
                ]} 
            />
            <div>
                <h1>Add Pet</h1>
                <div className="form-group" style={{ width: '50%', margin: '0 auto' }}>
                    <Input label="Pet Owner" name="petOwner" type="autoComplete"
                            choices={[ "asdasda", "ld1l2ld12", "99323k23fk", '12e19020d', '1929319239sd', '129dmmmsfs', 'fw9ef9wfkds', 'sdf912dd']} 
                            // value={user.email}
                            // onChange={ 
                            //     (e) => [setUser({...user, email : e.target.value}),
                            //                 setError({...error, msg: ''})
                            //             ] 
                            //     } 
                    />
                </div>
            </div>
        </div>
    )
}