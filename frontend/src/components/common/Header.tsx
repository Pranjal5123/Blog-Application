import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  LogOut,
  User,
  Home,
  PenSquare,
  FolderOpen,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";



export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClasses = (path: string) =>
    `flex items-center gap-2 font-medium transition-all px-3 py-2 rounded-lg 
     ${
       pathname === path
         ? "text-primary-700 bg-primary-100 shadow-sm"
         : "text-gray-700 hover:text-primary-600 hover:bg-gray-100"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-white via-primary-50/40 to-white backdrop-blur-md shadow-sm border-b border-gray-500">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* <BookOpen className="h-8 w-8 text-primary-700 group-hover:scale-110 transition-transform duration-200" /> */}
             <img src="insightHub.png" className="h-8 w-8 text-primary-700 group-hover:scale-110 transition-transform duration-200"></img>
            
            <span className="text-2xl font-extrabold text-blue-900 tracking-tight group-hover:text-primary-700 transition-all">
              InsightHub
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4 ">
            <Link to="/" className={linkClasses("/")}>
              <Home size={18} className="text-purple-600" />
              Home
            </Link>

            <Link to="/posts" className={linkClasses("/posts")}>
              <BookOpen size={18} className="text-blue-600" />
              Posts
            </Link>

            <Link to="/categories" className={linkClasses("/categories")}>
              <FolderOpen size={18} className="text-amber-600" />
              Categories
            </Link>

            {isAuthenticated && (
              <Link to="/create-post" className={linkClasses("/create-post")}>
                <PenSquare size={18} className="text-green-600" />
                Create Post
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-5">

            <button className="p-2 rounded-lg hover:bg-primary-100 text-gray-700 hover:text-primary-700 transition-all">
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-700 transition-all font-medium"
                >
                  <User size={20} className="text-primary-700" />
                  <span className="hidden md:inline">{user}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 
                             text-white font-medium rounded-xl shadow-md hover:shadow-lg 
                             transition-all active:scale-[0.96]"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-700 font-medium hover:text-primary-800 transition-all"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 
                             shadow-md hover:shadow-lg font-medium transition-all active:scale-[0.96]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
