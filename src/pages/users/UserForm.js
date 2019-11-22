import React, { useState, useEffect } from 'react'
import { Breadcrumb,Input,Button,Alert } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks'

export default function UserForm({match,history}){
    const initialState = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        role: '',
    }   
    
    const [user,setUser] = useState(initialState)
    const [error,setError] = useState({ msg : '', isError: true })
    const [status,setStatus] = useState('add')
    const [state,actions] = useGlobal()



    useEffect(() =>{
        console.log('render')
        async function userFetch(id){
            const { user } = await actions.userFetch(id)
            console.log(user)
            setUser(user)
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
        else if (!user.password && status==='add'){
            return setError({ isError: true, msg: `Please enter your password.` })
        }
        else if (user.password!==user.confirmPassword  && status==='add'){
           return setError({ isError: true, msg: `Passwords did'nt match.` })
        }
        else if (user.role.length===0){
            return setError({ isError: true, msg: 'Please select a role.' })
        }
        const res =  await actions.addUser(user,status) 
        if (res.status){
            console.log(res)
            setError({ isError: false, msg: res.msg})
        }
        else {
            console.log('request error', res.msg)
            setError({ isError: true, msg: res.msg })
        }

    }
    return(
        <div>
            <Breadcrumb data={[ 
                    {path: '/', label: 'Home'},
                    {path: '/users', label: 'Users'}, 
                    {path : '', label: match.url.includes('new') ? 'Add User' : !match.url.includes('edit') ? 'View' : 'Edit' } 
                ]} 
            />
            {status==='edit' ? <h1>Update User</h1> : status==='add' ? <h1>Add User</h1> : ''}
            {/* nav buttons */}
                    <div className="col-xs-12 col-sm-9 col-md-6 col-lg-5" style={{ margin: '0 auto' }}>
                        <form>
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
                         
                            <Input label="Role" type="select" name="roles" value={user.roles} 
                                choices={["Manager", "Employee", "Pet Owner"]} 
                                disabled={status==='view' ? true : false} 
                                onChange={(e) => setUser({...user, role: e.target.value})} 
                                selected={user.role}
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
                        </form>
                {status !== 'view' ? <Button color="success" label="Save" onClick={ save } /> : '' }
                { !match.url.includes('edit') && !match.url.includes('new') ? 
                <Link to={`${match.url}/edit`}>
                    <Button color="primary" label="Edit"/>
                </Link>
                    : '' 
                }
                </div>
        </div>
    )
}