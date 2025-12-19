
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
//import axios from "axios";
import useTitle from "../../../hooks/useTitle";
import API from "../../../../utils/http";

function AddSampleResearchAnalysis() {
    useTitle("Add Sample Research");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { role } = useParams();

   

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
        name,
        value,
    };
    try {
        const response = await API.post("/used_research_analysis/create/",
            newUser,
            {Method:"POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        navigate(
            `/${role}/used_research_analyses?success=Sample Research%20has%20been%20created%20successfully!.`
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
                                    <h4>Sample Used Research</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link
                                        to={`/${role}/used_research_analyses`}
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
                                                Name of item{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                            type="text"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                                placeholder="name of item"
                                                autoComplete="off"
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Value of item{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                            type="text"
                                                value={value}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                                required
                                                placeholder="Value of item"
                                                autoComplete="off"
                                                isInvalid={!!errors.value}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.value}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? "Adding..." : "Add New"}
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
export default AddSampleResearchAnalysis;
