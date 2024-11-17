import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminPanel = () => {
    return (
        <>
            <div className="admin-panel-container">
                <div className="admin-navbar">
                    <NavLink className='adminLink' to='/adminpanel/users'>Users</NavLink>
                    <NavLink className='adminLink' to='/adminpanel/bookings'>Bookings</NavLink>
                    <NavLink className='adminLink' to='/adminpanel/services'>Services</NavLink>
                    <NavLink className='adminLink' to='/adminpanel/reports'>Reports</NavLink>
                </div>
                <div className="admin-pages">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminPanel