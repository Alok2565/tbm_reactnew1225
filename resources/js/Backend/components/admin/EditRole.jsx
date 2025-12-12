import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Row,
    Stack,
    Form,
} from "react-bootstrap";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useTitle from "../../hooks/useTitle";

function EditRole() {
    useTitle("Edit Role");

    const { id, role } = useParams();
    const navigate = useNavigate();

    const [role_name, setRoleName] = useState("");
    const [role_slug, setRoleSlug] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/roles/${id}`).then((res) => {
            setRoleName(res.data.role_name);
            setRoleSlug(res.data.role_slug);
        });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/role/update/${id}`, {
                role_name,
                role_slug,
            },
        {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
            alert("Role updated successfully.");
            navigate(`/${role}/roles`); // redirect to role list
        } catch (error) {
            alert("Error updating role: " + error.response?.data?.message);
        }

        setValidated(true);
    };

    return (
        <div className="page-content">
            <Container fluid>
                <div className="top_headting_title mb-2">
                    <Row>
                        <Col lg={12}>
                            <Stack direction="horizontal" gap={3}>
                                <div className="p-2">
                                    <h4>Update Role</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link to={`/${role}/roles`} className="text-decoration-none">
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
                    <Col lg={12}>
                        <Card className="border-none custom_card shadow-sm p-3 mb-5 rounded">
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6" controlId="roleName">
                                            <Form.Label>Role Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={role_name}
                                                onChange={(e) => setRoleName(e.target.value)}
                                             autoComplete="off" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="roleSlug">
                                            <Form.Label>Role Slug</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={role_slug}
                                                onChange={(e) => setRoleSlug(e.target.value)}
                                             autoComplete="off"/>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Update Role</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EditRole;
