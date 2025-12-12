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

function EditHomeSlider() {
    useTitle("Edit Slider");

    const [banner_title, setBannerTile] = useState("");
    const [banner_slug, setBannerSlug] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id, role } = useParams();

    useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/sliders/${id}`);

            console.log("API Response:", res.data);

            const slider = res.data.data ?? res.data;

            setBannerTile(slider.banner_title || "");
            setBannerSlug(slider.banner_slug || "");
            setImage(slider.image || "");
        } catch (error) {
            alert("Failed to fetch slider details: " + error.message);
        }
    };

    fetchData();
}, [id]);


    const validateForm = () => {
        const newErrors = {};

        if (!banner_title) newErrors.banner_title = "Title is required";
        if (!banner_slug) newErrors.banner_slug = "Slug is required";
        if (!image) newErrors.image = "Image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
const handleSubmit = async (e) => {
        e.preventDefault();
  setValidated(true);

  if (!validateForm()) return;

  setLoading(true);
        const formData = new FormData();
        formData.append("banner_title", banner_title);
        formData.append("banner_slug", banner_slug);

        // Append new image only if user selected a file
        if (image instanceof File) {
            formData.append("banner_image", image);
        }

        try {
            await axios.put(
                `http://127.0.0.1:8000/api/slider/update/${id}`,
                formData,
                {
                   headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Slider updated successfully!");
            navigate("/admin/sliders");
        } catch (err) {
            console.error("Update failed:", err);

            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                alert("Failed to update slider.");
            }
        }
    };
//     const handleSubmit = async (e) => {
//   e.preventDefault();
//   setValidated(true);

//   if (!validateForm()) return;

//   setLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append("banner_title", banner_title);
//     formData.append("banner_slug", banner_slug);

//     if (image instanceof File) {
//       formData.append("image", image);
//     }

//     const response = await fetch(
//       `http://localhost:8000/api/slider/update/${id}`,
//       {
//         method: "put", 
//         headers: {
//           Accept: "application/json",
//         },
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     if (response.ok) {
//       navigate(
//         `/${role}/sliders?success=Slider%20has%20been%20Updated%20successfully`
//       );
//     } else {
//       alert("Update failed: " + data.error);
//     }
//   } catch (err) {
//     alert("An error occurred: " + err.message);
//   } finally {
//     setLoading(false);
//   }
// };


    return (
        <div className="page-content">
            <Container fluid>
                <div className="top_headting_title mb-2">
                    <Row>
                        <Col lg={12}>
                            <Stack direction="horizontal" gap={3}>
                                <div className="p-2">
                                    <h4>Edit Slider</h4>
                                </div>
                                <div className="p-2 ms-auto">
                                    <Link
                                        to={`/${role}/sliders`}
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
                        <Card className="shadow-sm p-3 mb-5 rounded">
                            <Card.Body>
                                <Form
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Banner Title{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={banner_title}
                                                onChange={(e) =>
                                                    setBannerTile(e.target.value)
                                                }
                                                required
                                                isInvalid={
                                                    !!errors.banner_title
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.banner_title}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="6">
                                            <Form.Label>
                                                Slug{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={banner_slug}
                                                onChange={(e) =>
                                                    setBannerSlug(e.target.value)
                                                }
                                                required
                                                isInvalid={!!errors.banner_slug}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.banner_slug}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
  <Form.Group as={Col} md="6">
    <Row>
      {/* File Upload */}
      <Col md={10}>
        <Form.Label>
          Banner Image <span className="text-danger">*</span>
        </Form.Label>

        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          isInvalid={!!errors.image}
        />

        <Form.Control.Feedback type="invalid">
          {errors.image}
        </Form.Control.Feedback>
      </Col>

      {/* Preview Image */}
      <Col md={2}>
        {image && (
          <div className="mb-2">
            <img
              src={`http://127.0.0.1:8000/uploads/slider/${image}`}
              alt="Banner"
              className="img-fluid"
              width="50"
            />
          </div>
        )}
      </Col>
    </Row>
  </Form.Group>
</Row>



                                    <Button type="submit" disabled={loading}>
                                        {loading
                                            ? "Updating..."
                                            : "Update Slider"}
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

export default EditHomeSlider;
