import React from 'react';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-black mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold">BlogApp</span>
            </div>
            <p className="text-black">
              A modern blogging platform where you can share your thoughts, ideas, and stories with the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-black hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="/posts" className="text-black hover:text-primary-400 transition-colors">Posts</a></li>
              <li><a href="/categories" className="text-black hover:text-primary-400 transition-colors">Categories</a></li>
              <li><a href="/about" className="text-black hover:text-primary-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-black hover:text-primary-400 transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-black hover:text-primary-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-black hover:text-primary-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-black">
          <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
