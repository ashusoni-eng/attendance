import axios from "axios";

// 👇 IMPORTANT: Put your NEXT.JS backend API base URL here
const BASE_URL = "http://localhost:3000/api"; 
// Example: http://localhost:3000/api (Next.js routes)

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Add token automatically (AuthProvider se)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
    // 401 → unauthorized → logout user
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
