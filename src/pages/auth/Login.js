import React,{ useState } from 'react'
import useGlobal from '../../hooks'

export function Login(){

    const initialState = {
        email : '',
        password: ''
    }
    const [user,setUser] = useState(initialState)
    const [state,actions] = useGlobal()

    const logIn = async() =>{
        const res = await actions.login(user)
    }

    return(
            <form>
                <div style={{ width: '100%', margin: '0 auto' }}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address or username</label>
                        <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={user.password} onChange={ (e)=> setUser({...user, email: e.target.value }) } type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        <small className="form-text text-muted">
                            Sign in as: &nbsp;
                            <b onClick={ () => setUser({ password: 'petsuite', email: 'manager@petsuite.com'})}><u style={styles.account}>Manager</u></b>, &nbsp;
                            <b onClick={ () => setUser({ password: 'petsuite', email: 'employee@petsuite.com'})}><u style={styles.account}>Employee</u></b>, &nbsp;
                            <b onClick={ () => setUser({ password: 'petsuite', email: 'petowner@petsuite.com'})}><u style={styles.account}>Pet Owner</u></b> &nbsp;
                        </small>
                    </div>
                    <div className="col text-center">
                        <button type="button" onClick={logIn} className="btn btn-success">Login</button>
                        <small className="form-text text-muted">Don't have an account? <u style={styles.account}>Register</u> here.</small>
                    </div>
                </div>
            </form>
    )
}
const styles={
    account: {
        cursor: 'pointer',
        color: 'blue'
    }
}
export default Login