import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { PostCard } from '../../components/post';
import { Loader, Card } from '../../components/common';
import { userService } from '../../services/userService';
import { postService } from '../../services/postService';
import type { User, Post } from '../../types';
import { User as UserIcon, Mail, Calendar, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { getInitials } from '../../utils/helpers';

export const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userData, postsData] = await Promise.all([
        userService.getUserById(Number(id)),
        postService.getPostsByUser(Number(id)),
      ]);
      setUser(userData);
      setPosts(postsData);
    } catch (error) {
      toast.error('Failed to load user profile');
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

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">User not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* User Profile Card */}
        <Card className="mb-8">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                {getInitials(user.name)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{user.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{user.age} years old</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users size={18} />
                  <span>{user.gender}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-6 text-sm">
                <div>
                  <span className="font-bold text-2xl text-primary-600">{posts.length}</span>
                  <span className="text-gray-600 ml-2">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <UserIcon size={28} className="text-primary-600" />
            <span>Posts by {user.name}</span>
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts yet</p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};


