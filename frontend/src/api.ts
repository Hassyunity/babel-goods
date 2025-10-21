import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // prend l’URL depuis .env
});

export default api;
