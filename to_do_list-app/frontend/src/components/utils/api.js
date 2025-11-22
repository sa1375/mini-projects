// src/utils/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://to-do-list-app-backend-l8jz.onrender.com",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post("http://localhost:8000/api/token/refresh/", {
                    refresh: refreshToken,
                });
                localStorage.setItem("access_token", response.data.access);
                if (response.data.refresh) {
                    localStorage.setItem("refresh_token", response.data.refresh);
                }

                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return api(originalRequest); // Retry the original request
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = "/login"; // Redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;