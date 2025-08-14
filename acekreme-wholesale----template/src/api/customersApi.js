import api from './axiosConfig';
const BASE = '/admin/customers';

export const listCustomers = async () => (await api.get(`${BASE}/api`)).data;
export const createCustomer = async (payload) => (await api.post(`${BASE}/add`, new URLSearchParams(payload))).data;
export const updateCustomer = async (id, payload) => (await api.post(`${BASE}/edit/${id}?_method=POST`, new URLSearchParams(payload))).data;
export const deleteCustomer = async (id) => (await api.post(`${BASE}/delete/${id}`)).data;
