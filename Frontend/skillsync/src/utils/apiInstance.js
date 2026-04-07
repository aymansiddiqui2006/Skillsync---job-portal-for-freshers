import {baseURL} from "./apiPath.js";
import axios from "axios";

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Server responded with error
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.error("Bad Request");
          break;

        case 401:
          console.error("Unauthorized - Please login again");

          // remove token
          localStorage.removeItem("token");

          // redirect to login
          window.location.href = "/login";
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Not Found");
          break;

        case 500:
          console.error("Server Error");
          break;

        default:
          console.error("Something went wrong");
      }
    }
    // No response (network error)
    else if (error.request) {
      console.error("Network error - Server not responding");
    }
    // Other errors
    else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
