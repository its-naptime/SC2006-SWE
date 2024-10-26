import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const backend = "http://localhost:8000";
export const checkHealth = async () => {
  try {
    const response = await fetch(`${backend}/api/health/`);
    const data = await response.json();
    console.log("Health status:", data);
    return data;
  } catch (error) {
    console.error("Health check failed:", error);
  }
};

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
  }
);

export default api;
