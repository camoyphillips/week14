import axios from "axios";

// Uses Vite proxy in dev, or VITE_API_BASE in prod
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
  withCredentials: true, // if you need session cookie for /logout or auth
});

export default http;
