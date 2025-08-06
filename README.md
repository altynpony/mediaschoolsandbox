# 🎓 MediaSchool.ai - AI Learning Platform

> Complete educational platform for AI learning with courses, events, community, and interactive features.

## 🏗️ Project Structure

```
mediaschool-project/
├── 🎨 frontend/          # Static website (7 pages, production ready)
├── 🚀 backend/           # Next.js full-stack app (admin panel + API)
├── 📚 docs/             # Project documentation
└── 🎯 assets/           # Shared resources (logos, images)
```

## 🚀 Quick Start

### **Frontend (Marketing Website) ✅**
```bash
cd frontend/
python3 -m http.server 8000
# Open http://localhost:8000
```

**Features:**
- Complete 7-page marketing website
- AI chat functionality
- Course catalog and events
- Subscription flow interface
- Responsive design
- Ready for deployment

### **Backend (Admin Panel + API) ✅**
```bash
cd backend/
npm install
npm run dev
# Open http://localhost:3000
```

**Features:**
- Next.js 15 with TypeScript
- User authentication (Google OAuth)
- Course management system
- PostgreSQL database with Drizzle ORM
- Admin panel for content management
- API endpoints for frontend integration

## 🎯 Complete System Architecture

### ✅ **Production Ready Components**

#### **Frontend (Static Website)**
- **Technology**: HTML5, Tailwind CSS, Vanilla JS
- **Pages**: Landing, Courses, Events, Library, Chat, Subscription
- **Deployment**: GitHub Pages, Netlify, Vercel
- **Status**: Ready for immediate deployment

#### **Backend (Full-Stack App)**
- **Technology**: Next.js 15, TypeScript, PostgreSQL
- **Features**: Authentication, Course Management, User Profiles
- **Database**: Drizzle ORM + Neon PostgreSQL
- **API**: RESTful endpoints for frontend integration
- **Status**: Production ready with authentication

### 🔗 **Integration Flow**
```
Frontend Website → Backend API → Database
     ↓                ↓            ↓
Static Pages    Admin Panel    User Data
Course Info     Content Mgmt   Progress
Subscription    Analytics      Courses
```

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - Interactive features
- **Responsive Design** - Mobile-first approach

### **Backend**
- **Next.js 15** - Full-stack React framework
- **TypeScript** - Type safety
- **Better Auth** - Authentication system
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Robust database
- **Radix UI** - Accessible components

### **Infrastructure**
- **Frontend Hosting**: GitHub Pages, Netlify, Vercel
- **Backend Hosting**: Vercel, Railway, Heroku
- **Database**: Neon (serverless PostgreSQL)
- **Authentication**: Google OAuth

## 📋 Development Workflow

### **Frontend Development**
```bash
cd frontend/
# Edit HTML, CSS, JS files
python3 -m http.server 8000  # Test locally
git add . && git commit -m "feat: update"
git push origin main
```

### **Backend Development**
```bash
cd backend/
npm run dev                   # Development server
npx drizzle-kit studio        # Database GUI
npm run build                 # Production build
```

### **Full Integration**
1. **Backend**: Manage courses, users, content
2. **API**: Expose data endpoints
3. **Frontend**: Consume API data for dynamic content
4. **Deploy**: Both systems independently

## 🌐 Deployment Options

### **Frontend Deployment**
- **GitHub Pages**: Free static hosting
- **Netlify**: Continuous deployment from Git
- **Vercel**: Instant deployment with CDN

### **Backend Deployment**
- **Vercel**: Seamless Next.js deployment
- **Railway**: Full-stack with database
- **Heroku**: Traditional platform-as-a-service

### **Database**
- **Neon**: Serverless PostgreSQL (recommended)
- **Supabase**: PostgreSQL with real-time features
- **PlanetScale**: MySQL with branching

## 📊 Current Status

### ✅ **Completed**
- **Frontend MVP**: Complete marketing website
- **Backend System**: Full authentication and course management
- **Database Schema**: User and course models
- **Admin Panel**: Content management interface
- **Integration Ready**: API endpoints for frontend

### 🚧 **Next Steps**
- **API Integration**: Connect frontend with backend data
- **Payment System**: Stripe integration for subscriptions
- **Content Upload**: File management for course materials
- **Analytics**: User behavior and course progress tracking

## 🎯 Business Value

### **Immediate Benefits**
- **Marketing Website**: Attracts customers and showcases offerings
- **User Management**: Handle registrations and authentication
- **Course Administration**: Manage content and student progress
- **Scalable Architecture**: Ready for growth and new features

### **Growth Potential**
- **E-commerce**: Subscription and course sales
- **Community**: User-generated content and discussions
- **Analytics**: Data-driven insights and optimization
- **Mobile**: React Native app using same backend

## 📞 Support & Documentation

- **Frontend Docs**: `/frontend/README.md`
- **Backend Docs**: `/backend/README.md`
- **API Documentation**: Available in backend admin panel
- **Deployment Guides**: `/docs` directory

## 🔐 Security & Performance

- **Authentication**: Industry-standard OAuth implementation
- **Database**: Type-safe queries prevent SQL injection
- **Performance**: Optimized for both static and dynamic content
- **Scalability**: Serverless architecture handles traffic spikes

---

**Built with ❤️ in Prague** | **© 2025 Prague Media School**

**Repository**: https://github.com/altynpony/mediaschool 