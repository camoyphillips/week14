import api from './axiosConfig';
const BASE = '/admin/stores';

export const listStores = async () => (await api.get(`${BASE}/api`)).data;
export const createStore = async (payload) => (await api.post(`${BASE}/add`, new URLSearchParams(payload))).data;
export const updateStore = async (id, payload) => (await api.post(`${BASE}/edit/${id}?_method=POST`, new URLSearchParams(payload))).data;
export const deleteStore = async (id) => (await api.post(`${BASE}/delete/${id}`)).data;
