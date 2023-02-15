import React from 'react'
import { Navigate } from 'react-router-dom'


function PublicRoute({children,cookies}) {
    const {token}  = cookies
    if(token) {
        return <Navigate to='/'/>
    }
  return (
    children
  )
}

export default PublicRoute
