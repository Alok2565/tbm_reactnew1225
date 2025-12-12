import React from 'react';
import "../../assets/css/custom.css";
import { Container, Row, Col } from 'react-bootstrap';
import stayamev from "../../assets/images/satyam-dark.png"; // Ashoka logo
import main_logo from "../../assets/images/Indian_Council_of_Medical_Research_Logo.svg"; // ICMR logo
import ManiMenu from './ManiMenu';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      {/* Top Banner with logos and title */}
      <div className="py-2 border-bottom">
        <Container>
          <Row className="align-items-center text-center">
            {/* Left Column: Ashoka + Dept of Health */}
              <Col xs={12} lg={3} className="mb-3 mb-lg-0">
              <Row className="align-items-center"> {/* g-1 reduces gap between columns */}
                {/* Emblem */}
                <Col xs="auto" className="p-1">
                  <img src={stayamev} alt="Ashoka Emblem" width="55" height="75" />
                </Col>

                {/* Text */}
                <Col className="p-1">
                  <div className="text-start">
                    <Link to="/" className="text-dark text-decoration-none" style={{ fontSize: "17px", fontWeight: "bold"}}>
                    <div>
                      स्वास्थ्य अनुसंधान विभाग
                    </div>
                    <div style={{ fontSize: "15px"}}>
                      Department of Health Research
                    </div>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>



            {/* Center Column: Project Title */}
            <Col xs={12} lg={6}>
              <h2 className="m-0 text-center" style={{ fontSize: "25px", fontWeight: "bold", color: "#000" }}>
                Transfer of Human Biological Material (THBM)
              </h2>
            </Col>

            {/* Right Column: ICMR Logo */}
            <Col xs={12} lg={3} className="d-flex justify-content-lg-end justify-content-center">
  <img
    src={main_logo}
    alt="Indian Council of Medical Research"
    className="img-fluid"
    style={{ maxHeight: "95px", maxWidth: "220px" }}
  />
</Col>

          </Row>
        </Container>
      </div>

      {/* Main Menu Section */}
      <section className="main_menu border-bottom" style={{ backgroundColor: "#022759" }}>
        <Container>
          <Row>
            <Col>
              <ManiMenu />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Header;
