import React, { useEffect,useState } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/custom.css";
import { Dropdown, Col, Nav } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ collapsed, setCollapsed }) {
    const { role } = useParams();
    const navigate = useNavigate();
const [user, setUser] = useState({});

    // useEffect(() => {
    //     if (!userRoles.includes(role)) {
    //         navigate("/");
    //     }
    // }, [role, navigate]);


    const userRoles = ["admin", "imp-exp", "icmr", "committee"];

    useEffect(() => {
        if (!userRoles.includes(role)) navigate("/");

        const loggedInUser = localStorage.getItem("user");
       // console.log(loggedInUser);
        if (loggedInUser) setUser(JSON.parse(loggedInUser));
    }, [role, navigate]);
    const customStyle = {
        boxShadow: "0px 0px 20px 16px rgba(17,17,26,0.08)",
    };

    // const handleLogout = async () => {
    //     try {
    //     const token = localStorage.getItem("token");
    //     console.log("Showing header Token to logout:", token);
    //     const userRole = localStorage.getItem("role"); 
    //     await axios.post(
    //         "http://127.0.0.1:8000/api/logout",
    //         {},
    //         {
    //             headers: {
    //                 Accept: 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //     );
    //     localStorage.clear();
    //     navigate(`/beneficiary/login?role=${userRole}`);
    // } catch (error) {
    //     //console.error("Logout API failed:", error);
    //     const userRole = localStorage.getItem("role"); 
    //     localStorage.clear();
    //     navigate(`/beneficiary/login?role=${userRole || ""}`);
    // }
    // };
const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");

            console.log("Sending logout token:", token);

            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // MUST BE EXACT FORMAT
                        Accept: "application/json",
                    },
                }
            );

            // Clear all session data
            localStorage.clear();

            // Redirect to login
            navigate(`/beneficiary/login?role=${role}`);

        } catch (error) {
            console.error("Logout API failed:", error);

            const role = localStorage.getItem("role");
            localStorage.clear();

            navigate(`/beneficiary/login?role=${role || ""}`);
        }
    };
    return (
        <>
            <header
                className="d-flex align-items-center justify-content-between p-3 border-bottom custom"
                style={customStyle}
            >
                {/* Sidebar Toggle */}
                <Col md={2}>
                    <span
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "25px", cursor: "pointer" }}
                    >
                        <MdMenu />
                    </span>
                </Col>

                {/* Heading */}
                <Col md={6}>
                    <div className="project-heading">
                        <h3
                            className="title-head"
                            style={{
                                fontSize: "25px",
                                color: "#000",
                                fontWeight: "600",
                            }}
                        >
                            Transfer of Human Biological Material (THBM)
                        </h3>
                    </div>
                </Col>

                {/* Profile Menu */}
                <Col className="text-end border-start ps-3">
                    <Nav className="justify-content-end">
                        <Dropdown className="d-flex">
                            <Dropdown.Toggle className="gap-2">
                                <span>Welcome ! </span>
                                 {/* <span>{user.iec_code}</span> */}
                                 <span>
                                {user.iec_code 
                                    ? `${user.iec_code}` 
                                    : `${user.email}`}
                                </span>
                                <span>{user.designation}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                <Dropdown.Item as={Link} to="#">
                                    Profile Setting
                                </Dropdown.Item>

                                <Dropdown.Item as={Link} to={`/${role}/change-password`}>
                                    Change Password
                                </Dropdown.Item>

                                <Dropdown.Item as="button" onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Col>
            </header>
        </>
    );
}

export default Header;
// import React, { useEffect } from "react";
// import "../../assets/css/dashboard.css";
// import { Dropdown, Col, Nav } from "react-bootstrap";
// import { MdMenu } from "react-icons/md";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Header({ collapsed, setCollapsed }) {
//     const { role } = useParams();
//     const navigate = useNavigate();

//     const userRoles = ["admin", "imp-exp", "icmr", "committee"];

//     useEffect(() => {
//         if (!userRoles.includes(role)) {
//             navigate("/"); // Redirect if role is invalid
//         }
//     }, [role, navigate]);
//     const customStyle = {
//         boxShadow: "0px 0px 20px 16px rgba(17,17,26,0.08)",
//     };
// const handleLogout = async () => {
//     try {
//     //   const logoutNew =   await axios.post(
//     //         "http://127.0.0.1:8000/api/logout",
//     //         {},
//     //         {
//     //             headers: {
//     //                 "content-type": "application/json",
//     //                 Authorization: "Bearer " + localStorage.getItem("token"),
//     //             },
//     //         }
//     //     );
//     //     console.log(logoutNew);

//         const userRole = localStorage.getItem("role");

//             localStorage.removeItem("token");
//             localStorage.removeItem("email");
//             localStorage.removeItem("name");
//             localStorage.removeItem("designation");
//             localStorage.removeItem("role");
//         if(userRole){
//             navigate(`/beneficiary/login?role=${userRole}`);
//         }else{
//             navigate("/")
//         }
        

//     } catch (error) {
//         console.error("Logout failed:", error);
//     }
// };





//     return (
//         <>
//             <header
//                 className="d-flex align-items-center justify-content-between p-3 border-bottom custom"
//                 style={customStyle}
//             >
//                 <Col md={2}>
//                     <span
//                         variant="outline-primary"
//                         onClick={() => setCollapsed(!collapsed)}
//                         style={{ fontSize: "25px", cursor: "pointer" }}
//                     >
//                         <MdMenu collapsed={collapsed} />
//                     </span>
//                 </Col>
//                 <Col md={6}>
//                     <div className="project-heading">
//                         <h3
//                             className="title-head"
//                             style={{
//                                 fontSize: "25px",
//                                 color: "#000",
//                                 fontWeight: "600",
//                             }}
//                         >
//                             Transfer of Human Biological Material (THBM)
//                         </h3>
//                     </div>
//                 </Col>
//                 <Col className="text-end border-start ps-3">
//     <Nav className="justify-content-end">
//         <Dropdown>
//             <Dropdown.Toggle
//                 className="gap-2"
                
                
//             >
//                 <span>Welcome !</span>
//                 <span>{role}</span>
//             </Dropdown.Toggle>

//             <Dropdown.Menu align="end">
//                 <Dropdown.Item as={Link} to="#">
//                     Profile Setting
//                 </Dropdown.Item>

//                 <Dropdown.Item as={Link} to={`/${role}/change-password`}>
//                     Change Password
//                 </Dropdown.Item>

//                 <Dropdown.Item as="button" onClick={handleLogout}>
//                     Logout
//                 </Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     </Nav>
// </Col>

//             </header>
//         </>
//     );
// }

// export default Header;

