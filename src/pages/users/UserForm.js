import React, { useState, useEffect } from 'react'
import { Breadcrumb,Input,Button,Alert } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks'

export default function UserForm({match,history}){
    const initialState = {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        roles: '',
    }   
    
    const [user,setUser] = useState(initialState)
    const [error,setError] = useState({ msg : '', isError: true })
    const [status,setStatus] = useState('add')
    const [state,actions] = useGlobal()



    useEffect(() =>{
        console.log('render')
        async function userFetch(id){
            const { user } = await actions.userFetch(id)
            setUser({ email: user.email, firstName: user.firstname, lastName: user.lastname, roles: user.role })
        }
        // viewing
        if (match.path === '/users/:id'){
            userFetch(match.params.id)
            setStatus('view')
        }
        // editing
        else if (match.path === '/users/:id/edit'){
            userFetch(match.params.id)
            setStatus('edit')
        }
      
     
    },[match.url])

  
    const save = async() => {
        if (!user.email){
            return setError({ isError: true, msg: 'Please provide an email address.' })
        }
        else if (!user.password){
            return setError({ isError: true, msg: `Please enter your password.` })
        }
        else if (user.password!==user.confirmPassword){
           return setError({ isError: true, msg: `Passwords did'nt match.` })
        }
        else if (user.roles.length===0){
            return setError({ isError: true, msg: 'Please select a role.' })
        }
        const res = await actions.addUser({
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
            mobile: user.phoneNumber,
            role: user.roles,
            password: user.password
        })
        console.log(res)
        if (res.status){
            setError({ isError: false, msg: 'Added successfuly.'})
        }
        else {
            console.log('request error', res.message)
            setError({ isError: true, msg: res.message })
        }

    }
    console.log(user)
    return(
        <div>
            <Breadcrumb data={[ 
                    {path: '/', label: 'Home'},
                    {path: '/users', label: 'Users'}, 
                    {path : '', label: match.url.includes('new') ? 'Add User' : !match.url.includes('edit') ? 'View' : 'Edit' } 
                ]} 
            />
            <h1>Add User</h1>
            {/* nav buttons */}
            <div>
                { !match.url.includes('edit') && !match.url.includes('new') ? 
                 <Link to={`${match.url}/edit`}>
                    <Button color="primary" label="Edit"/>
                </Link>
                    : '' 
                }
            </div>
                <form>
                    <div className="form-group" style={{ width: '50%', margin: '0 auto' }}>
                        {error.msg ? <Alert label={error.msg} color={error.isError ? 'danger' : 'success'} /> : null }
                        <div className="form-group">
                            <Input label="Email" name="email" type="text" 
                                    value={user.email}
                                    disabled={status==='view' ? true : false} 
                                    onChange={ 
                                        (e) => [setUser({...user, email : e.target.value}),
                                                setError({...error, msg: ''})
                                                ] 
                                        } 
                            />
                            <Input label="First Name" name="firstName" 
                                    value={user.firstName} 
                                    disabled={status==='view' ? true : false} 
                                    onChange={ 
                                        (e) => setUser({...user, firstName : e.target.value}) 
                                        } 
                            />
                            <Input label="Last Name" name="lastName" 
                                    value={user.lastName} 
                                    disabled={status==='view' ? true : false} 
                                    onChange={ 
                                        (e) => setUser({...user, lastName : e.target.value}) 
                                        } 
                            />
                            <Input label="Phone Number" name="phoneNumber" 
                                    value={user.phoneNumber} 
                                    disabled={status==='view' ? true : false} 
                                    onChange={ 
                                        (e) => setUser({...user, phoneNumber : e.target.value}) 
                                    } 
                            />
                            <Input label="Roles" type="select" name="roles" value={user.roles} 
                                choices={["Manager", "Employee", "Pet Owner"]} 
                                disabled={status==='view' ? true : false} 
                                onChange={(e) => setUser({...user, roles: e.target.value})} 
                                selected={user.roles}
                            />
                            {status === 'add' ?
                                <React.Fragment>
                                    <Input type="password" label="Password" 
                                    value={user.password} 
                                    disabled={status==='view' ? true : false} 
                                    onChange={ 
                                        (e) => [setUser({...user, password : e.target.value}), 
                                                setError({...error, msg: ''})
                                                ] 
                                                } 
                                    />
                                    <Input type="password" label="Confirm Password" 
                                            value={user.confirmPassword} 
                                            disabled={status==='view' ? true : false} 
                                            onChange={ 
                                                (e) => [setUser({...user, confirmPassword : e.target.value}), 
                                                        setError({...error, msg: ''})
                                                        ] 
                                                    } 
                                    />
                                </React.Fragment>
                                : ''
                            }
                        </div>
                    </div>
                </form>
                {status !== 'view' ? <Button color="success" label="Save" onClick={ save } /> : '' }
        </div>
    )
}