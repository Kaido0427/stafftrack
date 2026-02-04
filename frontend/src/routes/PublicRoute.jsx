// Route public accessible sans roles ou permissions
import React from 'react'

// Connection
// Mot de passe oublié 

export default function PublicRoute({ children }) {
    // const { isAuthenticated } = useAuth();

    // if (isAuthenticated) {
    // return <Navigate to="/dashboard" replace />;
    // }

    return children;
}