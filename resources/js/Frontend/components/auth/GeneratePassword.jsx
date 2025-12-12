import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import axios from "axios";
import authLogo from "../../../assets/images/auth_icmr_logo.png";
import CaptchaComponent from "./CaptchaComponent";
import useTitle from "../../hooks/useTitle";

function GeneratePassword() {
    useTitle("Generate Password");

    const { id } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [error, setError] = useState("");
    const [validated, setValidated] = useState(false);

    // Fetch user email based on ID & Role
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/userlogin-data/${id}`)
            .then((res) => {
                setEmail(res.data.email);
                console.warn(res.data);
            })
            
            .catch((err) => console.error(err));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        // Captcha check
        if (captchaInput !== captchaText) {
            setError("Captcha does not match!");
            return;
        }

        // Password match check
        if (password !== confirm_password) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await axios.put(
                `http://127.0.0.1:8000/api/generate-password/${id}`,
                {
                    email,
                    password,
                    confirm_password,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Password generated successfully.");
            navigate("/");
        } catch (error) {
            alert(
                "Error updating password: " +
                    (error.response?.data?.message || "Something went wrong")
            );
        }

        setValidated(true);
    };

    return (
        <Container className="py-3">
            <Col className="codex-authbox-pwd login mt-4 mb-4 mx-auto" md={8}>
                <Col className="auth-header">
                    <Col className="d-flex justify-content-center align-items-center mb-3">
                        <Link to="#">
                            <img
                                src={authLogo}
                                alt="logo"
                                style={{ maxWidth: "350px" }}
                            />
                        </Link>
                    </Col>
                    <h5 className="text-center mb-3">
                        <strong>Generate Your Password</strong>
                    </h5>
                    <p className="text-dark mb-4">
                        Please use a unique password for your account.
                    </p>
                </Col>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        {/* Show Email */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                               readOnly
                                required
                            />
                        </Form.Group>

                        {/* Hidden email for submission */}
                        <input type="hidden" value={email} />

                        {/* Password */}
                        <Form.Group className="mb-3">
                            <Form.Label>Enter Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Confirm Password */}
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="password"
                                value={confirm_password}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        {/* Captcha */}
                        <Form.Group className="py-3">
                            <CaptchaComponent
                                onChangeCaptcha={setCaptchaText}
                                onRefresh={() => {
                                    setCaptchaInput("");
                                    setError("");
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Enter Captcha<span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                maxLength={6}
                                value={captchaInput}
                                onChange={(e) =>
                                    setCaptchaInput(e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                            >
                                Generate Password
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Container>
    );
}

export default GeneratePassword;
