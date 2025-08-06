# 🚀 MediaSchool.ai Backend

> Next.js full-stack application with authentication, courses, and user management

## 🏗️ Architecture

This is a **Next.js 15** application serving as the backend/admin panel for MediaSchool.ai platform.

### **Tech Stack**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **UI**: Radix UI + Tailwind CSS
- **Internationalization**: next-intl

## 📁 Project Structure

```
backend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── courses/       # Course management
│   │   │   ├── signin/        # Authentication
│   │   │   └── profile/       # User profiles
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Auth endpoints
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   └── ui/               # Base UI components
│   └── middleware.ts          # Next.js middleware
├── drizzle/                   # Database migrations
├── messages/                  # Internationalization files
├── public/                    # Static assets
└── package.json              # Dependencies
```

## 🎯 Features

### ✅ **Implemented**
- **User Authentication** - Sign in with Google
- **Course Management** - Course pages and navigation
- **User Profiles** - User profile management
- **Internationalization** - Multi-language support
- **Database Integration** - PostgreSQL with Drizzle ORM
- **Modern UI** - Radix UI components with Tailwind
- **TypeScript** - Full type safety

### 🔧 **Components**
- Authentication system with Better Auth
- Course browsing and detail pages
- User profile management
- Responsive design
- Dark/light theme support

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- PostgreSQL database (Neon recommended)

### **Installation**
```bash
cd backend/
npm install
```

### **Environment Setup**
Create a `.env.local` file:
```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
BETTER_AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

### **Database Setup**
```bash
# Generate migrations
npx drizzle-kit generate

# Push to database
npx drizzle-kit push
```

### **Development**
```bash
npm run dev
# Open http://localhost:3000
```

## 📊 Database Schema

### **Technologies Used**
- **Drizzle ORM** - Type-safe database queries
- **Neon Database** - Serverless PostgreSQL
- **Migrations** - Version-controlled schema changes

### **Main Tables**
- Users and authentication
- Courses and content
- User progress tracking
- Subscriptions and payments (planned)

## 🔐 Authentication

### **Better Auth Integration**
- Google OAuth sign-in
- Session management
- Protected routes
- User profile handling

### **Middleware**
- Route protection
- Locale handling
- Authentication checks

## 🌐 Internationalization

### **Supported Languages**
- English (default)
- Russian
- Czech (planned)

### **Implementation**
- `next-intl` for translations
- Locale-based routing
- Message files in `/messages`

## 🎨 UI Components

### **Design System**
- **Radix UI** - Accessible components
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Theme Support** - Dark/light modes

### **Key Components**
- Navigation menu
- Course cards
- User avatars
- Authentication forms
- Profile management

## 📈 Development

### **Scripts**
```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
```

### **Database Commands**
```bash
npx drizzle-kit generate    # Generate migrations
npx drizzle-kit push        # Apply to database
npx drizzle-kit studio      # Database GUI
```

## 🚀 Deployment

### **Recommended Platforms**
- **Vercel** - Seamless Next.js deployment
- **Railway** - Full-stack deployment
- **Netlify** - Static + serverless functions

### **Environment Variables**
Ensure all environment variables are configured in your deployment platform.

## 📋 Integration with Frontend

This backend serves as:
1. **Admin Panel** - Course and user management
2. **API Server** - Data for the frontend website
3. **Authentication Hub** - User login and profiles
4. **Content Management** - Course materials and progress

The static frontend (`/frontend` directory) consumes data from this backend via API routes.

---

**Status**: ✅ **Production Ready** - Full-stack Next.js application
