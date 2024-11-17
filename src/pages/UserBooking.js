import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

const UserBooking = () => {
    const { isLoggedIn } = useAuth();
    const [bookStatus, setBookStatus] = useState(null)
    const navigate = useNavigate();
    const toastIdRef = useRef(null); // Use a ref to keep track of toastId
    const { token } = useAuth()

    const getBookingStatusData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/userbooking', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const res_data = await response.json()
            if (response.ok) {
                setBookStatus(res_data)
            }
        } catch (error) {
            console.log("Service page:", error);
        }
    }


    useEffect(() => {
        getBookingStatusData()
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');

            // Show the error toast and set the toast ID, with a specific autoClose time
            if (!toast.isActive(toastIdRef.current)) {
                toastIdRef.current = toast.error("Please Login First", {
                    toastId: 'login-required',
                    autoClose: 3000, // Display the toast for 5000 milliseconds (5 seconds)
                    closeOnClick: true,
                });
            }
        }
    }, [isLoggedIn, navigate]);
    return (
        <>
            <div className="userDetail-container">
                <div className="userDetail-hero">
                    <h1>Keep petience and be happy, untill we process your request.</h1>
                    <p>
                        We have many services so you only have to visit a
                        place and make your all test done in no time. We
                        have also a free health checkup programme in your
                        first visit in LabLife Solutions. Get your report
                        within 2 days. For more test information kindly
                        visit our services section in our Home page.
                    </p>
                    <NavLink className='link-style-for-service' to='/'>Services<FaArrowRightLong /></NavLink>
                </div>
                <div className="userDetail-form-container">
                    <div className="userDetail-form">
                        {bookStatus ? (
                            <>
                                <h2>Booking Confirmed:-</h2>
                                <p>{`Hello, ${bookStatus.firstName} your test request has been accepted and a proper schedule has been created on ${bookStatus.testDate}, i hope you will be on time.`}</p>
                                <p>{`We will make a reminder call just before 2 days of your schedule on your given phone no. ${bookStatus.phone}, you can also contact us for further query on this no. 8027845103`}</p>
                                <p>Test Date: {new Date(bookStatus.testDate).toLocaleDateString()}</p>
                                <p>Price: ₹{bookStatus.price}</p>
                                <p>Please go through the details about the test from our services page and carefully follow the consiquiences.</p>
                            </>
                        ) : (
                            <h1>Sorry! Your request is still on pending...</h1>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserBooking