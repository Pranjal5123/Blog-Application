# Blog-Application
# 📝 Insight Hub Application

> A modern, full-stack Insight Hub platform for sharing thoughts, ideas, and stories.

---

## 🚀 Project Overview

The **Insight Hub Application** is a robust platform allowing users to read, create, and manage Insight Hub posts. It features a responsive frontend built with React and Tailwind CSS, communicating with a secure Spring Boot backend.

- **🎨 Modern UI**: Clean and responsive interface using Tailwind CSS.
- **🔐 Secure Access**: User authentication and authorization.
- **✍️ Content Management**: Create, edit, and categorize Insight Hub posts.

---

## 🛠️ Tech Stack

### Frontend (`Insight Hub frontend`)

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend (`Insight Hub Application`)

- **Framework**: Spring Boot (Java)
- **Database**: SQL / NoSQL (Inferred)
- **Port**: 9292 (Default API Port)

---

## ✨ Key Features

- **User Authentication**: Register and Login functionality with secure token handling.
- **Insight Hub Posts**: Browse all posts, view details, and create new content.
- **Categories**: Filter posts by categories.
- **Rich Interaction**: Like, comment, and share functionality (as supported by API).
- **Responsive Design**: Optimized for mobile and desktop viewing.

---

## 📂 Directory Structure

```plaintext
root
├── 📁 Insight Hub frontend      # User Frontend Application (React)
└── 📁 Insight Hub Application    # Backend API (Spring Boot)
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Java JDK** (v17+)
- **Maven**

### 1. Backend Setup

_Note: Ensure the backend application is running on port 9292._

```bash
# Navigate to backend directory (if extracted)
cd Insight Hubapplication
./mvnw spring-boot:run
```

### 2. Frontend Setup

```bash
cd "Insight Hub frontend"

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## ⚙️ Configuration

**Environment Variables**
The frontend connects to the backend via `VITE_API_URL`.
Create a `.env` file in `Insight Hub frontend` if needed:

```env
VITE_API_URL=http://localhost:9292
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License

This project is licensed under the MIT License.
