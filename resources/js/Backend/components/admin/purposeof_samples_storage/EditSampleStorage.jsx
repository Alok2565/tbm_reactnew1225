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
//import axios from "axios";
import useTitle from "../../../hooks/useTitle";
import API from "../../../../utils/http";

function EditSampleStorage() {
    useTitle("Edit Specify Purpose");

    const { id, role } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [validated, setValidated] = useState(false);

   useEffect(() => {
        API.get(`purpose_sample_storage/${id}`).then((res) => {
            setName(res.data.name);
            setValue(res.data.value);
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
            await API.put(`/purpose_sample_storage/update/${id}`, {
                name,
                value,
            },
        {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
            alert("Record updated successfully.");
            navigate(`/${role}/purpose_sample_storages`); 
        } catch (error) {
            alert("Error updating record: " + error.response?.data?.message);
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
                                    <h4>Update Record</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link to={`/${role}/purpose_sample_storages`} className="text-decoration-none">
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
                                        <Form.Group as={Col} md="6" controlId="name">
                                            <Form.Label>Name of item</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                             autoComplete="off" />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="desc">
                                            <Form.Label>Value of item</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                             autoComplete="off"/>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Update Record</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EditSampleStorage;

