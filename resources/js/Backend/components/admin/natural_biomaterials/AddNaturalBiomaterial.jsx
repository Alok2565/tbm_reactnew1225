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
import useTitle from "../../../hooks/useTitle";

function AddNaturalBiomaterial() {
    useTitle("Add Hs Code");
    const [hs_code, setHsCode] = useState("");
    const [desc, setDesc] = useState("");
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
        hs_code,
        desc,
    };
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/hs_code/create/",
            newUser,
            
            {Method:"POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        navigate(
            `/${role}/hs_codes?success=Hs Code%20has%20been%20created%20successfully!.`
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
                                    <h4>Add Hs Code</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link
                                        to={`/${role}/hs_codes`}
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
                                                Hs Code{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                value={hs_code}
                                                onChange={(e) =>
                                                    setHsCode(e.target.value)
                                                }
                                                required
                                                placeholder="hs code"
                                                autoComplete="off"
                                                isInvalid={!!errors.hs_code}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.desc}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Hs Code{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                            as="textarea"
                                                value={desc}
                                                onChange={(e) =>
                                                    setDesc(e.target.value)
                                                }
                                                required
                                                placeholder="Description"
                                                autoComplete="off"
                                                isInvalid={!!errors.desc}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.desc}
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
export default AddNaturalBiomaterial;


// import React from 'react'

// function AddNewHsCode() {
//   return (
//     <div>
//       <h3>Add new</h3>
//     </div>
//   )
// }

// export default AddNewHsCode

// import React from 'react'

// function AddNaturalBiomaterial() {
//   return (
//     <div>
//       <h3>Add New Natural</h3>
//     </div>
//   )
// }

// export default AddNaturalBiomaterial
