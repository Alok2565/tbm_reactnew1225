import React, { useEffect } from "react";
import "../../assets/css/dashboard.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

// Import your icons
import { CiViewList } from "react-icons/ci";
import { FaEdit, FaListAlt } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";
import { TiArrowRightThick } from "react-icons/ti";
import useTitle from "../hooks/useTitle";
function Dashboard() {
    useTitle("Dashboard");
    const { role } = useParams();
    const navigate = useNavigate();

    const userRoles = ["admin", "imp-exp", "icmr", "committee"];

    useEffect(() => {
        if (!userRoles.includes(role)) {
            navigate("/not-found"); // Redirect if role is invalid
        }
    }, [role, navigate]);

    const DashboardCard = ({ title, count, icon: Icon, bgColor }) => (
        <Col sm={6} md={4} lg={3} className="mb-3">
            <div
                className="card text-white h-100"
                style={{ backgroundColor: bgColor }}
            >
                <div className="card-body d-flex flex-column justify-content-between">
                    <p className="mb-2 fw-bold" style={{ fontSize: "15px" }}>
                        {title}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {count}
                        </span>
                        <Icon style={{ fontSize: "25px" }} />
                    </div>
                    <p className="mt-auto mb-0">
                        <Link
                            to="#"
                            className="text-white text-decoration-none fw-bold"
                        >
                            <TiArrowRightThick /> More info...
                        </Link>
                    </p>
                </div>
            </div>
        </Col>
    );

    const adminCards = [
        {
            title: "Applications Submitted",
            count: 3,
            icon: CiViewList,
            bgColor: "#688A22",
        },
        {
            title: "Applications Under Review",
            count: 3,
            icon: FaEdit,
            bgColor: "#67707F",
        },
        {
            title: "Decision on Submitted Applications",
            count: 3,
            icon: FaListAlt,
            bgColor: "#F78800",
        },
        {
            title: "Total Draft Applications",
            count: 3,
            icon: RiDraftFill,
            bgColor: "#D12E00",
        },
    ];
    const imp_expCards = [
        {
            title: "Applications Submitted",
            count: 3,
            icon: CiViewList,
            bgColor: "#688A22",
        },
        {
            title: "Applications Under Review",
            count: 3,
            icon: FaEdit,
            bgColor: "#67707F",
        },
        {
            title: "Decision on Submitted Applications",
            count: 3,
            icon: FaListAlt,
            bgColor: "#F78800",
        },
        {
            title: "Total Draft Applications",
            count: 3,
            icon: RiDraftFill,
            bgColor: "#D12E00",
        },
    ];
    const icmrCards = [
        {
            title: "Total Exporters Registered",
            count: 3,
            icon: CiViewList,
            bgColor: "#00d11a94",
        },
        {
            title: "Fresh Applications Received",
            count: 3,
            icon: FaEdit,
            bgColor: "#688A22",
        },
        {
            title: "Applications with Committee Member",
            count: 3,
            icon: FaListAlt,
            bgColor: "#00d197",
        },
        {
            title: "NOC Issued",
            count: 3,
            icon: FaListAlt,
            bgColor: "#F78800",
        },
        {
            title: "Applications denied NOC",
            count: 3,
            icon: RiDraftFill,
            bgColor: "#D12E00",
        },
    ];

    const committeeCards = [
        {
            title: "Fresh Application Received for Comments",
            count: 3,
            icon: CiViewList,
            bgColor: "#688A22",
        },
        {
            title: "Applications with Comments Sent to ICMR",
            count: 3,
            icon: FaEdit,
            bgColor: "#67707F",
        },
        {
            title: "Applications with Decision",
            count: 3,
            icon: FaListAlt,
            bgColor: "#F78800",
        },
    ];
    return (
        <section className="page_wrapper">
            <Container fluid>
                <Row>
                    <Col className="py-2">
                        <h4 className="text-dark">
                            <span>{role}</span> Dashboard
                        </h4>
                    </Col>
                </Row>
                <Row>
                    {role === "admin" && (
                        <Col className="w-100">
                            <div className="dashboard-content">
                                <Card className="border-none custom_card">
                                    <Card.Body>
                                        <Row>
                                            {adminCards.map((card, index) => (
                                                <DashboardCard
                                                    key={index}
                                                    title={card.title}
                                                    count={card.count}
                                                    icon={card.icon}
                                                    bgColor={card.bgColor}
                                                />
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    )}

                    {role === "imp-exp" && (
                        <Col className="w-100">
                            <div className="dashboard-content">
                                <Card className="border-none custom_card">
                                    <Card.Body>
                                        <Row>
                                            {imp_expCards.map((card, index) => (
                                                <DashboardCard
                                                    key={index}
                                                    title={card.title}
                                                    count={card.count}
                                                    icon={card.icon}
                                                    bgColor={card.bgColor}
                                                />
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    )}

                    {role === "icmr" && (
                        <Col className="w-100">
                            <div className="dashboard-content">
                                <Card className="border-none custom_card">
                                    <Card.Body>
                                        <Row>
                                            {icmrCards.map((card, index) => (
                                                <DashboardCard
                                                    key={index}
                                                    title={card.title}
                                                    count={card.count}
                                                    icon={card.icon}
                                                    bgColor={card.bgColor}
                                                />
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    )}

                    {role === "committee" && (
                        <Col className="w-100">
                            <div className="dashboard-content">
                                <Card className="border-none custom_card">
                                    <Card.Body>
                                        <Row>
                                            {committeeCards.map(
                                                (card, index) => (
                                                    <DashboardCard
                                                        key={index}
                                                        title={card.title}
                                                        count={card.count}
                                                        icon={card.icon}
                                                        bgColor={card.bgColor}
                                                    />
                                                )
                                            )}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
}

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import API from "../../utils/http"

// export default function Dashboard() {
//   const [rolesCount, setRolesCount] = useState({});

//   useEffect(() => {
//     API.get("admin/dashboard")
//       .then(res => {
//         if (res.data.success) {
//           setRolesCount(res.data.data);
//         }
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Total Admins: {rolesCount.admin || 0}</p>
//       <p>Total Users: {rolesCount.user || 0}</p>
//     </div>
//   );
// }