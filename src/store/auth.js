import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem('token', serverToken)
    }

    const isLoggedIn = !!token
    console.log("isLoggedIn:", isLoggedIn);

    const logOut = () => {
        setUser('')
        setToken('')
        return localStorage.removeItem('token')
    }
    const getLoggedInUserDetails = useCallback(async (req, res) => {
        if (!token) {
            return null
        }
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const res_data = await response.json()
            if (response.ok) {
                setUser(res_data)
                console.log(res_data);
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("getLoggedInUserDetails in store error:", error);
        } finally {
            setIsLoading(false)

        }
    }, [token])
    useEffect(() => {
        getLoggedInUserDetails()
    }, [token, getLoggedInUserDetails])

    return (
        <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, user, isLoading, logOut, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}