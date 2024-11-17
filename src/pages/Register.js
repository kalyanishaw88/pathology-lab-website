import React, { useState } from 'react'
import Footer from '../components/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useAuth } from '../store/auth';

const Register = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "male",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const navigate = useNavigate()
    const { storeTokenInLS } = useAuth()

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
            const response = await fetch('http://localhost:5000/api/auth/register', {
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
                console.log(res_data.token)
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    gender: "male",
                    password: "",
                    confirmPassword: ""
                })
                navigate('/')
            } else {
                toast.error(res_data.message)
            }
        } catch (error) {
            console.log("Registe Page error:", error);
        }
    }

    const handleEyeToggle1 = () => {
        setShowPassword(true)
    }

    const handleEyeToggle2 = () => {
        setShowPassword(false)
    }

    const handleEyeToggle3 = () => {
        setShowPassword2(true)
    }

    const handleEyeToggle4 = () => {
        setShowPassword2(false)
    }

    return (
        <>
            <div className="register-container">
                <div className="register-bg1"></div>
                <div className="register-bg2"></div>
                <div className="registration-form">
                    <h2>Register Yourself:-</h2>
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
                        <div id='password-block'>
                            <input type={showPassword ? "text" : "password"} name='password' value={user.password} placeholder='Password' onChange={handleChange} /><span id='eye' onMouseDown={handleEyeToggle1} onMouseUp={handleEyeToggle2}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <div id='password-block2'>
                            <input type={showPassword2 ? "text" : "password"} name='confirmPassword' value={user.confirmPassword} placeholder='Confirm Password' onChange={handleChange} /><span id='eye' onMouseDown={handleEyeToggle3} onMouseUp={handleEyeToggle4}>{showPassword2 ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <button type='submit'>Register</button>
                    </form>
                    <p>*Already have an account,<NavLink to='/login'>Login</NavLink></p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register