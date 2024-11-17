import React, { useState } from 'react'
import Footer from '../components/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { storeTokenInLS } = useAuth()
    const handleEyeToggle1 = () => {
        setShowPassword(true)
    }

    const handleEyeToggle2 = () => {
        setShowPassword(false)
    }
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

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
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const res_data = await response.json()
            if (response.ok) {
                toast.success(res_data.message)
                storeTokenInLS(res_data.token)
                console.log(res_data.token);

                setUser({
                    email: "",
                    password: "",
                })
                navigate('/')
            } else {
                toast.error(res_data.message)
            }
        } catch (error) {
            console.log("Login Error frontend:", error);

        }
    }


    return (
        <>
            <div className="login-container">
                <div className="login-bg1"></div>
                <div className="login-bg2"></div>
                <div className="login-form">
                    <h2>Login Yourself:-</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='email' value={user.email} placeholder='Email' onChange={handleChange} />
                        <div id='password-block'>
                            <input type={showPassword ? "text" : "password"} name='password' value={user.password} placeholder='Password' onChange={handleChange} /><span id='eye' onMouseDown={handleEyeToggle1} onMouseUp={handleEyeToggle2}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                    <p>*Don't have an account,<NavLink to='/register'>Register</NavLink></p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login