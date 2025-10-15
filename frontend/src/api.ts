import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL de ton backend Rails
});

export default api;
