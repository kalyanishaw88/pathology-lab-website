import React, { useState } from 'react'
import Footer from '../components/Footer'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();


    const handleEyeToggle1 = () => {
        setShowPassword(true)
    }

    const handleEyeToggle2 = () => {
        setShowPassword(false)
    }

    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAdmin((prevElem) => ({
            ...prevElem,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/admin/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(admin)
            })
            const res_data = await response.json()
            if (response.ok) {
                toast.success(res_data.message)
                console.log(res_data.token);

                setAdmin({
                    email: "",
                    password: "",
                })
                navigate('/adminpanel/users')
            } else {
                toast.error(res_data.message)
            }
        } catch (error) {
            console.log("Login Error frontend:", error);

        }
    }
    return (
        <>
            <div className="admin-container">
                <div className="admin-bg1"></div>
                <div className="admin-bg2"></div>
                <div className="admin-form">
                    <h2>Admin Login:-</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='email' value={admin.email} placeholder='Email' onChange={handleChange} />
                        <div id='password-block'>
                            <input type={showPassword ? "text" : "password"} name='password' value={admin.password} placeholder='Password' onChange={handleChange} /><span id='eye' onMouseDown={handleEyeToggle1} onMouseUp={handleEyeToggle2}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Admin