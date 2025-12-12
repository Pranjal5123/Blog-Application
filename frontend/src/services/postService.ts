import apiClient from './api';
import type { Post, PostResponse, PaginationParams } from '../types';

export const postService = {
  // Get all posts with pagination
  getAllPosts: async (params?: PaginationParams): Promise<PostResponse> => {
    const response = await apiClient.get<PostResponse>('/api/posts', { params });
    return response.data;
  },

  // Get post by ID
  getPostById: async (postId: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/api/posts/${postId}`);
    return response.data;
  },

  // Get posts by category
  getPostsByCategory: async (categoryId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/api/category/${categoryId}/posts`);
    return response.data;
  },

  // Get posts by user
  getPostsByUser: async (userId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/api/user/${userId}/posts`);
    return response.data;
  },

  // Create new post
  createPost: async (postData: { title: string; content: string }, userId: number, categoryId: number): Promise<Post> => {
    const response = await apiClient.post<Post>(`/api/user/${userId}/category/${categoryId}/posts`, postData);
    return response.data;
  },

  // Update post
  updatePost: async (postId: number, postData: { title: string; content: string }): Promise<Post> => {
    const response = await apiClient.put<Post>(`/api/posts/${postId}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (postId: number): Promise<void> => {
    await apiClient.delete(`/api/posts/${postId}`);
  },

  // Search posts
  searchPosts: async (keyword: string): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/api/posts/search/${keyword}`);
    return response.data;
  },
};
