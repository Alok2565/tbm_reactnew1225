// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { getToken } from '../../hooks/authService';

// export default function ProtectedRoute({ children }) {
//     const role = ['admin','icmr','committee'];
//     const token = getToken();
//     if (!token) return <Navigate to={`/login?role=${role[0]}`} replace />;
//     return children;
// }
// src/components/ProtectedRoute.jsx
// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const [isAuthorized, setIsAuthorized] = useState(null); // null = loading
//     const location = useLocation();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         // Check if logged in
//         if (!token) {
//             setIsAuthorized(false); // Not logged in
//             return;
//         }

//         // Optional: Validate role from URL query if needed
//         const queryParams = new URLSearchParams(location.search);
//         const roleParam = queryParams.get("role");

//         const allowedRoles = ["admin", "icmr", "committee", "imp-exp"];

//         // If role param exists, check if it's valid
//         if (roleParam && !allowedRoles.includes(roleParam)) {
//             setIsAuthorized(false); // Invalid role
//             return;
//         }

//         // If user's role is valid → allow access
//         if (allowedRoles.includes(role)) {
//             setIsAuthorized(true);
//         } else {
//             setIsAuthorized(false);
//         }
//     }, [location.search]);

//     if (isAuthorized === null) return null; // Loading state

//     if (!isAuthorized) {
//         return <Navigate to="/" replace />; // Redirect to home if unauthorized
//     }

//     return children; // Authorized → render dashboard
// };

// export default ProtectedRoute;

import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const { role: urlRole } = useParams();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (urlRole && role !== urlRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

// import React, { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ children }) => {
//     const [isAuthorized, setIsAuthorized] = useState(null); // null = loading
//     const [allowedRoles, setAllowedRoles] = useState([]);
//     const location = useLocation();

//     useEffect(() => {
//         // Fetch roles dynamically from API
//         const fetchRoles = async () => {
//             try {
//                 const res = await axios.get("http://127.0.0.1:8000/api/roles");
//                 const rolesData = res.data.data || [];
//                 const roleSlugs = rolesData.map(r => r.role_slug); // get slugs only
//                 setAllowedRoles(roleSlugs);
//             } catch (error) {
//                 console.error("Failed to fetch roles:", error);
//                 setAllowedRoles([]); // fallback to empty
//             }
//         };

//         fetchRoles();
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role"); // user's role
//         const queryParams = new URLSearchParams(location.search);
//         const roleParam = queryParams.get("role"); // role from URL

//         // Wait until allowedRoles are loaded
//         if (allowedRoles.length === 0) return;

//         // Not logged in
//         if (!token) {
//             setIsAuthorized(false);
//             return;
//         }

//         // If roleParam exists, check if it's valid
//         if (roleParam && !allowedRoles.includes(roleParam)) {
//             setIsAuthorized(false);
//             return;
//         }

//         // Check if user's role is in allowedRoles
//         if (allowedRoles.includes(role)) {
//             setIsAuthorized(true);
//         } else {
//             setIsAuthorized(false);
//         }
//     }, [allowedRoles, location.search]);

//     if (isAuthorized === null) return null; // Loading state

//     if (!isAuthorized) {
//         return <Navigate to="/" replace />; // Redirect to home if unauthorized
//     }

//     return children; // Authorized → render dashboard
// };

// export default ProtectedRoute;
