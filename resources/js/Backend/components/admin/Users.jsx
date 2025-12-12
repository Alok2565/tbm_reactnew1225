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
import useTitle from "../../hooks/useTitle";
import axios from "axios";
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";

function Users() {
    useTitle("User Lists");
    const { User } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/users");
            setUsers(res.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        const baseUser = User || "admin";
        console.log("Navigating to edit:", `/${baseUser}/user/edit/${id}`);
        navigate(`/${baseUser}/user/edit/${id}`);
    };
    const handleStatus = async (id) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/users/status/${id}`
            );
            alert(response.data.message || "Status updated.");
            fetchData();
        } catch (error) {
            console.error("Error updating User status:", error);
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

    const filteredData = users.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
        if (!window.confirm("Are you sure you want to delete this User?"))
            return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
            alert("User deleted successfully.");
            // Refresh users list
            setUsers((prevusers) => prevusers.filter((r) => r.id !== id));
        } catch (error) {
            alert(
                "Error deleting User: " +
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
                                <h4>List of users</h4>
                            </div>
                            <div className="ms-auto">
                                <Link
                                    to={`/${User || "admin"}/user/add_new`}
                                    className="text-decoration-none"
                                >
                                    <Button
                                        variant="primary"
                                        className="d-flex align-items-center gap-2"
                                    >
                                        <FaPlus />
                                        Add New User
                                    </Button>
                                </Link>
                            </div>
                        </Stack>

                        {successMessage && (
                            <div
                                className="alert alert-success alert-dismissible fade show"
                                User="alert"
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
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Mobile No.</th>
                                            <th>Address</th>
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
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        {item.mobile_number}
                                                    </td>
                                                    <td>{item.address}</td>
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
                                                            } // not ===
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
                                                    colSpan="8"
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

export default Users;

// import { Link, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import {
//     Button,
//     Container,
//     Row,
//     Col,
//     Stack,
//     Card,
//     Table,
//     Form,
// } from "react-bootstrap";
// import useTitle from "../../hooks/useTitle";
// import axios from "axios";
// import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";

// function Allusers() {
//     useTitle("User Lists");
//     const { User } = useParams();
//     const location = useLocation();

//     const [users, setUsers] = useState([]);
//     const [successMessage, setSuccessMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [entriesPerPage, setEntriesPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get("http://127.0.0.1:8000/api/users");
//                 setUsers(res.data.data || []);
//                 //console.log(res.data.data || []);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleStatus = async (id) => {
//         try {
//             const response = await axios.get(
//                 `http://127.0.0.1:8000/api/users/status/${id}`,
//                 { method: "PUT" }
//             );
//             const data = await response.json();
//             if (response.ok) {
//                 alert("User status updated successfully.");
//                 fetchData();
//             } else {
//                 alert("Failed to update User status: " + data.error);
//             }
//         } catch (err) {
//             console.error("Error updating User status:", err);
//         }
//     };

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const success = params.get("success");
//         if (success) setSuccessMessage(success);
//     }, [location]);

//     const filteredData = users.filter((item) =>
//         item.User_name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//     const indexOfLastItem = currentPage * entriesPerPage;
//     const indexOfFirstItem = indexOfLastItem - entriesPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//     const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
//     const handleEntriesChange = (e) => {
//         setEntriesPerPage(parseInt(e.target.value));
//         setCurrentPage(1);
//     };

//     return (
//         <div className="page-content">
//             <Container fluid>
//                 <div className="top_headting_title m-2">
//                     <Row>
//                         <Col lg={12}>
//                             <Stack
//                                 direction="horizontal"
//                                 gap={3}
//                                 className="mb-3"
//                             >
//                                 <div>
//                                     <h4>List of users</h4>
//                                 </div>
//                                 <div className="ms-auto">
//                                     <Link
//                                         to={`/${User || "admin"}/User/add_new`}
//                                         className="text-decoration-none"
//                                     >
//                                         <Button
//                                             variant="primary"
//                                             className="d-flex align-items-center gap-2"
//                                         >
//                                             <FaPlus />
//                                             Add New User
//                                         </Button>
//                                     </Link>
//                                 </div>
//                             </Stack>
//                         </Col>
//                     </Row>
//                 </div>
//                 <Row>
//                     <Col lg={12}>
//                         {successMessage && (
//                             <div
//                                 className="alert alert-success alert-dismissible fade show"
//                                 User="alert"
//                             >
//                                 <strong>Success!</strong> {successMessage}
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     data-bs-dismiss="alert"
//                                     aria-label="Close"
//                                 ></button>
//                             </div>
//                         )}

//                         <Card className="shadow-sm p-3 rounded">
//                             <Card.Body>
//                                 <div className="d-flex justify-content-between mb-3">
//                                     <div>
//                                         Show{" "}
//                                         <Form.Select
//                                             size="sm"
//                                             style={{
//                                                 width: "80px",
//                                                 display: "inline",
//                                             }}
//                                             onChange={handleEntriesChange}
//                                             value={entriesPerPage}
//                                         >
//                                             {[5, 10, 25, 50].map((num) => (
//                                                 <option key={num} value={num}>
//                                                     {num}
//                                                 </option>
//                                             ))}
//                                         </Form.Select>{" "}
//                                         entries
//                                     </div>
//                                     <div>
//                                         Search:{" "}
//                                         <Form.Control
//                                             type="text"
//                                             placeholder="Search"
//                                             size="sm"
//                                             style={{
//                                                 width: "200px",
//                                                 display: "inline",
//                                             }}
//                                             value={searchTerm}
//                                             onChange={(e) =>
//                                                 setSearchTerm(e.target.value)
//                                             }
//                                         />
//                                     </div>
//                                 </div>

//                                 <Table striped bordered hover responsive>
//                                     <thead>
//                                         <tr>
//                                             <th>#</th>
//                                             <th>User Name</th>
//                                             <th>Slug</th>
//                                             <th>Date of creation</th>
//                                             <th>Status</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {currentItems.length > 0 ? (
//                                             currentItems.map((item, index) => (
//                                                 <tr key={item.id}>
//                                                     <td>
//                                                         {indexOfFirstItem +
//                                                             index +
//                                                             1}
//                                                     </td>
//                                                     <td>{item.User_name}</td>
//                                                     <td>{item.User_slug}</td>
//                                                     <td>
//                                                         {new Date(
//                                                             item.created_at
//                                                         ).toLocaleString()}
//                                                     </td>
//                                                     {/* <td>
//                                                         {item.status}
//                                                         <Button variant="warning">
//                                                             Active
//                                                         </Button>
//                                                     </td> */}
//                                                     <td>
//                                                         <Button
//                                                             onClick={() =>
//                                                                 handleStatus(
//                                                                     item._id
//                                                                 )
//                                                             }
//                                                             variant={
//                                                                 item.status ===
//                                                                 "1"
//                                                                     ? "success"
//                                                                     : "danger"
//                                                             }
//                                                         >
//                                                             {item.status ===
//                                                             "1" ? (
//                                                                 <MdOutlineToggleOn />
//                                                             ) : (
//                                                                 <MdOutlineToggleOff />
//                                                             )}
//                                                         </Button>
//                                                     </td>
//                                                     <td className="gap-5">
//                                                         <Button
//                                                             variant="success"
//                                                             className="btn btn-success"
//                                                         >
//                                                             <FaEdit />
//                                                         </Button>
//                                                         <Button
//                                                             variant="danger"
//                                                             className="btn btn-danger"
//                                                         >
//                                                             <RiDeleteBin6Fill />
//                                                         </Button>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td
//                                                     colSpan="4"
//                                                     className="text-center"
//                                                 >
//                                                     No records found
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </Table>

//                                 {/* Pagination */}
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <div>
//                                         Showing {indexOfFirstItem + 1} to{" "}
//                                         {Math.min(
//                                             indexOfLastItem,
//                                             filteredData.length
//                                         )}{" "}
//                                         of {filteredData.length} entries
//                                     </div>
//                                     <ul className="pagination mb-0">
//                                         {Array.from(
//                                             { length: totalPages },
//                                             (_, index) => (
//                                                 <li
//                                                     key={index}
//                                                     className={`page-item ${
//                                                         currentPage ===
//                                                         index + 1
//                                                             ? "active"
//                                                             : ""
//                                                     }`}
//                                                     style={{
//                                                         cursor: "pointer",
//                                                     }}
//                                                 >
//                                                     <span
//                                                         className="page-link"
//                                                         onClick={() =>
//                                                             handlePageChange(
//                                                                 index + 1
//                                                             )
//                                                         }
//                                                     >
//                                                         {index + 1}
//                                                     </span>
//                                                 </li>
//                                             )
//                                         )}
//                                     </ul>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default Allusers;
