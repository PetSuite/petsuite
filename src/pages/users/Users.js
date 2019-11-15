import React,{ useState,useEffect } from 'react'
import { Breadcrumb,Button,Pagination } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks/'
import { SlowBuffer } from 'buffer'

export default function Users({ match }){
    
    const styles= {
        action : {
            marginRight : '5px',
            cursor : 'pointer'
        }
    }

    const [state,actions] = useGlobal()
    const [users,setUsers] = useState([])
    const [page,setPage] = useState('')

    useEffect(()=>{
        fetchUsers()
    },[])
    
    async function fetchUsers(page=1){
        const data = await actions.usersList(page)
        console.log(data)
        setUsers(data.users)
        setPage(data.page)
    }

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
                                        <td>{JSON.stringify(((parseInt(page.page)*10)+index+1)-10)}</td>
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
                    </tbody>
                    {/* 09169472856 */}
                </table>
                <Pagination fetch={fetchUsers} pages={page} />
            </div>
        </div>
    )
}
