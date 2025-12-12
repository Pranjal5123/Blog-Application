import React, { useState, useEffect } from 'react';
import { MainLayout } from '../../layouts';
import { PostCard } from '../../components/post';
import { Loader } from '../../components/common';
import { Pagination } from '../../components/common';
import { postService } from '../../services/postService';
import type { Post, PostResponse } from '../../types';
import { toast } from 'react-toastify';

export const PostListPage: React.FC = () => {
  const [postResponse, setPostResponse] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts({
        pageNumber: page,
        pageSize: 9,
        sortBy: 'addedDate',
        sortDir: 'desc',
      });
      setPostResponse(data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Posts</h1>

        {postResponse && postResponse.content.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postResponse.content.map((post: Post) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </div>

            {postResponse.totalPages > 1 && (
              <Pagination
                currentPage={postResponse.pageNumber}
                totalPages={postResponse.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
