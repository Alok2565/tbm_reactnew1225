import React from 'react';
import { useLocation } from 'react-router-dom';
import Bgbredcrumb from "../../assets/images/bg-bredcrumb.jpg";

function BreadcrumbBack({ title = "Page Title" }) {
    const location = useLocation();

    // Pages to hide the background image
    const excludedRoutes = ["/", "/login", "/register", "/reset-password", "/forgot-password-link", "/forgot-password"];

    if (excludedRoutes.includes(location.pathname)) return null;

    return (
        <section
            className="containter-xxl section position-relative py-3"
            style={{
                backgroundImage: `url(${Bgbredcrumb})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="container-fluid position-relative">
                <div className="page-title-box">
                    <div className="page-title">
                        <nav className="p-5">
                            <h1
                                className="font-weight-bold"
                                style={{ color: "#022759", fontWeight: "700" }}
                            >
                               {title}
                            </h1>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BreadcrumbBack;

