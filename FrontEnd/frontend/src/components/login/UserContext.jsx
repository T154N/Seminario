import React, { createContext, useState, useEffect } from 'react';
import loginService from '../../services/login/login.service';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(loginService.estaIniciadaSesion());
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};