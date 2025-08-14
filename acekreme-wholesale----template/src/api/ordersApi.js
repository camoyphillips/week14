import api from './axiosConfig';
const BASE = '/admin/orders';

export const listOrders = async () => (await api.get(`${BASE}/api`)).data;
export const createOrder = async (payload) => (await api.post(`${BASE}/add`, new URLSearchParams(payload))).data;
export const updateOrder = async (id, payload) => (await api.post(`${BASE}/edit/${id}?_method=PUT`, new URLSearchParams(payload))).data;
export const deleteOrder = async (id) => (await api.post(`${BASE}/delete/${id}`)).data;
