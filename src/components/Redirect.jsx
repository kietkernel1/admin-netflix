import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const Redirect = ({children}) => {
    const pathname = useLocation().pathname
    console.log(pathname)

  return pathname !== "/" 
        ? children 
        : <Navigate to="/admin" replace/>
}

export default Redirect