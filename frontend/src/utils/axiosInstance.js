// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 10000,
//   headers: { "Content-Type": "application/json" },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// utils/axiosInstance.js
// utils/axiosInstance.js
// axiosInstance.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }
    if (error.response?.status === 504) {
      throw new Error(
        "Server is taking too long to respond. Please try again."
      );
    }
    throw error;
  }
);

export default axiosInstance;
