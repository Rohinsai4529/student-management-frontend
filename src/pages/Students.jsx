import { useEffect, useState } from "react";
import {
    getAllStudents,
    searchStudents,
    updateStudent,
    deleteStudent,
    registerStudent
} from "../services/studentService";

import { useNavigate } from "react-router-dom";

function Students() {
    const navigate = useNavigate();

const student = JSON.parse(localStorage.getItem("student"));

if (!student || student.role !== "ADMIN") {
    navigate("/dashboard");
    return null;
}

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const loadStudents = async () => {
        try {
            const response = await getAllStudents();
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleSearch = async () => {

        if (!search.trim()) {
            loadStudents();
            return;
        }

        try {
            const response = await searchStudents(search);
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editingId) {
                await updateStudent(editingId, formData);
                alert("Student updated successfully");
            } else {
                await registerStudent(formData);
                alert("Student added successfully");
            }

            resetForm();
            loadStudents();

        } catch (error) {
            console.error(error);
            alert("Operation failed");
        }
    };

    const handleEdit = (student) => {

        setEditingId(student.id);

        setFormData({
            name: student.name,
            mobile: student.mobile,
            email: student.email,
            password: student.password,
            role: student.role
        });

        setShowForm(true);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            await deleteStudent(id);
            alert("Student deleted successfully");
            loadStudents();
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    const resetForm = () => {

        setFormData({
            name: "",
            mobile: "",
            email: "",
            password: "",
            role: "STUDENT"
        });

        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Students</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close" : "Add Student"}
                </button>

            </div>

            {showForm && (
                <div className="card shadow p-4 mb-4">

                    <h4>
                        {editingId ? "Edit Student" : "Add Student"}
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            {editingId ? "Update" : "Save"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    </form>

                </div>
            )}

            <div className="input-group mb-4">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search student by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="btn btn-dark"
                    onClick={handleSearch}
                >
                    Search
                </button>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {students.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No students found
                                        </td>
                                    </tr>

                                ) : (

                                    students.map((student) => (

                                        <tr key={student.id}>

                                            <td>{student.id}</td>

                                            <td>{student.name}</td>

                                            <td>{student.mobile}</td>

                                            <td>{student.email}</td>

                                            <td>
                                                <span className="badge bg-primary">
                                                    {student.role}
                                                </span>
                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() =>
                                                        handleEdit(student)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleDelete(student.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Students;