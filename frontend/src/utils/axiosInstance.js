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
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle errors
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure the URL is correctly formed
    if (!config.url.startsWith('http')) {
      config.url = `${apiUrl}${config.url.startsWith('/') ? '' : '/'}${config.url}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;