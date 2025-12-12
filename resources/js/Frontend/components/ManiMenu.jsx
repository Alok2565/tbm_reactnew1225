import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";

function ManiMenu() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Function to assign active class
  const getNavLinkClass = (path) =>
    active === path ? "active-menu nav-link text-white px-3 py-2 rounded" : "nav-link text-white px-3 py-2";

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="navbar"    
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Left Menu */}
          <Nav className="me-auto gap-3">
            <Link to="/" onClick={() => setActive("/")} className={getNavLinkClass("/")}>
              Home
            </Link>
            <Link to="/about-us" onClick={() => setActive("/about-us")} className={getNavLinkClass("/about-us")}>
              About Us
            </Link>
            <Link to="/user-manual" onClick={() => setActive("/user-manual")} className={getNavLinkClass("/user-manual")}>
              User Manual
            </Link>
            <Link to="/contact-us" onClick={() => setActive("/contact-us")} className={getNavLinkClass("/contact-us")}>
              Contact Us
            </Link>
          </Nav>

          {/* Right Buttons */}
          <Nav className="ms-auto d-flex gap-2">
            {/* <Dropdown align="center">
              <Dropdown.Toggle variant="light">Register</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/beneficiary/register?role=imp-exp">Importer/Exporter</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="center">
              <Dropdown.Toggle variant="light">Login</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/beneficiary/login?role=imp-exp">Import/Export Login</Dropdown.Item>
                <Dropdown.Item as={Link} to="/beneficiary/login?role=icmr">ICMR Official</Dropdown.Item>
                <Dropdown.Item as={Link} to="/beneficiary/login?role=committee">Committee Login</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <Dropdown align="center" className="dropdown-register">
  <Dropdown.Toggle variant="light">Register</Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item as={Link} to="/beneficiary/register?role=imp-exp">
      Importer/Exporter
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

<Dropdown align="center" className="dropdown-login">
  <Dropdown.Toggle variant="light">Login</Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item as={Link} to="/beneficiary/login?role=imp-exp">
      Import/Export Login
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/beneficiary/login?role=icmr">
      ICMR Official
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/beneficiary/login?role=committee">
      Committee Login
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ManiMenu;
