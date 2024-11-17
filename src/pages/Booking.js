import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuth } from '../store/auth';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Booking = () => {
    const [serviceData, setServiceData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
    const { user, isLoading } = useAuth();

    const [booking, setBooking] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        gender: "male", // Set default gender if needed
        date: "",
        testFor: ""
    });

    // Pre-fill user details when available
    useEffect(() => {
        if (!isLoading && user) {
            setBooking(prevBooking => ({
                ...prevBooking,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
                gender: user.gender || "male", // Default to 'male' if gender is missing
            }));
        }
    }, [isLoading, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value
        }));
    };

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const toastIdRef = useRef(null);

    const getServiceData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/labservices', {
                method: "GET",
            });
            const res_data = await response.json();
            if (response.ok) {
                setServiceData(res_data);
            }
        } catch (error) {
            console.log("Service page:", error);
        }
    };

    useEffect(() => {
        getServiceData();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            if (!toast.isActive(toastIdRef.current)) {
                toastIdRef.current = toast.error("Please Login First", {
                    toastId: 'login-required',
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }
        }
    }, [isLoggedIn, navigate]);

    const handlePayment = () => {
        // Open the modal for payment options
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/booking', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            });
            const res_data = await response.json();
            if (response.ok) {
                toast.success(res_data.message);
                setBooking({
                    ...booking,
                    address: "",
                    date: "",
                    testFor: ""
                });
            } else {
                toast.error(res_data.message);
            }
        } catch (error) {
            console.log("Booking Form error", error);
        }
    };

    return (
        <>
            <div className="booking-container">
                <div className="booking-hero">
                    <h1>Book Your Test Schedule And Give Us A Chance To Make Your Health Issues Heal Fast.</h1>
                    <p>
                        We have many services so you only have to visit a
                        place and make your all test done in no time. We
                        have also a free health checkup program in your
                        first visit to LabLife Solutions. Get your report
                        within 2 days. For more test information, kindly
                        visit our services section on our Home page.
                    </p>
                    <NavLink className='link-style-for-service' to='/'>Services<FaArrowRightLong /></NavLink>
                </div>
                <div className="booking-form-container">
                    <div className="booking-form">
                        <h2>Book A Test:</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="fullName">
                                <input
                                    type="text"
                                    name='firstName'
                                    placeholder='First Name'
                                    value={booking.firstName}
                                    onChange={handleChange}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name='lastName'
                                    placeholder='Last Name'
                                    value={booking.lastName}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <input
                                type="text"
                                name='phone'
                                placeholder='Phone No.'
                                value={booking.phone}
                                onChange={handleChange}
                                readOnly
                            />
                            <input
                                type="text"
                                name='address'
                                placeholder='Address'
                                value={booking.address}
                                onChange={handleChange}
                            />
                            <div className="gender-select">
                                <label htmlFor='male'>
                                    Male
                                    <input
                                        type="radio"
                                        id='male'
                                        name='gender'
                                        value="male"
                                        checked={booking.gender === "male"}
                                        readOnly
                                    />
                                </label>
                                <label htmlFor='female'>
                                    Female
                                    <input
                                        type="radio"
                                        id='female'
                                        name='gender'
                                        value="female"
                                        checked={booking.gender === "female"}
                                        readOnly
                                    />
                                </label>
                                <label htmlFor='other'>
                                    Other
                                    <input
                                        type="radio"
                                        id='other'
                                        name='gender'
                                        value="other"
                                        checked={booking.gender === "other"}
                                        readOnly
                                    />
                                </label>
                            </div>
                            <input
                                type="date"
                                name='date'
                                value={booking.date}
                                onChange={handleChange}
                            />
                            <select name="testFor" value={booking.testFor} onChange={handleChange}>
                                <option value="" disabled>--Select Test--</option>
                                {
                                    serviceData.map((val) => (
                                        <option key={val._id} value={val.testName}>{val.testName}</option>
                                    ))
                                }
                            </select>
                            <button type='button' onClick={handlePayment}>Book</button>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Payment Options</h2>
                        <p>Select your preferred payment method:</p>
                        <p>You have to pay: ₹800</p>
                        <div className="payment-images">
                            <img src="pay.png" alt="payApps" />
                        </div>
                        {/* Payment options can go here */}
                        <div className="modelbtns">
                            <button onClick={() => { setIsModalOpen(false); handleSubmit(); }}>Pay Now</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Booking;
