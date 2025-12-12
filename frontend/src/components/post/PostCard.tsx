// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card } from '../common/Card';
// import { formatDate, truncateText } from '../../utils/helpers';
// import type { Post } from '../../types';
// import { Calendar, User, FolderOpen, MessageCircle } from 'lucide-react';

// interface PostCardProps {
//   post: Post;
// }

// export const PostCard: React.FC<PostCardProps> = ({ post }) => {
//   return (
//     <Card>
//       <Link to={`/posts/${post.postId}`}>
//         <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors mb-2">
//           {post.title}
//         </h3>
//       </Link>
      
//       <p className="text-gray-600 mb-4">
//         {truncateText(post.content, 150)}
//       </p>
      
//       <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//         <div className="flex items-center space-x-1">
//           <User size={16} />
//           <span>{post.user.name}</span>
//         </div>
        
//         <div className="flex items-center space-x-1">
//           <Calendar size={16} />
//           <span>{formatDate(post.addedDate)}</span>
//         </div>
        
//         <div className="flex items-center space-x-1">
//           <FolderOpen size={16} />
//           <Link 
//             to={`/categories/${post.categories.categoryId}`}
//             className="hover:text-primary-600 transition-colors"
//           >
//             {post.categories.categoryTitle}
//           </Link>
//         </div>
        
//         <div className="flex items-center space-x-1">
//           <MessageCircle size={16} />
//           <span>{post.comments.length} Comments</span>
//         </div>
//       </div>
//     </Card>
//   );
// };





import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { formatDate, truncateText } from '../../utils/helpers';
import type { Post } from '../../types';
import { Calendar, User, FolderOpen, MessageCircle } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white">
      
      {/* Title */}
      <Link to={`/posts/${post.postId}`}>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-snug 
                       hover:text-primary-700 transition-colors hover:underline underline-offset-4">
          {post.title}
        </h3>
      </Link>

      {/* Content */}
      <p className="text-gray-600 mb-5 leading-relaxed">
        {truncateText(post.content, 150)}
      </p>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
        
        {/* Author */}
        <div className="flex items-center gap-2 text-primary-700">
          <User size={16} className="text-blue-600" />
          <span>{post.user.name}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} className="text-amber-600" />
          <span>{formatDate(post.addedDate)}</span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <FolderOpen size={16} className="text-purple-600" />
          <Link
            to={`/categories/${post.categories.categoryId}`}
            className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md hover:bg-purple-200 transition-colors"
          >
            {post.categories.categoryTitle}
          </Link>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle size={16} className="text-green-600" />
          <span>{post.comments.length} Comments</span>
        </div>

      </div>
    </Card>
  );
};
