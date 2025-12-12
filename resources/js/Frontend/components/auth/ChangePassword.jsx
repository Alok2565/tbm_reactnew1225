import React, { useState } from "react";
import {
    Container,
    Col,
    Form,
    Row,
    Button,
    InputGroup,
    Card,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CaptchaComponent from "./CaptchaComponent";
import useTitle from "../../hooks/useTitle";

function ChangePassword() {
    useTitle("Reset Password");

    const [current_password, setCurrentPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const [captchaText, setCaptchaText] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [error, setError] = useState("");

    // States to toggle password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (captchaInput !== captchaText) {
            setError("Invalid Captcha. Please try again.");
            return;
        }

        setValidated(true);

        // console.log('Submitting forgot password for:', email);
        // alert('Reset link sent to your email (demo).');
    };

    return (
        <Container className="py-3">
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Form
                                noValidate
                                validated={validated}
                                onSubmit={handleSubmit}
                            >
                                <Row>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="validationCustomCurrent"
                                    >
                                        <Form.Label>
                                            Enter Current Password
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type={
                                                    showCurrentPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="current_password"
                                                value={current_password}
                                                onChange={(e) =>
                                                    setCurrentPassword(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputGroup.Text
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {showCurrentPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your current password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="validationCustomNew"
                                    >
                                        <Form.Label>
                                            Enter New Password
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type={
                                                    showNewPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="new_password"
                                                value={new_password}
                                                onChange={(e) =>
                                                    setNewPassword(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputGroup.Text
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {showNewPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a new password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        as={Col}
                                        controlId="validationCustomConfirm"
                                    >
                                        <Form.Label>
                                            Enter Confirm Password
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="confirm_password"
                                                value={confirm_password}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputGroup.Text
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {showConfirmPassword ? (
                                                    <FaEyeSlash />
                                                ) : (
                                                    <FaEye />
                                                )}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a confirm password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="py-3">
                                        <CaptchaComponent
                                            onChangeCaptcha={setCaptchaText}
                                            onRefresh={() => {
                                                setCaptchaInput("");
                                                setError("");
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="col-md-3 mb-3"
                                        controlId="captchaInput"
                                    >
                                        <Form.Label>Enter Captcha</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type="text"
                                                value={captchaInput}
                                                onChange={(e) =>
                                                    setCaptchaInput(
                                                        e.target.value
                                                    )
                                                }
                                                maxLength={6}
                                                required
                                            />
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter the captcha.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {error && (
                                        <p style={{ color: "red" }}>{error}</p>
                                    )}
                                </Row>
                                <Button type="submit">Change Password</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangePassword;
