import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const backend = "http://localhost:8000";

// Create an instance for authenticated requests
const api = axios.create({
  baseURL: backend,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a separate instance for public endpoints
const publicApi = axios.create({
  baseURL: backend,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth interceptor only to the main api instance
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const checkHealth = async () => {
  try {
    // Use publicApi for health check
    const response = await publicApi.get("/api/health/");
    console.log("Health status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
  }
};

export { publicApi };
export default api;