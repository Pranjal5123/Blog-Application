import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters').max(10, 'Password must be at most 10 characters'),
  age: z.number().min(1, 'Age must be a positive number'),
  gender: z.string().min(1, 'Gender is required'),
});

export const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  categoryId: z.number().min(1, 'Please select a category'),
});

export const categorySchema = z.object({
  categoryTitle: z.string().min(4, 'Category title must be at least 4 characters'),
  categoryDescription: z.string().min(10, 'Category description must be at least 10 characters'),
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty'),
});
