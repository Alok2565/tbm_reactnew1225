// src/services/authService.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
}

export function getToken() {
    return localStorage.getItem('token');
}

export async function loginApi(email, password, role_slug) {
    return axios.post(`${API_BASE}/login`, { email, password, role_slug });
}

export function logout() {
    setAuthToken(null);
    localStorage.removeItem('role');
}
