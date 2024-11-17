import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Booking = () => {
    const [booking, setBooking] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        testDate: "",
        price: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevElem) => ({
            ...prevElem,
            [name]: value
        }));
    };


    const navigate = useNavigate();
    const { id } = useParams()

    const getBookingToConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/bookigConfirmation/${id}`, {
                method: "GET"
            })
            const res_data = await response.json()
            if (response.ok) {
                setBooking(res_data)
            }
        } catch (error) {
            console.log(error);

        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/admin/bookigConfirmation', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking)
            })
            const res_data = await response.json()
            if (response.ok) {
                toast.success(res_data.message)
                navigate('/adminpanel/bookings')
            } else {
                toast.error(res_data.message)
            }

        } catch (error) {
            console.log("Booking Form error", error);
        }
    };


    useEffect(() => {
        getBookingToConfirm()
    }, [])
    return (
        <>
            <div className="booking-confirm-container">
                <div className="confirm-form">
                    <h2>Confirm This Test:-</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="fullName">
                            <input type="text" name='firstName' placeholder='First Name' value={booking.firstName} onChange={handleChange} />
                            <input type="text" name='lastName' placeholder='Last Name' value={booking.lastName} onChange={handleChange} />
                        </div>
                        <input type="text" name='phone' placeholder='Phone No.' value={booking.phone} readOnly onChange={handleChange} />
                        <label>Give a date for test:-</label>
                        <input type="date" name='testDate' placeholder='Test Date' value={booking.testDate} onChange={handleChange} />
                        <input type="text" name='price' placeholder='Test Charges In Rupees.' value={booking.price} onChange={handleChange} />
                        <button type='submit'>Confirm</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Booking;
