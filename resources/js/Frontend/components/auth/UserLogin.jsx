// // src/pages/UserLogin.js
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { Container, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
// import authLogo from '../../../assets/images/auth_icmr_logo.png';
// import CaptchaComponent from './CaptchaComponent';
// import useTitle from "../../hooks/useTitle";
// import axios from "axios";

// function UserLogin() {
//     useTitle("Login")
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [role, setRole] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [validated, setValidated] = useState(false);
//     const [captchaText, setCaptchaText] = useState('');
//     const [captchaInput, setCaptchaInput] = useState('');
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const roleParam = queryParams.get('role');

//         if (['admin', 'icmr', 'committee'].includes(roleParam)) {
//             setRole(roleParam);
//         } else {
//             navigate('/');
//         }
//     }, [location.search, navigate]);
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         if (token && role) {
//             navigate(`/${role}/dashboard`, { replace: true });
//         }
//     }, [navigate]);

// const handleLogin = async () => {
//     try {
//         const response = await axios.post(
//             "http://127.0.0.1:8000/api/login",
//             { email, password }
//         );
//         const { token, user } = response.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", user.role.role_slug);
        
//         navigate(`/${user.role.role_slug}/dashboard`);
//     } catch (error) {
//         setError(error.response?.data?.msg || "Login failed");
//     }
// };


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const form = event.currentTarget;

//         if (form.checkValidity() === false) {
//             event.stopPropagation();
//             setValidated(true);
//             return;
//         }
//         if (captchaInput !== captchaText) {
//             setError('Invalid Captcha. Please try again.');
//             return;
//         }

//         setValidated(true);
//         setError('');
//         handleLogin();
//     };

//     const roleHeading = {
//         admin: 'Login for Super admin',
//         icmr: 'Login for ICMR Officers',
//         committee: 'Login for Committee Members',
//     };

//     return (
//         <>
//             <Container className="py-3">
//                 <Col className="codex-authbox login mt-4 mb-4 mx-auto" md={6}>
//                     <Col className="auth-header p-2">
//                         <Col className="d-flex justify-content-center align-items-center mb-3">
//                             <Link to="#">
//                                 <img
//                                     className="img-fluid light-logo"
//                                     src={authLogo}
//                                     alt="logo"
//                                     style={{ maxWidth: '400px' }}
//                                 />
//                             </Link>
//                         </Col>
//                         <h5 className="text-center mb-3">
//                             <strong>{roleHeading[role]}</strong>
//                         </h5>
//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </Col>

//                     <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                         <Row className="mb-3">
//                             <Form.Group as={Col} controlId="validationCustomEmail">
//                                 <Form.Label>Email</Form.Label>
//                                 <InputGroup hasValidation>
//                                     <Form.Control
//                                         type="email"
//                                         name="email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </InputGroup>
//                             </Form.Group>
//                         </Row>

//                         <Row className="mb-3">
//                             <Form.Group as={Col} controlId="formGroupPassword">
//                                 <Form.Label className="d-flex justify-content-between">
//                                     Password
//                                     <Link
//                                         to={`/forgot-password-link?role=${role}`}
//                                         className="text-end"
//                                         style={{ fontSize: '14px', textDecoration: 'none' }}
//                                     >
//                                         Forgot Password
//                                     </Link>
//                                 </Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>
//                         </Row>

//                         <CaptchaComponent
//                             onChangeCaptcha={setCaptchaText}
//                             onRefresh={() => {
//                                 setCaptchaInput('');
//                                 setError('');
//                             }}
//                         />

//                         <Form.Group className="mb-3" controlId="captchaInput">
//                             <Form.Label>Enter Captcha</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 value={captchaInput}
//                                 onChange={(e) => setCaptchaInput(e.target.value)}
//                                 maxLength={6}
//                                 required
//                             />
//                         </Form.Group>
                        

//                         <Col className="mt-3">
//                             <Button onClick={handleLogin} type="submit" variant="primary" className="w-100">
//                                 Login
//                             </Button>
//                         </Col>
//                         <h6 className="mt-3">
//                             <Link
//                                 to={`/reset-password?role=${role}`}
//                                 style={{ fontSize: '14px', textDecoration: 'none' }}
//                             >
//                                 Reset Password
//                             </Link>
//                         </h6>
//                     </Form>
//                 </Col>
//             </Container>
//         </>
//     );
// }

// export default UserLogin;


// src/pages/UserLogin.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import authLogo from '../../../assets/images/auth_icmr_logo.png';
import CaptchaComponent from './CaptchaComponent';
import useTitle from "../../hooks/useTitle";
//import axios from "axios";
import API from "../../../utils/http.js";

function UserLogin() {
    useTitle("Login");
    const location = useLocation();
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [captchaText, setCaptchaText] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState('');

    const allowedRoles = ["admin", "icmr", "committee"];
    useEffect(() => {
            const queryParams = new URLSearchParams(location.search);
            const roleParam = queryParams.get('role');
    
            if (!roleParam) {
                setError(`Role is missing in URL. Example: ?role=${allowedRoles}`);
                return;
            }
    
            if (!allowedRoles.includes(roleParam)) {
                setError(`Invalid role "${roleParam}". Allowed roles: admin, icmr, committee`);
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
            const response = await API.post(
                "login",
                { email, password }
            );

            if (!response.data.status) {
                setError("The Email Code or Password is Incorrect. Please try again.");
                return;
            }

            const { token, user } = response.data;

            // Store credentials
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("email", user.email);
            localStorage.setItem("user", JSON.stringify(user));

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
        admin: 'Login for Super admin',
        icmr: 'Login for ICMR Officers',
        committee: 'Login for Committee Members',
    };

    return (
        <>
            <Container className="py-3">
                <Col className="codex-authbox login mt-4 mb-4 mx-auto" md={6}>
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

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {role && (
                            <>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="validationCustomEmail">
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                    onClick={handleLogin}
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
    </>
);
}

export default UserLogin;

