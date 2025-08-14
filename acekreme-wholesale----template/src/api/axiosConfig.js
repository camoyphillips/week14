import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // send session cookie if needed
  headers: { 'Content-Type': 'application/json' }
});

// Basic response error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;
