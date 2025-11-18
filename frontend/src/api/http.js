import axios from 'axios';

const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api', timeout:15000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// For debugging - remove after testing
console.log('API Base URL:', import.meta.env.VITE_API_URL);

export default api;