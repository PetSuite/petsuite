
import React,{ useState,useEffect } from 'react'
import { Breadcrumb,Button,Pagination } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks'

export default function Bookings({ match,history }){
    const styles= {
        action : {
            marginRight : '5px',
            cursor : 'pointer'
        }
    }

    const [state,actions] = useGlobal()
    const [pets,setPets] = useState([])
    const [page,setPage] = useState('')

    useEffect(()=>{
        fetchPets()
    },[])

    async function fetchPets(page=1){
        const data = await actions.petsList(page)
        setPets(data.pets)
        setPage(data.page)
    }
    return(
        <div>
            <Breadcrumb data={[ 
                    {path: '/', label: 'Home'},
                    {path: '/bookings', label: 'Bookings'}, 
                ]} 
            />
            <h1>Bookings</h1>
            <div style={{ padding: '20px' }}>
                <Button color="success" label="ADD NEW" onClick={ () => history.push(`${match.url}/new`) } />
            </div>
            {/* List */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Name</th>
                            <th scope="col">Breed</th>
                            <th scope="col">Size</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pets.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{JSON.stringify(((parseInt(page.page)*10)+index+1)-10)}</td>
                                        <td>{`${item.owner.firstname} ${item.owner.lastname} < ${item.owner.email} >`}</td>
                                        <td>{item.name}</td>
                                        <td>{item.breed}</td>
                                        <td>{item.size}</td>
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
                <Pagination fetch={fetchPets} pages={page} />
            </div>
        </div>
    )
}
