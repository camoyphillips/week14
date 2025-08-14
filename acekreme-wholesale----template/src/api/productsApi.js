import api from './axiosConfig';

// Back-end exposes JSON at /admin/products/api
const BASE = '/admin/products';

export const listProducts = async () => {
  const { data } = await api.get(`${BASE}/api`);
  return data;
};

export const createProduct = async (payload) => {
  // Admin add form in Express is at POST /admin/products/add (form)
  // We'll POST JSON to a dedicated endpoint you already return JSON from:
  // If you only have form routes, add a JSON route in backend. For now, reuse /add.
  const form = new URLSearchParams(payload); // express.urlencoded support
  const { data } = await api.post(`${BASE}/add`, form);
  return data;
};

export const updateProduct = async (id, payload) => {
  const form = new URLSearchParams(payload);
  const { data } = await api.post(`${BASE}/edit/${id}?_method=POST`, form);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.post(`${BASE}/delete/${id}`);
  return data;
};
