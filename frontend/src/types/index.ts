// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

export interface UserDto {
  id?: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  password?: string;
}

// Category Types
export interface Category {
  categoryId: number;
  categoryTitle: string;
  categoryDescription: string;
}

// Comment Types
export interface Comment {
  id: number;
  content: string;
}

// Post Types
export interface Post {
  postId: number;
  title: string;
  content: string;
  imageName?: string;
  addedDate: string;
  categories: Category;
  user: User;
  comments: Comment[];
}

// Auth Types
export interface JwtRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  token: string;
  username: string;
}

// API Response Types
export interface ApiResponse {
  message: string;
  success: boolean;
}

export interface PostResponse {
  content: Post[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastPage: boolean;
}

// Form Types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
}

export interface PostFormData {
  title: string;
  content: string;
  categoryId: number;
}

export interface CategoryFormData {
  categoryTitle: string;
  categoryDescription: string;
}

export interface CommentFormData {
  content: string;
}

// Pagination Types
export interface PaginationParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
}
