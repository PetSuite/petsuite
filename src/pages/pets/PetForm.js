import React,{ useState,useEffect } from 'react'
import { Breadcrumb,Input,Button,Alert } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks'

export default function Petform({match,history}){

    const initialState={
        owner : '',
        name : '',
        type : '',
        breed : '',
        size : ''
    }
    const [pet,setPet] = useState(initialState)
    const [state,actions] = useGlobal()
    const [error,setError] = useState({ msg : '', isError: true })
    const [ownerList,setOwnerList] = useState([])
    const [status,setStatus] = useState('add')

    useEffect(() =>{
        async function petFetch(id){
            const res = await actions.petFetch(id)
            if (!res.status) {
                history.push(`${match.url}/404`)
            }
            else{
                setPet(res.pet)
            }
        }
        console.log(match)
        // viewing
        if (match.params.id){
            petFetch(match.params.id)
            setStatus('view')
        }
        // editing
        else if (match.params.editId){
            petFetch(match.params.editId)
            setStatus('edit')
        }
      
     
    },[match.url])

    const ownerOnChange = async(e) =>{
        const owners = await actions.searchOwner(e.target.value)
        setOwnerList(owners)
        setPet({...pet, owner: ''})
    }
    
    const ownerSelectHandle = (owner) =>{
        setPet({...pet, owner})
    }
    const save = async() => {
        if (!pet.owner) {
            setError({...error, msg: "Please select pet owner."})

        } else if (!pet.name){
            setError({...error, msg: "Please select pet name."})
        }
        else{
            // add
            console.log(pet)
            const res = await actions.addPet(pet)
            console.log(res)
            if (res.status){
                setError({ isError: false, msg: 'Added successfuly.'})
            }
            else {
                console.log('request error', res.message)
                setError({ isError: true, msg: res.message })
            }
        }
    }

    return(
        <div>
            <Breadcrumb data={[ 
                    {path: '/', label: 'Home'},
                    {path: '/pets', label: 'Pets'}, 
                    {path : '', label: match.url.includes('new') ? 'Add Pet' : !match.url.includes('edit') ? 'View' : 'Edit' } 
                ]} 
            />
            <h1>Add Pet</h1>
            <div>
                { !match.url.includes('edit') && !match.url.includes('new') ? 
                 <Link to={`${match.url}/edit`}>
                    <Button color="primary" label="Edit"/>
                </Link>
                    : '' 
                }
            </div>
                <form>
                {error.msg ? <Alert label={error.msg} color={error.isError ? 'danger' : 'success'} /> : null }
                    <div className="form-group" style={{ width: '400px', margin: '0 auto' }}>
                            <Input label="Pet Owner" type="autoComplete"
                                    actions={actions.searchOwner}
                                    onSelect = {ownerSelectHandle}
                                    value={pet.owner}
                            />
  
                        <Input label="Name" 
                                value={pet.name}
                                onChange={ (e) => setPet({...pet, name: e.target.value }) }
                        />
                        <Input label="Type" type="select" name="roles" 
                            value={pet.type} 
                            choices={["Cat", "Dog", "Fish"]} 
                            onChange={(e) => setPet({...pet, type: e.target.value}) } 
                            selected={pet.type}
                        />
                        <Input label="Breed"
                            value={pet.breed} 
                            onChange={(e) => setPet({...pet, breed: e.target.value}) } 
                        />
                           <Input label="Size" type="select"
                            value={pet.size} 
                            choices={["Small", "Medium", "Large"]} 
                            onChange={(e) => setPet({...pet, size: e.target.value}) } 
                            selected={pet.size}
                        />
                    {status !== 'view' ? <Button color="success" label="Save" onClick={ save } /> : '' }
                    </div>
                </form>
            </div>
    )
}