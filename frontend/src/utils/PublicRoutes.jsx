import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {

    const accessToken = localStorage.getItem('AccessToken');
    return accessToken ? <Navigate to='/dashboard' /> : <Outlet />
}

export default PublicRoutes;