import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import authLogo from "../../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "./CaptchaComponent";
import useTitle from "../../hooks/useTitle";
import useImpExpRegister from "../../hooks/useImpExpRegister";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function ImpExpRegister() {
    useTitle("Importer/Exporter Register");
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [isIecSubmitted, setIsIecSubmitted] = useState(false);

    const [captchaText, setCaptchaText] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [error, setError] = useState("");
      
    const [iec_code, setIecCode] = useState("");
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [department, setDeptPersonName] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [mobile_number, setMobileNumber] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);

const handleOpenConfirm = () => setShowConfirm(true);
const handleCloseConfirm = () => setShowConfirm(false);
   

// Load Role (imp-exp)
// Role
//         const [roles, setRoles] = useState([]);
// const [role_id, setRoleId] = useState("");

// useEffect(() => {
//     const fetchRoles = async () => {
//         try {
//             const res = await axios.get("http://localhost:8000/api/roles");

//             const filteredRoles = res.data.data.filter(
//                 (r) => r.role_slug === "imp-exp" && r.status === 1
//             );

//             setRoles(filteredRoles);

//             if (filteredRoles.length > 0) {
//                 const role = filteredRoles[0];

//                 // auto detect correct role id key
//                 const id =
//                     role.role_id ??
//                     role.id ??
//                     role.roleid ??
//                     role._id ??
//                     "";

//                 setRoleId(id);
//             } else {
//                 setRoleId("");
//             }
//         } catch (err) {
//             console.error("Failed to fetch roles", err);
//         }
//     };

//     fetchRoles();
// }, []);

// useEffect(() => {
//     console.log("Filtered Roles:", roles);
//     console.log("Selected Role ID:", role_id);
// }, [roles, role_id]);


    const {
    fetchDgftDetails,
    submitIecCode,
    finalRegistration,
} = useImpExpRegister();

const handleIecSubmit = async (event) => {
    event.preventDefault();

    if (iec_code.length !== 10) {
        alert("Please enter valid 10 digit IEC Code");
        return;
    }

    try {
        const data = await fetchDgftDetails(iec_code); // Fetch DGFT

        if (!data) {
            alert("DGFT record not found");
            return;
        }

        // Map DGFT data to form fields
        setName(data.entityName || "");
         setemail(data.email || "");
        setAddress(data.addressLine1 || "");
        setAddress2(data.addressLine2 || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPincode(data.pin || "");
        setMobileNumber(data.contactNo || "");

        const check = await submitIecCode(iec_code);
        if (!check.status) {
            alert(check.message);
            return;
        }

        setIsIecSubmitted(true);
    } catch (error) {
        console.log(error);
        alert("Invalid IEC Code");
    }
};
    const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    // Bootstrap validation
    if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
    }

    // Captcha check
    if (captchaInput !== captchaText) {
        setError("Invalid Captcha. Please try again.");
        return;
    }

    // Build payload
    const payload = {
  
        iec_code,
        name,
        email,
        department,
        designation,
        address,
        address2,
        city,
        state,
        pincode,
        mobile_number,
       
    };

    try {
        const response = await finalRegistration(payload);

        console.log("Registration Success:", response);

        navigate("/generate-password-link-message");
    } catch (error) {
        console.error("Registration Error:", error.response?.data || error);
        alert("Registration failed");
    }
};

    return (
        <>
            <Container>
                
            <Row>
                <Col md={{ span: 12, offset: 0 }}>
                    <Col className="codex-authbox register mt-5 mb-5">
                        <Col className="auth-header p-2">
                            <Col className="d-flex justify-content-center align-items-center">
                                <Link to="#">
                                    <img
                                        className="img-fluid light-logo"
                                        src={authLogo}
                                        width="100%"
                                        style={{ maxWidth: "400px" }}
                                        alt="logo"
                                    />
                                </Link>
                            </Col>
                            <h5
                                className="justify-content-between text-center mb-3"
                                style={{ fontWeight: "600" }}
                            >
                                Registration Form for Applicant
                            </h5>
                        </Col>

                        {!isIecSubmitted && (
                            <Form noValidate onSubmit={handleIecSubmit}>
                                
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>
                                            Importer-Exporter Code (IEC){" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="IEC Code"
                                            value={iec_code}
                                            onChange={(e) =>
                                                setIecCode(e.target.value)
                                            }
                                            maxLength={10}
                                        />
                                    </Form.Group>
                                    <Col className="col-md-12">
                                        <Form.Group className="py-2 d-flex">
                                            <button
                                                id="show_record"
                                                disabled={
                                                    iec_code.length !== 10
                                                }
                                                className="btn btn-primary btn-md m-1 show_hide_btn px-4 font-bold"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                            <button
                                                id="reset_data"
                                                className="btn btn-danger btn-md m-1 show_hide_btn px-4 font-bold"
                                                type="button"
                                                onClick={() => setIecCode("")}
                                            >
                                                Reset
                                            </button>
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        )}

                        {isIecSubmitted && (
                            <Form id="final-reg-form"
                                noValidate
                                validated={validated}
                                onSubmit={handleFormSubmit}
                            >
                                {/* <input type="hidden" name="role_id" value={role_id} onChange={(e) =>
                                                setRoleId(e.target.value)
                                            }/> */}
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12 py-2">
                                        <Form.Label>
                                            Importer-Exporter Code (IEC){" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={iec_code}
                                            onChange={(e) =>
                                                setIecCode(e.target.value)
                                            }
                                            placeholder="IEC Code"
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="12"
                                        className="py-2"
                                    >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Name"
                                            readOnly
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>
                                            Department (Contact Person) 
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={department}
                                            onChange={(e) =>
                                                setDeptPersonName(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>
                                            Designation (Contact Person)
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={designation}
                                            onChange={(e) =>
                                                setDesignation(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>Address2</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={address2}
                                            onChange={(e) =>
                                                setAddress2(e.target.value)
                                            }
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={state}
                                            onChange={(e) =>
                                                setState(e.target.value)
                                            }
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>PinCode</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={pincode}
                                            onChange={(e) =>
                                                setPincode(e.target.value)
                                            }
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>Email Address</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text>
                                                <FaEnvelope />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                    setemail(e.target.value)
                                                }
                                                readOnly
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={mobile_number}
                                            onChange={(e) =>
                                                setMobileNumber(e.target.value)
                                            }
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <Form.Label className="d-flex gap-3">
                                            Enter Captcha{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                            <CaptchaComponent
                                                onChangeCaptcha={setCaptchaText}
                                                onRefresh={() => {
                                                    setCaptchaInput("");
                                                    setError("");
                                                }}
                                            />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={captchaInput}
                                            onChange={(e) =>
                                                setCaptchaInput(e.target.value)
                                            }
                                            maxLength={6}
                                            required
                                        />

                                        {error && (
                                            <p style={{ color: "red" }}>
                                                {error}
                                            </p>
                                        )}
                                    </Form.Group>

                                    {/* 

                                    <Form.Group as={Col} md="6" className="py-2" controlId="captchaInput">
                                        <Form.Label>Enter Captcha</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                            maxLength={6}
                                            required
                                        />
                                    </Form.Group>

                                    {error && <p style={{ color: 'red' }}>{error}</p>} */}
                                </Row>

                                <Row>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        <span className="text-danger">
                                            * Please fill all mandatory fields
                                        </span>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        md="6"
                                        className="py-2"
                                    >
                                        {/* <Button type="submit">Register</Button> */}
                                        <Button type="button" onClick={handleOpenConfirm}>
    Register
</Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        )}
                    </Col>
                </Col>
            </Row>
            <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
    <Modal.Header closeButton>
        <Modal.Title>Confirm Submission</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        Are you sure you want to submit your final registration?
    </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseConfirm}>
            No, Cancel
        </Button>

        <Button
            variant="primary"
            onClick={() => {
                handleCloseConfirm();
                document.getElementById("final-reg-form").requestSubmit(); 
            }}
        >
            Yes, Submit
        </Button>
    </Modal.Footer>
</Modal>
        </Container>
        </>
    );
}

export default ImpExpRegister;
