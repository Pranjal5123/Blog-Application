// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, TrendingUp, BookOpen, Loader } from 'lucide-react';
// import { toast } from 'react-toastify';
// import type { Category, Post } from '../types';
// import { postService } from '../services/postService';
// import { categoryService } from '../services/categoryService';
// import { MainLayout } from '../layouts';
// import { Button, Card } from '../components/common';
// import { PostCard } from '../components/post';

// export const HomePage: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [postsData, categoriesData] = await Promise.all([
//         postService.getAllPosts({ pageSize: 6, sortBy: 'addedDate', sortDir: 'desc' }),
//         categoryService.getAllCategories(),
//       ]);
//       setPosts(postsData.content);
//       setCategories(categoriesData);
//     } catch (error: any) {
//       toast.error('Failed to load data');
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

//   return (
//     <MainLayout>
//       {/* Hero Section */}
//       <section className="text-center py-16 px-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white mb-12">
//         <h1 className="text-5xl font-bold mb-4">Welcome to BlogApp</h1>
//         <p className="text-xl mb-8 text-primary-100">
//           Discover amazing stories, share your thoughts, and connect with writers
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <Link to="/posts">
//             <Button variant="secondary" size="lg">
//               Explore Posts
//             </Button>
//           </Link>
//           <Link to="/register">
//             <Button variant="outline" size="lg" className="bg-white bg-opacity-10 border-white text-white hover:bg-opacity-20">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Featured Categories */}
//       <section className="mb-12">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-2">
//             <TrendingUp className="text-primary-600" size={28} />
//             <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
//           </div>
//           <Link to="/categories" className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
//             <span>View All</span>
//             <ArrowRight size={20} />
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories.slice(0, 6).map((category) => (
//             <Link key={category.categoryId} to={`/categories/${category.categoryId}`}>
//               <Card className="hover:border-primary-500 border-2 border-transparent">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{category.categoryTitle}</h3>
//                 <p className="text-gray-600">{category.categoryDescription}</p>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Recent Posts */}
//       <section>
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-2">
//             <BookOpen className="text-primary-600" size={28} />
//             <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
//           </div>
//           <Link to="/posts" className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
//             <span>View All</span>
//             <ArrowRight size={20} />
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.map((post) => (
//             <PostCard key={post.postId} post={post} />
//           ))}
//         </div>
//       </section>
//     </MainLayout>
//   );
// };





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BookOpen, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import type { Category, Post } from '../types';
import { postService } from '../services/postService';
import { categoryService } from '../services/categoryService';
import { MainLayout } from '../layouts';
import {  Card } from '../components/common';
import { PostCard } from '../components/post';

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        postService.getAllPosts({ pageSize: 6, sortBy: 'addedDate', sortDir: 'desc' }),
        categoryService.getAllCategories(),
      ]);
      setPosts(postsData.content);
      setCategories(categoriesData);
    } catch (error: any) {
      toast.error('Failed to load data');
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

  return (
    <MainLayout>
      {/* Hero Section */}
    <section className="relative py-24 px-6 mb-16 rounded-3xl 
bg-linear-to-br from-gray-900 via-blue-500 to-purple-400 text-white shadow-xl overflow-hidden">

  {/* Subtle circles */}
  <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"></div>

  <div className="relative max-w-3xl mx-auto text-center">
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
      Discover Inspiring Stories & Ideas
    </h1>

    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10">
      Read blogs, share thoughts, and connect with passionate writers around the world.
    </p>

    <div className="flex justify-center gap-4">
      <Link to="/posts">
        <button className="px-6 py-3 text-lg font-semibold rounded-xl bg-primary-500 hover:bg-primary-600 shadow-md transition-all">
          Explore Posts
        </button>
      </Link>

      <Link to="/register">
        <button className="px-6 py-3 text-lg font-semibold rounded-xl border border-white/40 
        bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all shadow-md">
          Get Started
        </button>
      </Link>
    </div>
  </div>
</section>



      {/* Featured Categories */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-primary-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
          </div>

          <Link
            to="/categories"
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.categoryId} to={`/categories/${category.categoryId}`}>
              <Card
                className="p-6 transition-all duration-300 
                border border-gray-200 rounded-xl shadow-sm 
                hover:shadow-lg hover:-translate-y-1 hover:border-primary-500 cursor-pointer bg-white"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.categoryTitle}
                </h3>
                <p className="text-gray-600">{category.categoryDescription}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-primary-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
          </div>

          <Link
            to="/posts"
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};
