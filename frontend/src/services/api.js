// frontend/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// 🔹 Fetch route & emission data
export const getRoute = async (start, end, mode) => {
  try {
    const response = await API.post("/route", { start, end, mode });
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw error;
  }
};
