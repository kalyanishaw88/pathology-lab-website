import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminReport = () => {
    const [users, setUsers] = useState([])
    const getAllUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/allBookings', {
          method: "GET"
        })
        const res_data = await response.json()
        if (response.ok) {
          setUsers(res_data)
        }
      } catch (error) {
        console.log(error);
  
      }
    }

    useEffect(() => {
        getAllUsers()
      }, [])
    return (
        <>
        <div className="admin-booking-container">
          <h1>All Bookings Details:-</h1>
          {
            users.map((val, index) => {
              return (
                <div className="all-users" key={val._id}>
                  <p>{`${val.firstName} ${val.lastName}`}</p>
                  <p>{val.phone}</p>
                  <p>{val.address}</p>
                  <p>{val.date}</p>
                  <p>{val.testFor}</p>
                  <p><span><NavLink className='confirm-btn' to={`/adminpanel/reports/${val._id}`}>Report</NavLink></span></p>
                </div>
              )
            })
          }
  
        </div>
      </>
    )
}

export default AdminReport