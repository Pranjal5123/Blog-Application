import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { Loader } from '../../components/common';
import { Button } from '../../components/common';
import { postService } from '../../services/postService';
import { commentService } from '../../services/commentService';
import type { Post, Comment } from '../../types';
import { Calendar, User, FolderOpen, Edit, Trash2, MessageCircle } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPostById(Number(id));
      setPost(data);
    } catch (error) {
      toast.error('Failed to load post');
      navigate('/posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postService.deletePost(Number(id));
      toast.success('Post deleted successfully');
      navigate('/posts');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setSubmitting(true);
      await commentService.createComment(Number(id), { content: commentContent });
      setCommentContent('');
      toast.success('Comment added successfully');
      fetchPost(); // Refresh to show new comment
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await commentService.deleteComment(commentId);
      toast.success('Comment deleted successfully');
      fetchPost(); // Refresh to remove comment
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Post not found</p>
        </div>
      </MainLayout>
    );
  }

  const isAuthor = user === post.user.name;

  return (
    <MainLayout>
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <User size={18} />
              <Link to={`/users/${post.user.id}`} className="hover:text-primary-600">
                {post.user.name}
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar size={18} />
              <span>{formatDate(post.addedDate)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <FolderOpen size={18} />
              <Link to={`/categories/${post.categories.categoryId}`} className="hover:text-primary-600">
                {post.categories.categoryTitle}
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <MessageCircle size={18} />
              <span>{post.comments.length} Comments</span>
            </div>
          </div>

          {isAuthor && (
            <div className="flex gap-3 mb-6">
              <Link to={`/posts/edit/${post.postId}`}>
                <Button variant="outline" size="sm">
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={handleDeletePost}>
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          )}

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({post.comments.length})
          </h2>

          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleAddComment} className="mb-8">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="input-field min-h-[100px]"
                required
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="mt-3"
                isLoading={submitting}
              >
                Post Comment
              </Button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">
                Please <Link to="/login" className="text-primary-600 hover:underline">login</Link> to comment
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              post.comments.map((comment: Comment) => (
                <div key={comment.id} className="border-l-4 border-primary-500 pl-4 py-3 bg-gray-50 rounded">
                  <p className="text-gray-700">{comment.content}</p>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-700 text-sm mt-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </article>
    </MainLayout>
  );
};
