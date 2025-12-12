// import React from "react";
// import NavSidebar from "./NavSidebar";
// import Header from "./Header";
// import Footer from "./Footer";
// import { Outlet } from "react-router-dom";

// function Layouts() {
//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <NavSidebar />
//       <div className="flex-grow-1 d-flex flex-column">
//         <Header />
//         <main className="flex-grow-1" style={{ background: "#f8f9fa" }}>
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// }
// export default Layouts;

// src/components/Layouts.jsx

import React, { useState, useEffect } from "react";
import NavSidebar from "./NavSidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useParams, useNavigate } from "react-router-dom";

function Layouts() {
    const [collapsed, setCollapsed] = useState(false); // manages sidebar collapse
    const { role } = useParams();
const navigate = useNavigate();
useEffect(() => {
const token = localStorage.getItem('token');
const storedRole = localStorage.getItem('role');


//if (!token) return navigate('/login');
if (!token) return navigate('/');

if (!storedRole || storedRole !== role) {
return navigate('*');
}
}, [role, navigate]);

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <NavSidebar collapsed={collapsed} />
            <div className="flex-grow-1 d-flex flex-column">
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

                <main className="flex-grow-1" style={{ background: "#f8f9fa" }}>
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default Layouts;
