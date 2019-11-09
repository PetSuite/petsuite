import React from 'react'
import storage from 'store'
import { API_URL } from '../config'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

async function sendRequest(method= 'GET', url= '', data = {}, headers){
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


const actions = {

 loggedIn: (store,user,token) =>{
  console.log(user,token)
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
   history.push('/login')
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

 logOut: async (store) =>{
  store.setState({
   user: false,
   token: false
  })
  storage.clearAll()
  history.push('/')
 }

}


export default actions