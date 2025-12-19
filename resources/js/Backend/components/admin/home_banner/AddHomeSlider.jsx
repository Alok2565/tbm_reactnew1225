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

function AddHomeSlider() {
    useTitle("Add Home Slider");

    const [banner_title, setBannerTile] = useState("");
    const [banner_slug, setBannerSlug] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { role } = useParams();

    // Generate slug when title changes
    useEffect(() => {
        const generateSlug = (str) =>
            str
                .toLowerCase()
                .trim()
                .replace(/[\s\W-]+/g, "-")
                .replace(/^-+|-+$/g, "");

        setBannerSlug(generateSlug(banner_title));
    }, [banner_title]);

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

        // Use FormData for file upload
        const formData = new FormData();
        formData.append("banner_title", banner_title);
        formData.append("banner_slug", banner_slug);
        formData.append("image", image);

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/slider/create",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            navigate(
                `/${role}/sliders?success=Home%20Slider%20has%20been%20created%20successfully!`
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
                                    <h4>Add Home Slider</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link to={`/${role}/sliders`} className="text-decoration-none">
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
                        <Card className="border-none custom_card shadow-sm p-3 mb-5 rounded">
                            <Card.Body>
                                <Form
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                    encType="multipart/form-data"
                                >
                                    <Row className="mb-3">

                                        {/* Banner Title */}
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Banner Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={banner_title}
                                                onChange={(e) => setBannerTile(e.target.value)}
                                                required
                                                placeholder="Enter Banner Name"
                                                isInvalid={!!errors.banner_title}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.banner_title}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Banner Slug */}
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Banner Slug <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={banner_slug}
                                                onChange={(e) => setBannerSlug(e.target.value)}
                                                required
                                                placeholder="Slug"
                                                isInvalid={!!errors.banner_slug}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.banner_slug}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Banner Image */}
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Banner Image <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="file"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                required
                                                isInvalid={!!errors.image}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.image}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>

                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? "Adding..." : "Add Slider"}
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

export default AddHomeSlider;
