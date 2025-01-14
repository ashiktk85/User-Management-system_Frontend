import axios from 'axios';
import { toast } from 'sonner';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  apiClient.interceptors.response.use(
    (response) => {
      const newAccessToken = response.headers['new-access-token'];
      if (newAccessToken) {
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        userData.accessToken = newAccessToken;
        localStorage.setItem('user', JSON.stringify(userData));
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      if (originalRequest._retry) {
        localStorage.removeItem('user');
        window.location.replace('/login');
        toast.warning('Session expired');
        return Promise.reject(error);
      }
  
      if (error.response) {
        const { status, data } = error.response;
  
        const authErrorMessages = [
          'Session expired, please login again',
          'Invalid user or refresh token',
          'Access token not found',
          'User not found or refresh token missing'
        ];
  
        if (authErrorMessages.includes(data.message)) {
          localStorage.removeItem('user');
          window.location.replace('/login');
          toast.warning('Session expired');
          return Promise.reject(error);
        }
  
        if (status === 401 || status === 403) {
          originalRequest._retry = true;
          return apiClient(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.request.use(
    (config) => {
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      if (userData.accessToken) {
        config.headers['Authorization'] = `Bearer ${userData.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  