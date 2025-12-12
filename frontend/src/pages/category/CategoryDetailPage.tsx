// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { MainLayout } from '../../layouts';
// import { PostCard } from '../../components/post';
// import { Loader } from '../../components/common';
// import { categoryService } from '../../services/categoryService';
// import { postService } from '../../services/postService';
// import type { Category, Post } from '../../types';
// import { FolderOpen, ArrowLeft } from 'lucide-react';
// import { toast } from 'react-toastify';

// export const CategoryDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [category, setCategory] = useState<Category | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       fetchData();
//     }
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [categoryData, postsData] = await Promise.all([
//         categoryService.getCategoryById(Number(id)),
//         postService.getPostsByCategory(Number(id)),
//       ]);
//       setCategory(categoryData);
//       setPosts(postsData);
//     } catch (error) {
//       toast.error('Failed to load category data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <Loader />
//       </MainLayout>
//     );
//   }

//   if (!category) {
//     return (
//       <MainLayout>
//         <div className="text-center py-12">
//           <p className="text-gray-600">Category not found</p>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="max-w-7xl mx-auto">
//         <Link to="/categories" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
//           <ArrowLeft size={20} className="mr-1" />
//           Back to Categories
//         </Link>

//         <div className="bg-white rounded-lg shadow-md p-8 mb-8">
//           <div className="flex items-start space-x-4">
//             <FolderOpen className="text-primary-600 flex-shrink-0 mt-1" size={48} />
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-3">
//                 {category.categoryTitle}
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 {category.categoryDescription}
//               </p>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           Posts in this category ({posts.length})
//         </h2>

//         {posts.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {posts.map((post) => (
//               <PostCard key={post.postId} post={post} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-white rounded-lg shadow-md">
//             <p className="text-gray-600 text-lg">No posts in this category yet</p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };





import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { PostCard } from '../../components/post';
import { Loader } from '../../components/common';
import { categoryService } from '../../services/categoryService';
import { postService } from '../../services/postService';
import type { Category, Post } from '../../types';
import { FolderOpen, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

export const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoryData, postsData] = await Promise.all([
        categoryService.getCategoryById(Number(id)),
        postService.getPostsByCategory(Number(id)),
      ]);
      setCategory(categoryData);
      setPosts(postsData);
    } catch (error) {
      toast.error('Failed to load category data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!category) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Category not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4">

        {/* Back Button */}
        <Link
          to="/categories"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition mb-6 font-medium"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Categories
        </Link>

        {/* Category Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-10 border border-gray-100">
          <div className="flex items-start gap-5">
            <div className="bg-primary-50 p-4 rounded-xl shadow-inner">
              <FolderOpen className="text-primary-600" size={50} />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                {category.categoryTitle}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {category.categoryDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
          Posts in this category ({posts.length})
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.postId}
                className="hover:-translate-y-1 transition-transform"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-600 text-lg">No posts in this category yet</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
