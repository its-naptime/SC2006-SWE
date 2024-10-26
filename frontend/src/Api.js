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
