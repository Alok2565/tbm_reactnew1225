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

function EditUser() {
    useTitle("Edit User");
    const navigate = useNavigate();
    const { role, id } = useParams();

    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [mobile_number, setMobile] = useState("");
    const [role_id, setRoleId] = useState("");
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${id}`);
                const user = response.data;
                setName(user.name || "");
                setUserName(user.username || "");
                setEmail(user.email || "");
                setDepartment(user.department || "");
                setDesignation(user.designation || "");
                setAddress(user.address || "");
                setMobile(user.mobile_number || "");
                setRoleId(user.role_id || "");
            } catch (error) {
                alert("Failed to fetch user details: " + error.message);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/roles");
                setRoles(response.data.data);
            } catch (error) {
                alert("Failed to fetch roles: " + error.message);
            }
        };

        fetchUser();
        fetchRoles();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!department) newErrors.department = "Department is required";
        if (!designation) newErrors.designation = "Designation is required";
        if (!address) newErrors.address = "Address is required";
        if (!mobile_number) newErrors.mobile_number = "Mobile number is required";
        if (!role_id) newErrors.role_id = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);

        if (!validateForm()) return;

        setLoading(true);
        try {
            const updateData = {
                name,
                username,
                email,
                department,
                designation,
                address,
                mobile_number,
                role_id,
            };

            const response = await fetch(`http://localhost:8000/api/user/update/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();
            if (response.ok) {
                navigate(`/${role}/users?success=User%20has%20been%20Updated%20successfully`);
            } else {
                alert("Update failed: " + data.error);
            }
        } catch (err) {
            alert("An error occurred: " + err.message);
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
                                    <h4>Edit User</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link to={`/${role}/users`} className="text-decoration-none">
                                        <Button variant="primary" className="d-flex align-items-center gap-2">
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
                        <Card className="shadow-sm p-3 mb-5 rounded">
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                required
                                                isInvalid={!!errors.department}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                required
                                                isInvalid={!!errors.designation}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.designation}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                                isInvalid={!!errors.address}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                value={mobile_number}
                                                onChange={(e) => setMobile(e.target.value)}
                                                required
                                                isInvalid={!!errors.mobile_number}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.mobile_number}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Role <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                value={role_id}
                                                onChange={(e) => setRoleId(e.target.value)}
                                                required
                                                isInvalid={!!errors.role_id}
                                            >
                                                <option value="">Select Role</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.role_slug}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">{errors.role_id}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Updating..." : "Update User"}
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

export default EditUser;
