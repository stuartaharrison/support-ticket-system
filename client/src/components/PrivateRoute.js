import React from "react";
import { Navigate } from "react-router-dom";
import { useGetSessionQuery } from "../redux/apis/authApi";

const PrivateRoute = ({ deniedAccessRoute = "/login", userTypeRequired = null, children }) => {
    const { data: session, isLoading } = useGetSessionQuery();
    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }
    else if (session && userTypeRequired) {
        return Array.isArray(userTypeRequired) && userTypeRequired.includes(session.userType)
            ? children
            : <Navigate replace to={deniedAccessRoute} />
    }
    else {
        return session 
            ? children 
            : <Navigate replace to={deniedAccessRoute} />
    }
};

export default PrivateRoute;