import apiClient from './api';
import type { User, UserDto, ApiResponse } from '../types';

export const userService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/api/users/');
    return response.data;
  },

  // Get user by ID
  getUserById: async (userId: number): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${userId}`);
    return response.data;
  },

  // Update user
  updateUser: async (userId: number, userData: UserDto): Promise<User> => {
    const response = await apiClient.put<User>(`/api/users/${userId}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId: number): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/api/users/${userId}`);
    return response.data;
  },
};
