import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const AdminUpdate = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "male",
    })
    const navigate = useNavigate()
    const { id } = useParams()

    const getUserDataForUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/user/${id}`, {
                method: "GET",
            })
            if (response.ok) {
                const userData = await response.json()
                setUser(userData)
            }
        } catch (error) {
            console.log("error form update page:", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser((prevElem) => ({
            ...prevElem,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/admin/user/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            const res_data = await response.json()
            if (response.ok) {
                toast.success("User Updated")
                navigate('/adminpanel/users')
            } else {
                toast.error(res_data.message)
            }
        } catch (error) {
            console.log("User Update FrontEnd error:", error);
        }
    }

    useEffect(() => {
        getUserDataForUpdate()
    }, [])

    return (
        <>
            <div className="register-container" style={{ marginTop: "-40px" }}>
                <div className="register-bg1" style={{ background: "0" }}></div>
                <div className="register-bg2" style={{ background: "0" }}></div>
                <div className="registration-form" style={{ background: "0", }}>
                    <h2>Update User:-</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="fullName">
                            <input type="text" name='firstName' value={user.firstName} placeholder='First Name' onChange={handleChange} />
                            <input type="text" name='lastName' value={user.lastName} placeholder='Last Name' onChange={handleChange} />
                        </div>
                        <input type="text" name='email' value={user.email} placeholder='Email' onChange={handleChange} />
                        <input type="text" name='phone' value={user.phone} placeholder='Phone No.' onChange={handleChange} />
                        <div className="gender-select">
                            <label htmlFor='male'>Male<input type="radio" id='male' value="male" name='gender' checked={user.gender === "male"} onChange={handleChange} /></label>
                            <label htmlFor='female'>Female<input type="radio" id='female' value="female" name='gender' checked={user.gender === "female"} onChange={handleChange} /></label>
                            <label htmlFor='other'>Other<input type="radio" id='other' value="other" name='gender' checked={user.gender === "other"} onChange={handleChange} /></label>
                        </div>
                        <button type='submit' style={{ marginTop: "50px" }}>Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminUpdate