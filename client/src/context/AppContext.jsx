import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                toast.success('Logged in successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
    };

    // Add other context values as needed...
    const value = { user, setUser, token, setToken, login, logout, backendUrl };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};