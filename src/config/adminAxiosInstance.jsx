import axios from 'axios';
import { toast } from 'sonner';

export const adminAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


adminAxiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      const admin = JSON.parse(localStorage.getItem('admin')) || {};
      admin.token = response.data.token;
      localStorage.setItem('admin', JSON.stringify(admin));
    }
    
    const newToken = response.headers['new-access-token'];
    if (newToken) {
      const admin = JSON.parse(localStorage.getItem('admin')) || {};
      admin.token = newToken;
      localStorage.setItem('admin', JSON.stringify(admin));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      localStorage.removeItem('admin');
      window.location.replace('/admin/login');
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
        localStorage.removeItem('admin');
        window.location.replace('/admin/login');
        toast.warning('Session expired');
        return Promise.reject(error);
      }

      if (status === 401 || status === 403) {
        originalRequest._retry = true;
        return adminAxiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);


adminAxiosInstance.interceptors.request.use(
  (config) => {
    const admin = JSON.parse(localStorage.getItem('admin')) || {};
    if (admin.token) {
      config.headers['Authorization'] = `Bearer ${admin.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

