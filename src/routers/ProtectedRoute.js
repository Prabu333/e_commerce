import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

  const currentUser = useAuth();
    console.log(children)
    

  return (
    currentUser ? <Outlet /> : <Navigate to = '/login' /> 

  )
}

export default ProtectedRoute