import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../services/studentService";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            await registerStudent(formData);

            setMessage("Registration successful!");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.error(error);
            setError("Registration failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Student Registration
                        </h2>

                        <form onSubmit={handleRegister}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Mobile
                                </label>

                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {message && (
                                <div className="alert alert-success">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Register
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;