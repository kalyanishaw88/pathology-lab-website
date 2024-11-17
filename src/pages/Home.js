import { NavLink } from "react-router-dom"
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from "../components/Footer";
import { useCallback, useEffect, useState } from "react";
import Servicepopup from "../components/Servicepopup";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Home = () => {
    const [serviceData, setServiceData] = useState([])
    const [selectedTest, setSelectedTest] = useState('')
    const { isLoggedIn } = useAuth()
    const getServiceData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/labservices', {
                method: "GET",
            })
            const res_data = await response.json()
            if (response.ok) {
                setServiceData(res_data)
            }
        } catch (error) {
            console.log("Service page:", error);
        }
    }

    useEffect(() => {
        getServiceData()
    }, [])

    const handleReadMore = useCallback(
        (testVal) => {
            if (!isLoggedIn) {
                // Show error toast if not logged in
                toast.error("Login to see test details", {
                    toastId: "login-required",
                    autoClose: 3000, // Display the toast for 3000 milliseconds (3 seconds)
                    closeOnClick: true,
                });
                return;
            }
            // Set selected test if logged in
            setSelectedTest(testVal);
        },
        [isLoggedIn]
    );

    const closePopup = () => {
        setSelectedTest(null);
    };
    return (
        <>
            <div className="home-container">
                <div className="home-bg">
                    <div className="about-text">
                        <h1>Get All Test Done Here<br /> With Our Experienced Pathologist</h1>
                        <p>A pathology lab near your city to serve an accurate test result to make your life live long. </p>
                        <NavLink className='link-style-for-booking' to='/booktest'>Book Now<FaArrowRightLong /></NavLink>
                        <p>*Click the button above and complete a quick application to receive an email with more information.</p>
                    </div>
                    <div className="about-image">
                        <img src="doctor1.png" alt="doctor" />
                    </div>
                </div>
                <div className="about-us">
                    <p>We take care your health and it's our responsibility</p>
                    <p>Individualized health consulting</p>
                    <p>
                        Hello, there this is me as Anonymus Person, i own this lab since 2005,
                        there will be other branches we have in many cities. We provide an accrate test result,
                        with our hi-tech machines and experieced Pathologists. Be confidence to visit here or you can simply book a
                        date to make your test done. Kindly, register yourself by clicking the below button and give us a chance to serve
                        you better.
                    </p>
                    <div className="home-btns">
                        {
                            isLoggedIn ? (<NavLink to='/userbooking' className='home-btn'><button>Your Booking</button></NavLink>) : (
                                <>
                                    <NavLink to='/login' className='home-btn'><button>Log In</button></NavLink>
                                    <NavLink to='/register' className='home-btn'><button>Register</button></NavLink>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="our-services">
                    <h1>Tests Available:-</h1>
                    <div className="home-service-card">
                        {
                            serviceData.map((val, index) => {
                                return (
                                    <div className="service-card" key={val._id} onClick={() => handleReadMore(val)}>
                                        <p>{index + 1}</p>
                                        <p>{val.testName}</p>
                                        <p>{val.parameters}</p>
                                        <div className="read-more">
                                            <p>₹.{val.price}</p>
                                            <button>Read More...</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="advice-banner">
                    <p>Be proactive, not reactive, with your health</p>
                    <img src="Glucose.png" alt="" />
                    <p>Get an assessment of your blood test using scientifically-validated optimal reference ranges that has taken years of practice and research to uncover. Use this to make more informed decisions about your lifestyle, diet, fitness, and supplements.</p>
                    <NavLink className='link-style-for-booking-down' to='/booktest'>Book Now<FaArrowRightLong /></NavLink>
                    <p>*Click the button above and complete a quick application to receive an email with more information.</p>
                </div>
                {
                    selectedTest && isLoggedIn && (
                        <Servicepopup onClose={closePopup} serviceDetails={selectedTest} />
                    )
                }
                <Footer />
            </div>
        </>
    )
}

export default Home