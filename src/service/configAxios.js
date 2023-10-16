import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/', 
});

//Intercept requests to add the authentication token if it's available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = token; 
    }
    return config;
  });
  
export default api;
