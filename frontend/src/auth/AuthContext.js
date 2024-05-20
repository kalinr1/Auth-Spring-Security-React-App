import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return Cookies.get('auth_token') || null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setIsAuthenticated(true);
                }
                setIsAdmin(decodedToken.role === 'ADMIN');
            } catch (error) {
                logout();
            }
        }
    }, [token]);

    const login = (newToken) => {
        try {
            const decodedToken = jwtDecode(newToken);
            setToken(newToken);
            setIsAuthenticated(true);
            setIsAdmin(decodedToken.role === 'ADMIN');

        } catch (error) {
            console.error("Invalid token on login", error);
        }
    };

    const logout = () => {
        document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict';
        setToken(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    const isAuthenticated123 = () => {
        if (!token) {
            return false;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            // Token is expired
            logout();
            return false;
        }

        return true;
    };


    const value = {
        token,
        login,
        logout,
        isAuthenticated,
        isAuthenticated123,
        isAdmin
    };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



//import React, { createContext, useContext, useEffect, useState } from 'react';
// import {jwtDecode} from "jwt-decode";
// import Cookies from "js-cookie";
//
// const AuthContext = createContext();
//
// export const useAuth = () => useContext(AuthContext);
//
// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(() => {
//         return Cookies.get('auth_token') || null;
//     });
//     const [isAdmin, setIsAdmin] = useState(false);
//
//     useEffect(() => {
//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 setIsAdmin(decodedToken.role === 'ADMIN');
//             } catch (error) {
//                 logout();
//             }
//         }
//     }, [token]);
//
//     const login = (newToken) => {
//         try {
//             const decodedToken = jwtDecode(newToken);
//             document.cookie = `auth_token=${newToken}; Path=/; Secure; SameSite=Strict`;
//             setToken(newToken);
//             setIsAdmin(decodedToken.role === 'ADMIN');
//
//         } catch (error) {
//             console.error("Invalid token on login", error);
//         }
//     };
//
//     const logout = () => {
//         document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict';
//         setToken(null);
//         setIsAdmin(false);
//     };
//
//     const isAuthenticated = () => {
//         if (!token) {
//             return false;
//         }
//
//         try {
//             const decodedToken = jwtDecode(token);
//             const currentTime = Date.now() / 1000;
//             if (decodedToken.exp < currentTime) {
//                 logout();
//                 return false;
//             }
//             return true;
//         } catch (error) {
//             console.error("Invalid token during authentication check", error);
//             logout();
//             return false;
//         }
//     };
//
//     const value = {
//         token,
//         login,
//         logout,
//         isAuthenticated,
//         isAdmin
//     };
//
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };