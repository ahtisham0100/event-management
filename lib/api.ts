import axios from 'axios';

const API_URL = ''; // Use local proxy to avoid CORS issues

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh (optional/advanced) or errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Check if error is 401 (Unauthorized)
        if (error.response?.status === 401) {
            // In a clear implementation, we might try to refresh the token here
            // For now, we'll just logout or let the caller handle it
            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh_token');
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);
