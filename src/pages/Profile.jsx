import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    const student = JSON.parse(
        localStorage.getItem("student")
    );

    return (
        <div>

            <nav className="navbar navbar-dark bg-primary">

                <div className="container">

                    <span className="navbar-brand">
                        Student Management System
                    </span>

                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>

                </div>

            </nav>

            <div className="container mt-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h3>My Profile</h3>

                        <hr />

                        <p>
                            <strong>Name:</strong>{" "}
                            {student?.name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {student?.email}
                        </p>

                        <p>
                            <strong>Mobile:</strong>{" "}
                            {student?.mobile}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {student?.role}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;