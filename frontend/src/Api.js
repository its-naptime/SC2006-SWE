import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const backend = "http://localhost:8000";
// Create the axios instance first
const api = axios.create({
  baseURL: backend
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Then add the interceptors
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
    const response = await api.get("/api/health/");
    console.log("Health status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
  }
};

export default api;
