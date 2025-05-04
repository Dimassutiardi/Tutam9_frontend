import axios from 'axios';
import { getUser } from './auth';

const api = axios.create({
  baseURL: 'tutam9-dimasanandasutiardi.vercel.app',
  headers: {'Content-Type': 'application/json'}
});

api.interceptors.request.use(config => {
  const user = getUser();
  if (user) config.headers['user-id'] = user.id;
  return config;
});

const apiRequest = async (method, url, data = null) => {
  try {
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: 'Network error' };
  }
};

export const registerUser = (userData) => apiRequest('post', '/account/register', userData);
export const loginUser = (credentials) => apiRequest('post', '/account/login', credentials);

export const getNotes = () => apiRequest('get', '/note');
export const getNote = (id) => apiRequest('get', `/note/${id}`);
export const createNote = (noteData) => apiRequest('post', '/note', noteData);
export const updateNote = (id, noteData) => apiRequest('put', `/note/${id}`, noteData);
export const deleteNote = (id) => apiRequest('delete', `/note/${id}`);

export default api;