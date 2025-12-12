import React from "react";
import useTitle from "../hooks/useTitle";
import { Container, Row } from "react-bootstrap";
import Breadcrumb from "../components/Breadcrumb";
import BreadcrumbBack from "../components/BreadcrumbBack";

function About() {
    const title = useTitle("About Us"); // Sets page title in browser tab (likely via custom hook)

    return (
        <>
            <BreadcrumbBack title="About Us" />
            <Breadcrumb />

            <section className="introduction">
                <div className="container py-2">
                    <Row>
                        <div className="row intro">
                            <div className="col-md-12">
                                <h1 className="mainHeading">About Us</h1>

                                <p className="homePara">
                                    Indian Council of Medical Research under
                                    Department of Health Research, Ministry of
                                    Health and Family Welfare, Government of
                                    India has developed an online portal for
                                    providing No Objection Certificate (NOC)
                                    related to the transfer of human biological
                                    material for commercial purposes/contract
                                    research by Indian companies/organizations.
                                </p>

                                <p className="homePara">
                                    This secure online platform enables
                                    applicants to obtain the necessary NOC for
                                    the export of human biological material for
                                    the said purpose.
                                </p>

                                <p className="homePara">
                                    The portal will strengthen interdepartmental
                                    synergies and increase efficacy in the
                                    functioning of GoI Departments/Agencies
                                    involved in the consideration of cases
                                    related to the transfer of human biological
                                    material. This will streamline the
                                    regulatory process and ensure transparent
                                    and regulated export of human biological
                                    material in compliance with national
                                    regulations.
                                </p>

                                <p>
                                    Before applying, please read the{" "}
                                    <span
                                        style={{
                                            borderBottom: "1px solid #111",
                                        }}
                                    >
                                        <a
                                            href="https://main.icmr.nic.in/node/46876"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            guidelines
                                        </a>
                                    </span>{" "}
                                    available on the ICMR website.
                                </p>
                            </div>
                        </div>
                    </Row>
                </div>
            </section>
        </>
    );
}

export default About;
