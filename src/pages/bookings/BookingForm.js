import React,{ useState,useEffect } from 'react'
import { Breadcrumb,Input,Button,Alert } from '../../components'
import { Link } from 'react-router-dom'
import useGlobal from '../../hooks'

export default function BookingForm({match}){

    const initialState={
        owner : '',
        pet: '',
        period : {from : '', to: ''},
        notes : '',
        employeeNotes : '',
        status : ''
    }
    const [booking,setBooking] = useState(initialState)
    const [state,actions] = useGlobal()
    const [error,setError] = useState({ msg : '', isError: true })
    const [ownerList,setOwnerList] = useState([])
    const [status,setStatus] = useState('add')

    useEffect(() =>{
        // async function petFetch(id){
        //     const { pet } = await actions.petFetch(id)
        //     console.log(pet)
        //     setPet(pet)
        // }
        // console.log(match)
        // // viewing
        // if (match.params.id){
        //     petFetch(match.params.id)
        //     setStatus('view')
        // }
        // // editing
        // else if (match.params.editId){
        //     petFetch(match.params.editId)
        //     setStatus('edit')
        // }
      
     
    },[match.url])
    
    const ownerSelectHandle = (owner) =>{
        setBooking({...booking, owner})
    }

    const petSelectHandle = (pet) =>{
        setBooking({...booking, pet})
    }
    console.log(booking)

    const save = async() => {
        if (!booking.owner) {
            setError({...error, msg: "Please select pet owner."})

        } else if (!booking.name){
            setError({...error, msg: "Please select pet name."})
        }
        else{
            // add
            // console.log(pet)
            // const res = await actions.addPet(pet)
            // console.log(res)
            // if (res.status){
            //     setError({ isError: false, msg: 'Added successfuly.'})
            // }
            // else {
            //     console.log('request error', res.message)
            //     setError({ isError: true, msg: res.message })
            // }
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
            <h1>Book</h1>
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
                                value={booking.owner}
                        />
                        {booking.owner ?   
                        <Input label="Pet Name" type="autoComplete"
                                params_id={booking.owner._id}
                                actions={actions.searchPet}
                                onSelect = {petSelectHandle}
                                value={booking.pet}
                        />
                        : ''}
                        <Input label="Period - From" 
                                type="date"
                                max={booking.period.to}
                                value={booking.period.from}
                                onChange={ (e) => setBooking({...booking,period: {...booking.period,from: e.target.value}}) }
                        />
                        <Input label="Period - To" 
                                type="date"
                                disabled={booking.period.from ? false : true}
                                min={booking.period.from}
                                value={booking.period.to}
                                onChange={ (e) => setBooking({...booking,period: {...booking.period,to: e.target.value}}) }
                        />
                        <Input label="Status" type="select"
                            choices={["Booked", "In Progress", "Cancelled", "Completed"]} 
                            onChange={(e) => setBooking({...booking, status: e.target.value}) } 
                            selected={booking.status}
                        />
                        <Input label="Notes"
                            type="textarea"
                            value={booking.notes} 
                            onChange={(e) => setBooking({...booking, notes: e.target.value}) } 
                        />
                    {status !== 'view' ? <Button color="success" label="Save" onClick={ save } /> : '' }
                    </div>
                </form>
            </div>
    )
}