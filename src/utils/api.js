import axios from 'axios';

const API = axios.create({ baseURL: 'https://akshaynarsanne-portfolio-1.onrender.com/api' });

// Interceptor for including token in requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;
