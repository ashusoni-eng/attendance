import axios from "axios";

// 👇 NESTJS BACKEND URL (NOT Next.js)
const BASE_URL = "http://localhost:3001"; 

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Add access token automatically
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // store token as accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Global error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → user ko logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login"; // redirect to login
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
