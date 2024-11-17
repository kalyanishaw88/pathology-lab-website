import { useEffect, useRef } from 'react'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const toastIdRef = useRef(null); // Use a ref to keep track of toastId

    useEffect(() => {
        // Log out the user and navigate to home
        logOut();
        navigate('/');
        // Show toast message once when component mounts
        if (!toast.isActive(toastIdRef.current)) {
            toastIdRef.current = toast.success("Oops! You logged out...", {
                toastId: 'login-required',
                autoClose: 3000, // Display the toast for 5000 milliseconds (5 seconds)
                closeOnClick: true,
            });
        }
    }, [logOut, navigate]);

    return null
};

export default Logout