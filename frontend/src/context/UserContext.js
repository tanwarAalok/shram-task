import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL} from "../utils";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = async (updatedData) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/user/${user.username}`, updatedData);
            saveUser(response.data);
        } catch (error) {
            console.error('Error updating user data', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, saveUser }}>
            {children}
        </UserContext.Provider>
    );
};
