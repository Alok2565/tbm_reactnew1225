import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
    Button,
    Container,
    Row,
    Col,
    Stack,
    Card,
    Table,
    Form,
} from "react-bootstrap";
import useTitle from "../../../hooks/useTitle";
import axios from "axios";
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";

function HomeSliders() {
    useTitle("Sliders Lists");
    const { role } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [sliders, setSliders] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
          try {
              const res = await axios.get("http://127.0.0.1:8000/api/sliders");
              setSliders(res.data.data ?? []);
          } catch (error) {
              alert("Failed to fetch sliders. Please try again later.");
          }
        };
    useEffect(() => {
        fetchData();
      }, []);
    const handleEdit = (id) => {
        const baseRole = role || "admin";
        navigate(`/${baseRole}/slider/edit/${id}`);
    };
    const handleStatus = async (id) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/slider/status/${id}`
            );
            alert(response.data.message || "Status updated.");
            fetchData();
        } catch (error) {
            console.error("Error updating Slider status:", error);
            if (error.response) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert("Something went wrong while updating the status.");
            }
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const success = params.get("success");
        if (success) setSuccessMessage(success);
    }, [location]);

    const filteredData = sliders.filter((item) =>
        item.banner_title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const indexOfLastItem = currentPage * entriesPerPage;
    const indexOfFirstItem = indexOfLastItem - entriesPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleEntriesChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this slider?"))
            return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/slider/delete/${id}`);
            alert("Slider deleted successfully.");
            // Refresh roles list
            setSliders((prevData) => prevData.filter((r) => r.id !== id));
        } catch (error) {
            alert(
                "Error deleting Slider: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };
    return (
        <div className="page-content py-2">
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <Stack direction="horizontal" gap={3} className="mb-3">
                            <div>
                                <h4>List of Slider</h4>
                            </div>
                            <div className="ms-auto">
                                <Link
                                    to={`/${role || "admin"}/slider/add_new`}
                                    className="text-decoration-none"
                                >
                                    <Button
                                        variant="primary"
                                        className="d-flex align-items-center gap-2"
                                    >
                                        <FaPlus />
                                        Add New slider
                                    </Button>
                                </Link>
                            </div>
                        </Stack>

                        {successMessage && (
                            <div
                                className="alert alert-success alert-dismissible fade show"
                                role="alert"
                            >
                                <strong>Success!</strong> {successMessage}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                            </div>
                        )}

                        <Card className="shadow-sm p-3 rounded">
                            <Card.Body>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        Show{" "}
                                        <Form.Select
                                            size="sm"
                                            style={{
                                                width: "80px",
                                                display: "inline",
                                            }}
                                            onChange={handleEntriesChange}
                                            value={entriesPerPage}
                                        >
                                            {[5, 10, 25, 50].map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </Form.Select>{" "}
                                        entries
                                    </div>
                                    <div>
                                        Search:{" "}
                                        <Form.Control
                                            type="text"
                                            placeholder="Search"
                                            size="sm"
                                            style={{
                                                width: "200px",
                                                display: "inline",
                                            }}
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Banner Name</th>
                                            <th>Slug</th>
                                            <th>Date of Creation</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        {indexOfFirstItem +
                                                            index +
                                                            1}
                                                    </td>
                                                    <td>{item.banner_title}</td>
                                                    <td>{item.banner_slug}</td>
                                                    <td>{item.image}</td>
                                                    <td>
                                                        {new Date(
                                                            item.created_at
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            onClick={() =>
                                                                handleStatus(
                                                                    item.id
                                                                )
                                                            }
                                                            variant={
                                                                item.status == 1
                                                                    ? "success"
                                                                    : "warning"
                                                            } 
                                                        >
                                                            {item.status ==
                                                            1 ? (
                                                                <MdOutlineToggleOn />
                                                            ) : (
                                                                <MdOutlineToggleOff />
                                                            )}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    item.id
                                                                )
                                                            }
                                                            variant="success"
                                                            className="me-2"
                                                        >
                                                            <FaEdit />
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            variant="danger"
                                                        >
                                                            <RiDeleteBin6Fill />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    No records found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        Showing {indexOfFirstItem + 1} to{" "}
                                        {Math.min(
                                            indexOfLastItem,
                                            filteredData.length
                                        )}{" "}
                                        of {filteredData.length} entries
                                    </div>
                                    <ul className="pagination mb-0">
                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => (
                                                <li
                                                    key={index}
                                                    className={`page-item ${
                                                        currentPage ===
                                                        index + 1
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <span
                                                        className="page-link"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                index + 1
                                                            )
                                                        }
                                                    >
                                                        {index + 1}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomeSliders;

