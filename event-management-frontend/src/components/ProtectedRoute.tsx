import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    // Redirect to login if no access token is found
    if (!token) {
        return <Navigate to="/login" />;
    }
    

    return children;
};

export default ProtectedRoute;
