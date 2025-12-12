import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { Container } from "react-bootstrap";

function Breadcrumb() {
    const location = useLocation();

    // Pages to exclude breadcrumb
    const excludedRoutes = ["/", "/login", "/register", "/reset-password", "/forgot-password-link", "/forgot-password"];

    if (excludedRoutes.includes(location.pathname)) {
        return null;
    }

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className="bg-light p-2 rounded py-3">
            <Container>
                <ol className="breadcrumb mb-0 d-flex align-items-center flex-wrap">
                    <li className="breadcrumb-item" style={{ fontSize: "17px", fontWeight: "700", textDecoration: "none" }}>
                        <Link to="/" className="text-decoration-none">Home</Link>
                    </li>

                    {pathnames.map((value, index) => {
                        const to = "/" + pathnames.slice(0, index + 1).join("/");
                        const isLast = index === pathnames.length - 1;
                        const label = decodeURIComponent(value.replace(/-/g, " "))
                            .replace(/\b\w/g, (char) => char.toUpperCase());

                        return (
                            <React.Fragment key={to}>
                                <li className="px-2 text-muted d-flex align-items-center">
                                    <FaAngleRight />
                                </li>

                                {isLast ? (
                                    <li className="breadcrumb-item active" aria-current="page" style={{ color: "#132573", fontSize: "17px", fontWeight: "700" }}>
                                        {label}
                                    </li>
                                ) : (
                                    <li className="breadcrumb-item">
                                        <Link to={to}>{label}</Link>
                                    </li>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ol>
            </Container>
        </nav>
    );
}

export default Breadcrumb;