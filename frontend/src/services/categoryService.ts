import apiClient from './api';
import type { Category, CategoryFormData, ApiResponse } from '../types';

export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/api/categories/');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (categoryId: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/api/categories/${categoryId}`);
    return response.data;
  },

  // Create new category
  createCategory: async (categoryData: CategoryFormData): Promise<Category> => {
    const response = await apiClient.post<Category>('/api/categories/', categoryData);
    return response.data;
  },

  // Update category
  updateCategory: async (categoryId: number, categoryData: CategoryFormData): Promise<Category> => {
    const response = await apiClient.put<Category>(`/api/categories/${categoryId}`, categoryData);
    return response.data;
  },

  // Delete category
  deleteCategory: async (categoryId: number): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/api/categories/${categoryId}`);
    return response.data;
  },
};
