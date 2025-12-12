import apiClient from './api';
import type { JwtRequest, JwtResponse, UserDto } from '../types';

export const authService = {
  // Login user
  login: async (credentials: JwtRequest): Promise<JwtResponse> => {
    const response = await apiClient.post<JwtResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register new user
  register: async (userData: UserDto): Promise<UserDto> => {
    const response = await apiClient.post<UserDto>('/auth/create-user', userData);
    return response.data;
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: (): string | null => {
    return localStorage.getItem('user');
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },
};
