import React from 'react'
import useTitle from '../hooks/useTitle';
import { Row } from 'react-bootstrap';
import Breadcrumb from "../components/Breadcrumb";
import BreadcrumbBack from "../components/BreadcrumbBack";


function Contact() {
  useTitle("Contact Us")
  return (
    <>
    <BreadcrumbBack title="Contact Us" />
            <Breadcrumb />
      <section className="introduction padd-25">
                    <div className="container py-2">
                        <Row>
                          <div className="row intro">
                            <div className="col-md-12">
                                <h1 className="mainHeading">Contact Us</h1>
                                <p style={{ textAlign: "justify;" }}><span>Transfer of Human Biological Material Secretariat</span><br />
                                    <span>International Health Division</span><br /><span>Indian Council of Medical Research</span><br />
                                    <span>V. Ramalingaswami Bhawan, P.O. Box No. 4911</span><br />
                                    <span>Ansari Nagar, New Delhi - 110029, India</span>
                                </p>
                                <p style={{ textAlign: "justify;" }}> Email ID : thbm[dot]hq[at]icmr[dot]gov[dot]in</p>
                                <p style={{ textAlign: "justify;" }}>Phone Number: 011-26588755</p>
                            </div>
                        </div>
                        </Row>
                    </div>
                </section>
    </>
  )
}

export default Contact
