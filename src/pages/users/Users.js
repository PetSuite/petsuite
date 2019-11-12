import React,{ useState,useEffect } from 'react'
import { Breadcrumb,Button } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks/'

export default function Users({ match }){
    
    const styles= {
        action : {
            marginRight : '5px',
            cursor : 'pointer'
        }
    }

    const [state,actions] = useGlobal()
    const [users,setUsers] = useState([])

    async function fetchUsers(){
        const data = await actions.fetchUsers()
        setUsers(data.users)
    }

    useEffect(()=>{
        fetchUsers()
    },[])
    console.log(users)
    
    return(
        <div>
            <Breadcrumb data={[ {path: '/', label: 'Home'},{path: '/users', label: 'Users'} ] } />
            <h1>Users</h1>
            <div style={{ padding: '20px' }}>
                <Link to="/users/new">
                    <Button label="ADD NEW" color="primary" />
                </Link>
            </div>
            {/* List */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Roles</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <Link to={`${match.url}/${item._id}`}><span style={styles.action} className="badge badge-pill badge-success">View</span></Link>
                                            <Link to={`${match.url}/${item._id}/edit`}><span style={styles.action} className="badge badge-pill badge-primary">Edit</span></Link>
                                            <Link to={`${item._id}/delete`}><span style={styles.action} className="badge badge-pill badge-danger">Delete</span></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
