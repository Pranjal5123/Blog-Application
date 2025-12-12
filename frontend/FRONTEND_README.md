# Blog Application Frontend

A modern, responsive blog application frontend built with React, TypeScript, and Tailwind CSS. This application provides a complete blogging platform with user authentication, post management, categories, and comments.

## 🚀 Features

### User Features
- **Authentication**: Login and registration with JWT token-based authentication
- **Post Management**: Create, read, update, and delete blog posts
- **Categories**: Browse posts by categories
- **Comments**: Add and manage comments on posts
- **User Profiles**: View user profiles and their posts
- **Responsive Design**: Fully responsive UI that works on all devices

### Technical Features
- **React 19** with TypeScript for type safety
- **React Router** for client-side routing
- **Axios** for API communication
- **React Hook Form** with Zod validation
- **Tailwind CSS** for modern styling
- **JWT Authentication** with protected routes
- **Toast Notifications** for user feedback
- **Pagination** for post listings
- **Clean Architecture** with separation of concerns

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, Card, etc.)
│   ├── post/           # Post-related components
│   ├── category/       # Category components
│   └── comment/        # Comment components
├── pages/              # Page components
│   ├── auth/           # Authentication pages (Login, Register)
│   ├── post/           # Post pages (List, Detail, Create, Edit)
│   ├── category/       # Category pages
│   └── user/           # User profile pages
├── services/           # API service layer
│   ├── api.ts          # Axios instance and interceptors
│   ├── authService.ts  # Authentication services
│   ├── postService.ts  # Post services
│   ├── categoryService.ts
│   ├── commentService.ts
│   └── userService.ts
├── context/            # React Context providers
│   └── AuthContext.tsx # Authentication context
├── layouts/            # Layout components
│   ├── MainLayout.tsx  # Main application layout
│   └── ProtectedRoute.tsx # Protected route wrapper
├── types/              # TypeScript type definitions
│   └── index.ts        # All interfaces and types
├── utils/              # Utility functions
│   ├── helpers.ts      # Helper functions
│   └── validation.ts   # Zod validation schemas
├── hooks/              # Custom React hooks
└── App.tsx             # Main application component
```

## 🛠️ Technologies Used

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Toastify** - Toast notifications
- **Vite** - Build tool

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on http://localhost:9292

## 🚦 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API Base URL

The API base URL is set in `src/services/api.ts`. By default, it points to `http://localhost:9292`.

```typescript
const API_BASE_URL = 'http://localhost:9292';
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 🔑 API Endpoints Used

### Authentication
- `POST /auth/login` - User login
- `POST /auth/create-user` - User registration

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/user/:userId/category/:categoryId/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/search/:keyword` - Search posts
- `GET /api/category/:categoryId/posts` - Get posts by category
- `GET /api/user/:userId/posts` - Get posts by user

### Categories
- `GET /api/categories/` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories/` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Comments
- `POST /api/post/:postId/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment

### Users
- `GET /api/users/` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎨 Key Components

### Common Components
- **Button**: Reusable button with variants (primary, secondary, outline, danger)
- **Input**: Form input with label and error display
- **Textarea**: Multi-line text input
- **Card**: Container component with hover effects
- **Loader**: Loading spinner (full-screen or inline)
- **Modal**: Reusable modal dialog
- **Pagination**: Pagination component for lists
- **Header**: Application header with navigation
- **Footer**: Application footer

### Page Components
- **HomePage**: Landing page with featured posts and categories
- **LoginPage**: User login form
- **RegisterPage**: User registration form
- **PostListPage**: List of all posts with pagination
- **PostDetailPage**: Detailed post view with comments
- **CreatePostPage**: Create new post form
- **EditPostPage**: Edit existing post form
- **CategoriesPage**: List of all categories
- **CategoryDetailPage**: Posts in a specific category
- **UserProfilePage**: User profile with their posts

## 🔐 Authentication Flow

1. User logs in with username and password
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is automatically added to all API requests via Axios interceptor
5. Protected routes check for valid token
6. Unauthorized requests (401) clear token and redirect to login

## 🎯 Features Implementation

### Protected Routes
Routes that require authentication are wrapped with `<ProtectedRoute>`:
- Create Post
- Edit Post
- User Profile

### Form Validation
All forms use React Hook Form with Zod validation schemas:
- Login form
- Registration form
- Post creation/editing
- Comment forms

### Error Handling
- Toast notifications for success/error messages
- Axios interceptor for centralized error handling
- Form-level validation errors
- 404 handling for missing resources

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Optimized re-renders with proper state management
- Efficient API calls with proper loading states

## 🧪 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Environment Variables

Currently, the API URL is hardcoded. For production, consider using environment variables:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9292';
```

## 📝 Notes

- Default user ID is set to 1 for post creation. This should be updated to use the actual authenticated user's ID from the backend.
- Image upload functionality is not yet implemented but the backend supports it via the `imageName` field.
- Search functionality in the header is a placeholder and needs to be connected to the search API.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Blog Application system.

## 🐛 Known Issues

- User ID is hardcoded in CreatePostPage (needs backend integration)
- Search functionality in header needs implementation
- Image upload feature not yet implemented

## 🔮 Future Enhancements

- [ ] Search functionality
- [ ] Image upload for posts
- [ ] User settings page
- [ ] Draft posts
- [ ] Post likes/reactions
- [ ] Social sharing
- [ ] Rich text editor
- [ ] Dark mode
- [ ] Internationalization (i18n)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
