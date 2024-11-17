import React, { useEffect, useState } from 'react'
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/allUsers', {
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

  const adminUserDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/user/delete/${id}`, {
        method: "DELETE",
      })
      const res_data = await response.json()
      if (response.ok) {
        toast.success(res_data.message)
        getAllUsers()
      }
    } catch (error) {
      console.log("Error from admin user frontend:", error);
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <>
      <div className="admin-user-container">
        <h1>All Users Details:-</h1>
        {
          users.map((val, index) => {
            return (
              <div className="all-users" key={val._id}>
                <p>{`${val.firstName} ${val.lastName}`}</p>
                <p>{val.email}</p>
                <p>{val.phone}</p>
                <p>{val.gender}</p>
                <p><span onClick={() => adminUserDelete(val._id)}><IoTrashBin /></span><span><Link to={`/adminpanel/users/${val._id}/edit`}><FaEdit /></Link></span></p>
              </div>
            )
          })
        }

      </div>
    </>
  )
}

export default AdminUsers