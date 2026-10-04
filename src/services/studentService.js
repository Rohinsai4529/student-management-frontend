import axios from "axios";

const API_URL = "https://student-management-system-lh17.onrender.com/api/students";

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const registerStudent = (student) => {
    return api.post("/register", student);
};

export const loginStudent = (email, password) => {
    return api.post("/login", {
        email,
        password
    });
};

export const getAllStudents = () =>
    api.get("");

export const getStudentById = (id) =>
    api.get(`/${id}`);

export const searchStudents = (name) =>
    api.get("/search", {
        params: { name }
    });

export const updateStudent = (id, student) =>
    api.put(`/${id}`, student);

export const deleteStudent = (id) =>
    api.delete(`/${id}`);