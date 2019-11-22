import {API_URL} from '../../config'
import { USER_LIST } from './userTypes'

const sendRequest = async function (method= 'GET', url= '', data = {}, headers){
    try{
       const res = await fetch(API_URL + url, {
       method,
       body: (method === 'GET') ? null : JSON.stringify(data),
       headers:{
           'Content-Type' : 'application/json',
           ...headers
      }
     })
     return await res.json()
    } catch (e){
       console.log("REQUEST ERROR ", e)
       return { status : false}
    }
}
   


const userReducer = (state, action) =>{
    switch (action.type){
        case USER_LIST : {
            const res = sendRequest('GET','users?page=1',{}, {})
            return res
        }
        default : return {}
    }
}

export default userReducer