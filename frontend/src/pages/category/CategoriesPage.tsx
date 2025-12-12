// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { MainLayout } from '../../layouts';
// import { Card, Loader } from '../../components/common';
// import { categoryService } from '../../services/categoryService';
// import type { Category } from '../../types';
// import { FolderOpen } from 'lucide-react';
// import { toast } from 'react-toastify';

// export const CategoriesPage: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const data = await categoryService.getAllCategories();
//       setCategories(data);
//     } catch (error) {
//       toast.error('Failed to load categories');
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
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center space-x-3 mb-8">
//           <FolderOpen className="text-primary-600" size={36} />
//           <h1 className="text-4xl font-bold text-gray-900">All Categories</h1>
//         </div>

//         {categories.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {categories.map((category) => (
//               <Link key={category.categoryId} to={`/categories/${category.categoryId}`}>
//                 <Card className="h-full hover:border-primary-500 border-2 border-transparent transition-all">
//                   <div className="flex items-start space-x-3">
//                     <FolderOpen className="text-primary-600 flex-shrink-0 mt-1" size={24} />
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-2">
//                         {category.categoryTitle}
//                       </h3>
//                       <p className="text-gray-600">
//                         {category.categoryDescription}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">No categories found</p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { Card, Loader } from '../../components/common';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../types';
import { FolderOpen } from 'lucide-react';
import { toast } from 'react-toastify';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
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
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center space-x-4 mb-10">
          <h1 className="text-4xl font-bold text-gray-900">All Categories</h1>
        </div>

        {/* Category Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {categories.map((category) => (
              <Link key={category.categoryId} to={`/categories/${category.categoryId}`}>
                <Card
                  className="h-full transition-all p-6 rounded-2xl border border-gray-200
                             bg-white hover:shadow-xl hover:-translate-y-1 hover:border-primary-400"
                >
                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div className="p-3 bg-primary-100 text-primary-700 rounded-xl shadow-sm">
                      <FolderOpen size={24} />
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.categoryTitle}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {category.categoryDescription}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No categories found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
