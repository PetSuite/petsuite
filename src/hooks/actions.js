import React from 'react'
import storage from 'store'
import { API_URL } from '../config'
import { Users } from '../pages/users';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

async function sendRequest(method= 'GET', url= '', data = {}, headers){
 try{
    console.log(data)
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


const actions = {
    loggedIn: (store,user,token) =>{
        if (user){
            store.setState({
                user: user,
                token: token
            })
            if (history.location.pathname==='/'){
                history.push('/bookings')
            }
        }
        else{
            history.push('/')
        }
            return
    },
    login : async (store,user) =>{
        const res = await sendRequest('POST', 'login', user)
        if (res.status){
            storage.set('token',res.token)
            storage.set('user',res.user)
            store.setState({
                user: res.user,
                token: res.token
            })
        }
        return res
    },
    logOut: (store) =>{
        store.setState({
        user: false,
        token: false
    })
        storage.clearAll()
        history.push ('/')
    },
    addUser: async (store,user) =>{
        const header = {
            'Authorization' : `Bearer ${store.state.token}`
        }
        const res = await sendRequest('POST','users', {...user, id: storage.get('user').id}, header)
        return res
    },
    fetchUsers: async (store,user) =>{
        const header = {
            'Authorization' : `Bearer ${store.state.token}`
        }
        const res = await sendRequest('GET','users',{},header)
        // console.log(res)
        return res
    },
    userFetch: async (store,id) =>{
        const header = {
            'Authorization' : `Bearer ${store.state.token}`,
        }
        const res = await sendRequest('GET',`users?id=${id}`,{},header)
        console.log(res)
        return res
    }



}


export default actions