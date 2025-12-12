// src/pages/ImExpLogin.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import authLogo from '../../../assets/images/auth_icmr_logo.png';
import CaptchaComponent from './CaptchaComponent';
import useTitle from "../../hooks/useTitle";
import axios from "axios";

function ImExpLogin() {
    useTitle("Login");

    const location = useLocation();
    const navigate = useNavigate();

    const [role, setRole] = useState('');
    const [iec_code, setIecCode] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState('');

    const allowedRoles = ["imp-exp"];
    useEffect(() => {
            const queryParams = new URLSearchParams(location.search);
            const roleParam = queryParams.get('role');
    
            if (!roleParam) {
                setError(`Role is missing in URL. Example: ?role=${allowedRoles}`);
                return;
            }
    
            if (!allowedRoles.includes(roleParam)) {
                setError(`Invalid role "${roleParam}". Allowed roles: imp-exp`);
                return;
            }
    
            setRole(roleParam);
            setError('');
        }, [location.search]);
    
        // -----------------------------
        // AUTO REDIRECT IF LOGGED IN
        // -----------------------------
        useEffect(() => {
            const token = localStorage.getItem("token");
            const storedRole = localStorage.getItem("role");
    
            if (token && storedRole) {
                navigate(`/${storedRole}/dashboard`, { replace: true });
            }
        }, [navigate]);

const handleLogin = async () => {
        if (!role) return;

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/impexp/login",
                { iec_code, password }
            );;

            if (!response.data.status) {
                setError("The IEC Code or Password is Incorrect. Please try again.");
                return;
            }
            const { token, user } = response.data;
            // Store credentials
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("iec_code", user.iec_code);
            localStorage.setItem("user", JSON.stringify(user));
console.log("Showing Login Token to logout:", token);
            // Redirect to dashboard
            navigate(`/${user.role}/dashboard`, { replace: true });

        } catch (error) {
            setError(error.response?.data?.msg || "Login failed");
        }
    };

    // -----------------------------
    // FORM SUBMISSION
    // -----------------------------
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (captchaInput !== captchaText) {
            setError('Invalid Captcha. Please try again.');
            return;
        }

        setValidated(true);
        setError('');
        handleLogin();
    };


    const roleHeading = {
        'imp-exp': 'Importer Exporter Login'
    };

    return (
        <Container className="py-3">
            <Col className="codex-authbox login mt-4 mb-4 mx-auto" md={6}>
                {/* Header */}
                <Col className="auth-header p-2">
                    <Col className="d-flex justify-content-center align-items-center mb-3">
                        <Link to="#">
                            <img
                                className="img-fluid light-logo"
                                src={authLogo}
                                alt="logo"
                                style={{ maxWidth: '400px' }}
                            />
                        </Link>
                    </Col>

                    <h5 className="text-center mb-3">
                        <strong>
                            {role ? roleHeading[role] : "Invalid Role"}
                        </strong>
                    </h5>

                    {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                </Col>

                {/* Login Form */}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {role && (
                        <>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="validationCustomIec">
                                    <Form.Label>Importer/Exporter Code</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            value={iec_code}
                                            onChange={(e) => setIecCode(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGroupPassword">
                                    <Form.Label className="d-flex justify-content-between">
                                        Password
                                        <Link
                                            to={`/forgot-password-link?role=${role}`}
                                            style={{ fontSize: '14px', textDecoration: 'none' }}
                                        >
                                            Forgot Password
                                        </Link>
                                    </Form.Label>

                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <CaptchaComponent
                                onChangeCaptcha={setCaptchaText}
                                onRefresh={() => {
                                    setCaptchaInput('');
                                    setError('');
                                }}
                            />

                            <Form.Group className="mb-3">
                                <Form.Label>Enter Captcha</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </Form.Group>

                            <Col className="mt-3">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                >
                                    Login
                                </Button>
                            </Col>

                            <h6 className="mt-3">
                                <Link
                                    to={`/reset-password?role=${role}`}
                                    style={{ fontSize: '14px', textDecoration: 'none' }}
                                >
                                    Reset Password
                                </Link>
                            </h6>
                        </>
                    )}
                </Form>
            </Col>
        </Container>
    );
}

export default ImExpLogin;
