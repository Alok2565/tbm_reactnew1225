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

function AddRole() {
    useTitle("Add Role");
    const [role_name, setRoleName] = useState("");
    const [role_slug, setRoleSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { role } = useParams();

    useEffect(() => {
        const generateSlug = (name) =>
            name
                .toLowerCase()
                .trim()
                .replace(/[\s\W-]+/g, "-")
                .replace(/^-+|-+$/g, "");
        setRoleSlug(generateSlug(role_name));
    }, [role_name]);

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
        role_name,
        role_slug,
    };
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/role/create/",
            newUser,
            
            {Method:"POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        navigate(
            `/${role}/roles?success=Role%20has%20been%20created%20successfully!.`
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
                                    <h4>Add Role</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link
                                        to={`/${role}/roles`}
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
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Role Name{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={role_name}
                                                onChange={(e) =>
                                                    setRoleName(e.target.value)
                                                }
                                                required
                                                placeholder="Name"
                                                autoComplete="off"
                                                isInvalid={!!errors.role_name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.role_name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Role Slug{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={role_slug}
                                                onChange={(e) =>
                                                    setRoleSlug(e.target.value)
                                                }
                                                required
                                                placeholder="Slug"
                                                autoComplete="off"
                                                isInvalid={!!errors.role_slug}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.role_slug}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Adding..." : "Add Role"}
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
export default AddRole;
