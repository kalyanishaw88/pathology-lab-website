import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Error = () => {
    const navigate = useNavigate()
    const toastIdRef = useRef(null); // Use a ref to keep track of toastId
    useEffect(() => {
        navigate('/')

        if (!toast.isActive(toastIdRef.current)) {
            toastIdRef.current = toast.error("404! No Page Found", {
                toastId: 'login-required',
                autoClose: 3000, // Display the toast for 5000 milliseconds (5 seconds)
                closeOnClick: true,
            });
        }
    })
    return null
}
export default Error