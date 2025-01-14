import axios from 'axios';
import { apiClient } from '../config/axiosConfig';
import { adminAxiosInstance } from '../config/adminAxiosInstance';
import { toast } from 'sonner';


export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error; 
  }
};


export const register = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data); 
    return response.data; 
  } catch (error) {
    console.error('Error in API call:', error.response?.data || error.message); 
    throw error; 
  }
};


export const fetchUsers = async (page, limit) => {
  try {
    const { data } = await adminAxiosInstance.get(`/api/admin/get-users`, {
      params: { page, limit },
    });
    return data.users;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
};

export const promoteToAdmin = async (userId) => {
  try {
    await adminAxiosInstance.post(`/api/admin/promote-to-admin`, { userId });
  } catch (error) {
    if(error.response.data.message === "Already") {
      throw new Error("User already promoted to Admin")
    }
    
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await adminAxiosInstance.put(`/api/admin/update-user`, { userId, ...userData });
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};
