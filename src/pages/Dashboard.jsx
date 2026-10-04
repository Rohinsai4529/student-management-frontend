import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const student = JSON.parse(localStorage.getItem("student"));

    const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
};

    if (!student) {
        navigate("/");
        return null;
    }

    const isAdmin = student.role === "ADMIN";

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand">
                        Student Management System
                    </span>

                    <div>
                        {isAdmin && (
                            <button
                                className="btn btn-light me-2"
                                onClick={() => navigate("/students")}
                            >
                                Manage Students
                            </button>
                        )}

                        <button
                            className="btn btn-outline-light me-2"
                            onClick={() => navigate("/profile")}
                        >
                            Profile
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">

                <h2>Welcome, {student.name}!</h2>

                <p className="text-muted">
                    Logged in as: <strong>{student.role}</strong>
                </p>

                <div className="row mt-4">

                    <div className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5>My Profile</h5>

                                <p>
                                    View your personal information.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/profile")}
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="col-md-4 mb-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5>Student Management</h5>

                                    <p>
                                        Add, update, search and delete students.
                                    </p>

                                    <button
                                        className="btn btn-success"
                                        onClick={() => navigate("/students")}
                                    >
                                        Manage Students
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-md-4 mb-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5>Account</h5>

                                <p>Email:</p>

                                <strong>{student.email}</strong>

                                <p className="mt-2">
                                    Role: <strong>{student.role}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;