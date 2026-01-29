// Route private - acessible que sous authentification
import React from 'react'

// Dashboard Agent
// Parametre du compte Agent

// Dashbord Responsable

// Dashbord Admin 

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from '../layouts/AdminLayout';

export default function PrivateRoute({ children, roles }) {
    // const { isAuthenticated, userRole } = useAuth();


    // if (!isAuthenticated) {
    // return <Navigate to="/login" replace />;
    // }


    // if (roles && userRole && !roles.includes(userRole)) {
    // return <Navigate to="/unauthorized" replace />;
    // }

    return children;
}