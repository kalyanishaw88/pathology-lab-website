import React, { useEffect, useRef, useState } from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { BiSolidDownArrow } from "react-icons/bi";
const Navbar = () => {
    const { isLoggedIn, user } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="navbar-container">
                <div className="nav-logo">
                    <NavLink className='home-nav-link' to='/'>LabLife Solutions</NavLink>
                </div>
                <div className="nav-menu">
                    <NavLink className='link-style' to='/'>Home</NavLink>
                    <NavLink className='link-style' to='/booktest'>Book Now</NavLink>
                    {
                        isLoggedIn ? null : (
                            <>
                                <NavLink className='link-style' to='/login'>Log In</NavLink>
                                <NavLink className='link-style' to='/register'>Register</NavLink>
                            </>
                        )
                    }

                </div>
                <div className="admin-nav">
                    {user ? (
                        <div className="user-dropdown">
                            <span className="user-greeting" onClick={handleToggleDropdown}>
                                Hello ✅ {user.firstName}
                                <span id="arrowDown">
                                    &nbsp;<BiSolidDownArrow />
                                </span>
                            </span>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to='/logout' onClick={handleCloseDropdown}>
                                        Logout
                                    </NavLink>
                                    <NavLink className="dropdown-item1" to='/userbooking' onClick={handleCloseDropdown}>
                                        Your Booking
                                    </NavLink>
                                    <NavLink className="dropdown-item2" to='/userreport' onClick={handleCloseDropdown}>
                                        Your Report
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink className="link-style" to="/admin">
                            Admin
                        </NavLink>
                    )}

                </div>
            </div>
        </>
    )
}

export default Navbar
