import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MainLayout } from '../../layouts';
import { Input, Textarea, Button, Loader } from '../../components/common';
import { postService } from '../../services/postService';
import { categoryService } from '../../services/categoryService';
import type { Category, PostFormData } from '../../types';
import { postSchema } from '../../utils/validation';
import { toast } from 'react-toastify';

export const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [post, categoriesData] = await Promise.all([
        postService.getPostById(Number(id)),
        categoryService.getAllCategories(),
      ]);
      
      setValue('title', post.title);
      setValue('content', post.content);
      setValue('categoryId', post.categories.categoryId);
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to load post');
      navigate('/posts');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      await postService.updatePost(Number(id), {
        title: data.title,
        content: data.content,
      });
      toast.success('Post updated successfully!');
      navigate(`/posts/${id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Post</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Post Title"
              type="text"
              placeholder="Enter an engaging title..."
              error={errors.title?.message}
              {...register('title')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="input-field"
                {...register('categoryId', { valueAsNumber: true })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
              )}
            </div>

            <Textarea
              label="Content"
              placeholder="Write your post content here..."
              rows={12}
              error={errors.content?.message}
              {...register('content')}
            />

            <div className="flex gap-4">
              <Button type="submit" variant="primary" isLoading={isLoading}>
                Update Post
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
