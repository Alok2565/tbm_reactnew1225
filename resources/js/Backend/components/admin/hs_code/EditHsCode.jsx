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
import useTitle from "../../../hooks/useTitle";

function EditHsCode() {
    useTitle("Edit Hs Code");

    const { id, role } = useParams();
    const navigate = useNavigate();

    const [hs_code, setHsCode] = useState("");
    const [desc, setDesc] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/hs_codes/${id}`).then((res) => {
            setHsCode(res.data.hs_code);
            setDesc(res.data.desc);
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
            await axios.put(`http://127.0.0.1:8000/api/hs_code/update/${id}`, {
                hs_code,
                desc,
            },
        {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
            alert("Role updated successfully.");
            navigate(`/${role}/hs_codes`); // redirect to role list
        } catch (error) {
            alert("Error updating hs code: " + error.response?.data?.message);
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
                                    <h4>Update Hs Code</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link to={`/${role}/hs_codes`} className="text-decoration-none">
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
                                        <Form.Group as={Col} md="6" controlId="hs_code">
                                            <Form.Label>Hs Code</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={hs_code}
                                                onChange={(e) => setHsCode(e.target.value)}
                                             autoComplete="off" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="desc">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                             autoComplete="off"/>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Update Code</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EditHsCode;

// import React from 'react'

// function EditHsCode() {
//   return (
//     <div>
//       <h3>Edit HS code</h3>
//     </div>
//   )
// }

// export default EditHsCode
