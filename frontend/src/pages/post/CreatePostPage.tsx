// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { MainLayout } from '../../layouts';
// import { Input } from '../../components/common';
// import { Textarea } from '../../components/common';
// import { Button } from '../../components/common';
// import { postService } from '../../services/postService';
// import { categoryService } from '../../services/categoryService';
// import type { Category, PostFormData } from '../../types';
// import { postSchema } from '../../utils/validation';
// import { toast } from 'react-toastify';
// import { useAuth } from '../../context/AuthContext';

// export const CreatePostPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { } = useAuth();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PostFormData>({
//     resolver: zodResolver(postSchema),
//   });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const data = await categoryService.getAllCategories();
//       setCategories(data);
//     } catch (error) {
//       toast.error('Failed to load categories');
//     }
//   };

//   const onSubmit = async (data: PostFormData) => {
//     setIsLoading(true);
//     try {
//       // For simplicity, using a hardcoded userId. In production, get from auth context
//       const userId = 1; // This should come from your auth context with the actual user ID
//       await postService.createPost(
//         { title: data.title, content: data.content },
//         userId,
//         data.categoryId
//       );
//       toast.success('Post created successfully!');
//       navigate('/posts');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to create post');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">Create New Post</h1>

//         <div className="bg-white rounded-lg shadow-md p-8">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <Input
//               label="Post Title"
//               type="text"
//               placeholder="Enter an engaging title..."
//               error={errors.title?.message}
//               {...register('title')}
//             />

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 className="input-field"
//                 {...register('categoryId', { valueAsNumber: true })}
//               >
//                 <option value="">Select a category</option>
//                 {categories.map((category) => (
//                   <option key={category.categoryId} value={category.categoryId}>
//                     {category.categoryTitle}
//                   </option>
//                 ))}
//               </select>
//               {errors.categoryId && (
//                 <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
//               )}
//             </div>

//             <Textarea
//               label="Content"
//               placeholder="Write your post content here..."
//               rows={12}
//               error={errors.content?.message}
//               {...register('content')}
//             />

//             <div className="flex gap-4">
//               <Button type="submit" variant="primary" isLoading={isLoading}>
//                 Publish Post
//               </Button>
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={() => navigate(-1)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };









import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MainLayout } from '../../layouts';
// import { Input } from '../../components/common';
// import { Textarea } from '../../components/common';
// import { Button } from '../../components/common';
import { postService } from '../../services/postService';
import { categoryService } from '../../services/categoryService';
import type { Category, PostFormData } from '../../types';
import { postSchema } from '../../utils/validation';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const {} = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      const userId = 1; 
      await postService.createPost(
        { title: data.title, content: data.content },
        userId,
        data.categoryId
      );
      toast.success('Post created successfully!');
      navigate('/posts');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4">

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-10">
          Create New Post
        </h1>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-10 transition hover:shadow-2xl">

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">

  {/* Title Field */}
  <div className="space-y-2">
    <label className="block text-lg font-semibold text-gray-900">
      Post Title
    </label>
    <input
      type="text"
      placeholder="Enter an engaging title..."
      className="w-full p-4 rounded-xl border border-gray-300 
      shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      transition bg-white text-gray-900"
      {...register('title')}
    />
    {errors.title && (
      <p className="text-red-500 text-sm">{errors.title.message}</p>
    )}
  </div>

  {/* Category */}
  <div className="space-y-2">
    <label className="block text-lg font-semibold text-gray-900">
      Category
    </label>
    <select
      className="w-full p-4 rounded-xl border border-gray-300 bg-white
      shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      transition text-gray-900"
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
      <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
    )}
  </div>

  {/* Content */}
  <div className="space-y-2">
    <label className="block text-lg font-semibold text-gray-900">
      Content
    </label>
    <textarea
      placeholder="Write your post content here..."
      rows={10}
      className="w-full p-4 rounded-xl border border-gray-300 bg-white
      shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      resize-none transition text-gray-900"
      {...register('content')}
    ></textarea>
    {errors.content && (
      <p className="text-red-500 text-sm">{errors.content.message}</p>
    )}
  </div>

 {/* Buttons */}
{/* Buttons */}
<div className="flex justify-end gap-4 pt-4">

  <button
    type="button"
    onClick={() => navigate(-1)}
    className="px-6 py-3 rounded-xl border border-gray-300 
    bg-gray-100 text-gray-800 font-semibold shadow-sm
    hover:bg-gray-200 transition"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="px-6 py-3 rounded-xl border border-gray-300 
    bg-gray-100 text-gray-800 font-semibold shadow-sm
    hover:bg-gray-200 transition"
  >
    Publish Post
  </button>

</div>



</form>

        </div>
      </div>
    </MainLayout>
  );
};
