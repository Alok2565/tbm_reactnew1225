// src/components/LoginRouter.js
// import React, { useEffect,useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserLogin from './UserLogin';
// import ImpExpLogin from './ImpExpLogin';
// import axios from 'axios';

// const LoginRouter = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const queryParams = new URLSearchParams(location.search);
//     const role = queryParams.get('role');
//      const [roles, setRoles] = useState([]);

//     const fetchData = async () => {
//         try {
//             const res = await axios.get("http://127.0.0.1:8000/api/roles");
//             setRoles(res.data.data || []);
//         } catch (error) {
//             console.error("Error fetching roles:", error);
//             alert("Failed to fetch roles. Please try again later.");
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);
//     useEffect(() => {
//         if (!role || !['admin', 'imp-exp', 'icmr', 'committee'].includes(role)) {
//             navigate('/');
//         }
//     }, [role, navigate]);
//     if (role === 'admin') {
//         <h2>Super Admin Login</h2>
//         return <UserLogin />;
//     } else if (role === 'imp-exp') {
//         <h2>Importer Exporter Login</h2>
//         return <ImpExpLogin />;
//     } else if (role === 'icmr') {
//         <h2>ICMR Officer Login</h2>
//         return <UserLogin />;
//     } else if (role === 'committee') {
//         <h2>ICMR Officer Login</h2>
//         return <UserLogin />;
//     }

//     return null; // While redirecting
// };

// export default LoginRouter;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLogin from './UserLogin';
import ImpExpLogin from './ImpExpLogin';
import axios from 'axios';

const LoginRouter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const roleSlug = queryParams.get('role'); // role from URL

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch roles from API
    const fetchRoles = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/roles");
            setRoles(res.data.data || []);
        } catch (error) {
            console.error("Error fetching roles:", error);
            alert("Failed to fetch roles. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    // Redirect only after roles are loaded
    useEffect(() => {
        if (!loading) {
            const validRole = roles.find(r => r.role_slug === roleSlug);
            if (!roleSlug || !validRole) {
                navigate('/');
            }
        }
    }, [roleSlug, roles, loading, navigate]);

  
        switch (roleSlug) {
            case 'admin':
                return (
                    <>
                        <UserLogin />
                    </>
                );
            case 'imp-exp':
                return (
                    <>
                        <ImpExpLogin />
                    </>
                );
            case 'icmr':
                return (
                    <>
                        <UserLogin />
                    </>
                );
            case 'committee':
                return (
                    <>
                        <UserLogin />
                    </>
                );
            default:
                return null;
        }
        
    };

    

export default LoginRouter;

