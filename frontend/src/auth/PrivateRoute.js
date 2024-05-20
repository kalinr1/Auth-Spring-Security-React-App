import {useAuth} from "./AuthContext";
import {Navigate} from "react-router-dom";
import React from "react";

const PrivateRoute = ({ Component }) => {
    const { isAuthenticated123 } = useAuth();

    return isAuthenticated123() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;