import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable if you're using cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    // Add auth header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request details in development
    if (import.meta.env.DEV) {
      console.log(
        `Making ${config.method?.toUpperCase()} request to: ${config.url}`,
        {
          headers: config.headers,
          data: config.data,
          params: config.params,
        }
      );
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log("Response received:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out. Please try again.");
    }

    if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }

    switch (error.response.status) {
      case 401:
        // Handle unauthorized error
        localStorage.removeItem("token"); // Clear invalid token
        // You might want to redirect to login or trigger a logout action
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");

      case 403:
        throw new Error("You don't have permission to perform this action.");

      case 404:
        throw new Error("The requested resource was not found.");

      case 422:
        // Handle validation errors
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          throw new Error(Object.values(validationErrors).join(", "));
        }
        throw new Error("Invalid input. Please check your data.");

      case 429:
        throw new Error("Too many requests. Please try again later.");

      case 500:
        throw new Error("Server error. Please try again later.");

      case 503:
      case 504:
        throw new Error("Server is currently unavailable. Please try again later.");

      default:
        // Get error message from response or use a default
        const errorMessage = error.response.data?.message 
          || error.response.data?.error 
          || "An unexpected error occurred. Please try again.";
        throw new Error(errorMessage);
    }
  }
);

// Add utility methods to the instance
axiosInstance.setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

axiosInstance.clearAuthToken = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Initialize auth header from stored token
const storedToken = localStorage.getItem("token");
if (storedToken) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
}

export default axiosInstance;