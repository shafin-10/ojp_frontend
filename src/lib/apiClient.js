// src/lib/api/apiClient.js
import axios from 'axios';

const BASE_URL = 'http://your-api-url.com/api';  // Replace with your API URL

// Public API instance (no auth required)
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// Private API instance (requires auth)
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// Request interceptor for private routes
axiosPrivate.interceptors.request.use(
  config => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (!config.headers['Authorization'] && auth?.accessToken) {
      config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for handling token refresh
axiosPrivate.interceptors.response.use(
  response => response,
  async error => {
    const prevRequest = error?.config;
    
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      
      try {
        // Try to refresh token
        const response = await axiosPublic.get('/auth/refresh');
        const newAccessToken = response.data.accessToken;
        
        // Update auth in localStorage
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        auth.accessToken = newAccessToken;
        localStorage.setItem('auth', JSON.stringify(auth));
        
        // Retry the original request
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      } catch (error) {
        // If refresh fails, clear auth and redirect to login
        localStorage.removeItem('auth');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);