import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../services/studentService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const response =
                await loginStudent(email, password);

            if (response.data) {

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "student",
                    JSON.stringify(response.data.student)
                );

                navigate("/dashboard");

            } else {

                setError("Invalid email or password");
            }

        } catch (error) {

            console.error(error);

            setError("Invalid email or password");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Student Management System
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;