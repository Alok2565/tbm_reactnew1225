// src/components/NavSidebar.jsx

import React, { useEffect } from "react";
import { Link, useParams, useNavigate, Links } from "react-router-dom";
import "../../assets/css/sidenav.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { GrDashboard } from "react-icons/gr";
import { BiExport } from "react-icons/bi";
import { PiBoxArrowDownLight } from "react-icons/pi";
import { MdAreaChart } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaEnvelope, FaUsers, FaUserPlus, FaSliders } from "react-icons/fa6";

import adminMainlogo from "../../assets/images/icmr_logo.png";
import admin_collapsed from "../../assets/images/imcr-canvas-logo.jpg";

function NavSidebar({ collapsed }) {
    const { role } = useParams();
    const navigate = useNavigate();

    const userRoles = ["admin", "imp-exp", "icmr", "committee"];

    useEffect(() => {
        if (!userRoles.includes(role)) navigate("/not-found");
    }, [role, navigate]);

    const tightItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1px",
    };

    return (
        <>
            <Sidebar collapsed={collapsed ? true : undefined}>
                
                {/* ==== LOGO AREA ==== */}
                <div className="css-1vmkajq text-white">
                    {collapsed ? (
                        <div className="css-kyhzew">
                            <img src={admin_collapsed} alt="collapsed_logo" width="80" />
                        </div>
                    ) : (
                        <Link to="/" className="text-decoration-none">
                            <p className="css-crt1ee">
                                <img
                                    src={adminMainlogo}
                                    className="img-fluid"
                                    alt="admin_logo"
                                />
                            </p>
                        </Link>
                    )}
                </div>

                <Menu>

                    {/* ================= ADMIN SIDEBAR ================= */}
                    {role === "admin" && (
                        <>
                            <MenuItem
                                icon={<GrDashboard color="white" />}
                                style={tightItemStyle}
                                component={
                                    <Link
                                        to="/admin/dashboard/"
                                        className="text-white text-decoration-none"
                                    />
                                }
                            >
                                Dashboard
                            </MenuItem>

                            {/* Home Banner */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Home Banner"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem
                                    icon={<FaSliders color="white" />}
                                    component={<Link to="/admin/sliders" className="text-white text-decoration-none" />}
                                >
                                    All Home Sliders
                                </MenuItem>

                                <MenuItem
                                    icon={<FaSliders color="white" />}
                                    component={<Link to="/admin/slider/add_new" className="text-white text-decoration-none" />}
                                >
                                    Add New Slider
                                </MenuItem>
                            </SubMenu>

                            {/* Role Managers */}
                            <SubMenu
                                icon={<RiUserSettingsFill color="white" />}
                                label="Role Managers"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem
                                    icon={<FaUsers color="white" />}
                                    component={<Link to="/admin/roles" className="text-white text-decoration-none" />}
                                >
                                    All Roles
                                </MenuItem>

                                <MenuItem
                                    icon={<FaUserPlus color="white" />}
                                    component={<Link to="/admin/role/add_new" className="text-white text-decoration-none" />}
                                >
                                    Add New Role
                                </MenuItem>
                            </SubMenu>

                            {/* User Managers */}
                            <SubMenu
                                icon={<FaUsers color="white" />}
                                label="User Managers"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem
                                    icon={<FaUsers color="white" />}
                                    component={<Link to="/admin/users" className="text-white text-decoration-none" />}
                                >
                                    All Users
                                </MenuItem>

                                <MenuItem
                                    icon={<FaUserPlus color="white" />}
                                    component={<Link to="/admin/user/add_new" className="text-white text-decoration-none" />}
                                >
                                    Add New User
                                </MenuItem>
                            </SubMenu>

                            {/* Export Applications */}
                            <SubMenu
                                icon={<BiExport color="white" />}
                                label="Export Applications"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>Apply for new NOC</MenuItem>
                                <MenuItem>Applications under review</MenuItem>
                                <MenuItem>Decision on Submitted Applications</MenuItem>
                                <MenuItem>Reject Applications</MenuItem>
                                <MenuItem>Draft Applications</MenuItem>
                            </SubMenu>

                            {/* Download Letters */}
                            <SubMenu
                                icon={<PiBoxArrowDownLight color="white" />}
                                label="Download Letters"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>Format for Declaration of Recipient</MenuItem>
                                <MenuItem>Download Rejection Letter</MenuItem>
                            </SubMenu>

                            {/* Total NOC */}
                            <SubMenu
                                icon={<MdAreaChart color="white" />}
                                label="Total NOC Issued"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>NOC for NOC Issued</MenuItem>
                            </SubMenu>

                            {/* HS Codes */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="HS Codes"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/hs_codes" />}>All HS Codes</MenuItem>
                                <MenuItem component={<Link to="/admin/hs_code/add_new" />}>Add New Code</MenuItem>
                            </SubMenu>

                            {/* Natural Biomaterials */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Natural Biomaterials"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/natural_biomaterials" />}>All Natural Biomaterials</MenuItem>
                                <MenuItem component={<Link to="/admin/natural_biomaterial/add_new" />}>Add New Natural Biomaterial</MenuItem>
                            </SubMenu>

                            {/* Where were sample collected */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Where Sample Collected"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/where_samples_collected" />}>All Samples Collected</MenuItem>
                                <MenuItem component={<Link to="/admin/where_sample_collected/add_new" />}>Add Sample Collected</MenuItem>
                            </SubMenu>

                            {/* Quantity */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Quantity of Volume Unit"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/volumes" />}>All Volumes</MenuItem>
                                <MenuItem component={<Link to="/admin/volume/add_new" />}>Add New Volume</MenuItem>
                            </SubMenu>

                            {/* Purpose */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Specify Purpose End Use"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/specify_purpose_end_uses" />}>All Specify Purposes</MenuItem>
                                <MenuItem component={<Link to="/admin/specify_purpose_end_use/add_new" />}>Add New Specify Purpose</MenuItem>
                            </SubMenu>

                            {/* Research */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Research Analyses"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/used_research_analyses" />}>All Research Analyses</MenuItem>
                                <MenuItem component={<Link to="/admin/used_research_analysis/add_new" />}>Add New Research Analysis</MenuItem>
                            </SubMenu>

                            {/* Samples Storage */}
                            <SubMenu
                                icon={<FaSliders color="white" />}
                                label="Purpose Sample Storage"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/admin/purpose_sample_storages" />}>All Sample Storage</MenuItem>
                                <MenuItem component={<Link to="/admin/purpose_sample_storage/add_new" />}>Add New Sample Storage</MenuItem>
                            </SubMenu>
                        </>
                    )}

                    {/* ================= IMP-EXP SIDEBAR ================= */}
                    {role === "imp-exp" && (
                        <>
                            <MenuItem
                                icon={<GrDashboard color="white" />}
                                style={tightItemStyle}
                                component={<Link to="/imp-exp/dashboard/" className="text-white text-decoration-none" />}
                            >
                                Dashboard
                            </MenuItem>

                            <SubMenu
                                icon={<BiExport color="white" />}
                                label="Export Applications"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem component={<Link to="/imp-exp/exporter/apply-noc-application"/>}>Apply for new NOC</MenuItem>
                                <MenuItem component={<Link to="/imp-exp/applications"/>}>Applications under review</MenuItem>
                                <MenuItem>Decision on Submitted Applications</MenuItem>
                                <MenuItem>Rejected Applications</MenuItem>
                                <MenuItem>Draft Applications</MenuItem>
                            </SubMenu>

                            <SubMenu
                                icon={<PiBoxArrowDownLight color="white" />}
                                label="Download Letters"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>Format for Declaration of Recipient</MenuItem>
                                <MenuItem>Download Rejection Letter</MenuItem>
                            </SubMenu>

                            <SubMenu
                                icon={<MdAreaChart color="white" />}
                                label="Decision"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>NOC for NOC Issued</MenuItem>
                            </SubMenu>
                        </>
                    )}

                    {/* ================= ICMR SIDEBAR ================= */}
                    {role === "icmr" && (
                        <>
                            <MenuItem
                                icon={<GrDashboard color="white" />}
                                style={tightItemStyle}
                                component={<Link to="/icmr/dashboard/" className="text-white text-decoration-none" />}
                            >
                                Dashboard
                            </MenuItem>

                            <SubMenu
                                icon={<BiExport color="white" />}
                                label="Export Applications"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>Fresh Applications Received</MenuItem>
                                <MenuItem>Archive Applications Received</MenuItem>
                                <MenuItem>Reject Applications</MenuItem>
                                <MenuItem>Applications with Committee Member</MenuItem>
                            </SubMenu>

                            <SubMenu
                                icon={<MdAreaChart color="white" />}
                                label="Export NOC Issued"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>NOC for Exporters</MenuItem>
                            </SubMenu>

                            <MenuItem icon={<FaEnvelope color="white" />} className="border-top">
                                Resend Mail
                            </MenuItem>
                        </>
                    )}

                    {/* ================= COMMITTEE SIDEBAR ================= */}
                    {role === "committee" && (
                        <>
                            <MenuItem
                                icon={<GrDashboard color="white" />}
                                style={tightItemStyle}
                                component={<Link to="/committee/dashboard/" className="text-white text-decoration-none" />}
                            >
                                Dashboard
                            </MenuItem>

                            <SubMenu
                                icon={<BiExport color="white" />}
                                label="Export Applications"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>Fresh Applications Received</MenuItem>
                                <MenuItem>Applications with Decision</MenuItem>
                                <MenuItem>Approve Applications</MenuItem>
                            </SubMenu>

                            <SubMenu
                                icon={<MdAreaChart color="white" />}
                                label="Export NOC Issued"
                                className="border-top"
                                style={tightItemStyle}
                            >
                                <MenuItem>NOC for Exporters</MenuItem>
                            </SubMenu>
                        </>
                    )}

                </Menu>
            </Sidebar>
        </>
    );
}

export default NavSidebar;
