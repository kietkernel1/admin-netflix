import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state=> state.loginReducer.user) 
    const { pathname } = useLocation()
    
    return  user?.isAdmin?
        children 
        :
        <Navigate to="/login" state={{from: pathname}} replace= {true}/>


}

export default ProtectedRoute