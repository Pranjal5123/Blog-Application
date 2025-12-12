import apiClient from './api';
import type { Comment, CommentFormData, ApiResponse } from '../types';

export const commentService = {
  // Create comment on a post
  createComment: async (postId: number, commentData: CommentFormData): Promise<Comment> => {
    const response = await apiClient.post<Comment>(`/api/post/${postId}/comments`, commentData);
    return response.data;
  },

  // Delete comment
  deleteComment: async (commentId: number): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse>(`/api/comments/${commentId}`);
    return response.data;
  },
};
