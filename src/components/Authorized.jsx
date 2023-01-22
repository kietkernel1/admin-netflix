import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Authorized = ({children}) => {
const user = useSelector(state=> state.loginReducer.user) 

  return !user?.isAdmin?
        children:
        <Navigate to = "/admin" replace/>

}

export default Authorized