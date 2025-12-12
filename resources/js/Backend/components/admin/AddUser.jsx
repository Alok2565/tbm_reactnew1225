import { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Stack,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import useTitle from "../../hooks/useTitle";

function AddUser() {
    useTitle("Add User");
    const [role_id, setRoleId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [address, setAddress] = useState("");
    const [mobile_number, setMobile] = useState("");
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { role } = useParams();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/roles");
                const activeRoles = res.data.data.filter((r) => r.status === 1);
                setRoles(activeRoles);
            } catch (err) {
                console.error("Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setLoading(true);
        setErrors({});

        const newUser = {
            role_id,
            name,
            department,
            email,
            designation,
            address,
            mobile_number,
        };

        try {
            const resp = await axios.post(
                "http://127.0.0.1:8000/api/user/create",
                newUser,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            //console.log(resp);
            navigate(
                `/${role}/users?success=User%20has%20been%20created%20successfully!`
            );
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                alert("Something went wrong!");
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-content">
            <Container fluid>
                <div className="top_headting_title mb-2">
                    <Row>
                        <Col lg={12}>
                            <Stack direction="horizontal" gap={3}>
                                <div className="p-2">
                                    <h4>Add User</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link
                                        to={`/${role}/users`}
                                        className="text-decoration-none"
                                    >
                                        <Button
                                            variant="primary"
                                            className="d-flex align-items-center gap-2"
                                        >
                                            <FaLongArrowAltLeft />
                                            Back
                                        </Button>
                                    </Link>
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col>
                        <Card className="border-none custom_card shadow-sm p-3 mb-5 rounded">
                            <Card.Body>
                                <Form
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <Row className="mb-3">
                                        {/* <Form.Group as={Col} md="6" controlId="name">
                                            <Form.Label>
                                                Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                placeholder="Name"
                                                autoComplete="off"
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="email">
                                            <Form.Label>
                                                Email <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="Email"
                                                autoComplete="off"
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group> */}

                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="name"
                                        >
                                            <Form.Label>
                                                Name{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                                placeholder="Full name"
                                                autoComplete="off"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="email"
                                        >
                                            <Form.Label>
                                                Email{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="department"
                                        >
                                            <Form.Label>
                                                Name of Department{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={department}
                                                onChange={(e) =>
                                                    setDepartment(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="department"
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="designation"
                                        >
                                            <Form.Label>
                                                Designation{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={designation}
                                                onChange={(e) =>
                                                    setDesignation(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="address"
                                        >
                                            <Form.Label>
                                                Address{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                                required
                                                autoComplete="off"
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="mobile"
                                        >
                                            <Form.Label>
                                                Mobile Number{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={mobile_number}
                                                onChange={(e) =>
                                                    setMobile(e.target.value)
                                                }
                                                required
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="roles"
                                        >
                                            <Form.Label>
                                                Role{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Select
                                                value={role_id}
                                                onChange={(e) =>
                                                    setRoleId(e.target.value)
                                                }
                                                required
                                                isInvalid={!!errors.role_id}
                                            >
                                                <option value="">
                                                    Select Role
                                                </option>
                                                {roles.map((role) => (
                                                    <option
                                                        key={role.id}
                                                        value={role.id}
                                                    >
                                                        {role.role_slug}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.role_id}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Adding..." : "Add User"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddUser;

// import { useState, useEffect } from "react";
// import {
//     Container, Row, Col, Form, Button, Card, Stack,
// } from "react-bootstrap";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import axios from "axios";
// import useTitle from "../../hooks/useTitle";

// function AddUser() {
//     useTitle("Add User");
//     const [role_id, setRoleId] = useState("");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [designation, setDesignation] = useState("");
//     const [department, setDepartment] = useState("");
//     const [address, setAddress] = useState("");
//     const [mobile_number, setMobile] = useState("");
//     const [roles, setRoles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [validated, setValidated] = useState(false);
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();
//     const { role } = useParams();

//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 const res = await axios.get("http://localhost:8000/api/roles");
//                 const activeRoles = res.data.data.filter((r) => r.status === 1);
//                 setRoles(activeRoles);
//             } catch (err) {
//                 console.error("Failed to fetch roles", err);
//             }
//         };
//         fetchRoles();
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.stopPropagation();
//             setValidated(true);
//             return;
//         }

//         setValidated(true);
//         setLoading(true);
//         setErrors({});

//         const newUser = {
//             role_id,
//             name,
//             department,
//             email,
//             designation,
//             address,
//             mobile_number,
//         };

//         try {
//             await axios.post("http://127.0.0.1:8000/api/user/create", newUser, {
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//             });

//             navigate(`/${role}/users?success=User%20has%20been%20created%20successfully!`);
//         } catch (error) {
//             if (error.response && error.response.status === 422) {
//                 setErrors(error.response.data.errors || {});
//             } else {
//                 alert("Something went wrong!");
//                 console.error(error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="page-content">
//             <Container fluid>
//                                 <div className="top_headting_title mb-2">
//                     <Row>
//                         <Col lg={12}>
//                             <Stack direction="horizontal" gap={3}>
//                                 <div className="p-2">
//                                     <h4>Add User</h4>
//                                 </div>
//                                 <div className="p-2 ms-auto">
//                                     <Link
//                                         to={`/${role}/users`}
//                                         className="text-decoration-none"
//                                     >
//                                         <Button
//                                             variant="primary"
//                                             className="d-flex align-items-center gap-2"
//                                         >
//                                             <FaLongArrowAltLeft />
//                                             Back
//                                         </Button>
//                                     </Link>
//                                 </div>
//                             </Stack>
//                         </Col>
//                     </Row>
//                 </div>
//                 <Row>
//                     <Col>
//                         <Card className="shadow-sm p-3 mb-5 rounded">
//                             <Card.Body>
//                                 <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                                     <Row className="mb-3">
//                                         <Form.Group as={Col} md="6" controlId="name">
//                                             <Form.Label>Name <span className="text-danger">*</span></Form.Label>
//                                             <Form.Control
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>
//                                         <Form.Group as={Col} md="6" controlId="email">
//                                             <Form.Label>Email <span className="text-danger">*</span></Form.Label>
//                                             <Form.Control
//                                                 type="email"
//                                                 value={email}
//                                                 onChange={(e) => setEmail(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Form.Group as={Col} md="6" controlId="department">
//                                             <Form.Label>Department <span className="text-danger">*</span></Form.Label>
//                                             <Form.Control
//                                                 value={department}
//                                                 onChange={(e) => setDepartment(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>
//                                         <Form.Group as={Col} md="6" controlId="designation">
//                                             <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
//                                             <Form.Control
//                                                 value={designation}
//                                                 onChange={(e) => setDesignation(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Form.Group as={Col} md="6" controlId="address">
//                                             <Form.Label>Address <span className="text-danger">*</span></Form.Label>
//                                             <Form.Control
//                                                 value={address}
//                                                 onChange={(e) => setAddress(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>
//                                         <Form.Group as={Col} md="6" controlId="mobile">
//                                             <Form.Label>Mobile <span className="text-danger">*</span></Form.Label>
//                                             <Form.Control
//                                                 value={mobile_number}
//                                                 onChange={(e) => setMobile(e.target.value)}
//                                                 required
//                                             />
//                                         </Form.Group>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Form.Group as={Col} md="6" controlId="roles">
//                                             <Form.Label>Role <span className="text-danger">*</span></Form.Label>
//                                             <Form.Select
//                                                 value={role_id}
//                                                 onChange={(e) => setRoleId(e.target.value)}
//                                                 required
//                                             >
//                                                 <option value="">Select Role</option>
//                                                 {roles.map((r) => (
//                                                     <option key={r.id} value={r.id}>
//                                                         {r.role_slug}
//                                                     </option>
//                                                 ))}
//                                             </Form.Select>
//                                         </Form.Group>
//                                     </Row>
//                                     <Button type="submit" disabled={loading}>
//                                         {loading ? "Adding..." : "Add User"}
//                                     </Button>
//                                 </Form>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default AddUser;
