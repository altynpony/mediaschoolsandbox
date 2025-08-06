# 🎓 MediaSchool.ai - AI Learning Platform

> Complete educational platform for AI learning with courses, events, community, and interactive features.

## 🏗️ Project Structure

```
mediaschool-project/
├── 🎨 frontend/          # React/Next.js web application
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   ├── components/       # Reusable UI components
│   └── pages/           # Application pages
├── ⚙️ backend/           # Node.js/Python API server
│   ├── api/             # REST API endpoints
│   ├── models/          # Database models
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── 📚 docs/             # Project documentation
│   ├── api/             # API documentation
│   ├── deployment/      # Deployment guides
│   └── development/     # Development setup
└── 🎯 assets/           # Shared resources
    ├── images/          # Brand assets, logos
    ├── fonts/           # Custom fonts
    └── icons/           # Icon sets
```

## 🚀 Quick Start

### Frontend Development
```bash
cd frontend/
npm install
npm run dev
# Open http://localhost:3000
```

### Backend Development
```bash
cd backend/
npm install
npm run dev
# API runs on http://localhost:8000
```

## 🎯 Features

### ✅ **Current (MVP)**
- **Landing Page** - Complete marketing site
- **Course Catalog** - Browse and filter courses
- **Event System** - Workshops and live sessions
- **Resource Library** - Curated learning materials
- **AI Chat** - Interactive tutor assistant
- **Subscription Flow** - Payment and billing

### 🚧 **In Development**
- **User Authentication** - Registration and login
- **Student Dashboard** - Progress tracking
- **Course Player** - Video lessons and materials
- **Community Features** - Forums and discussions
- **Admin Panel** - Content management

### 🔮 **Planned**
- **Mobile Apps** - iOS and Android
- **Live Streaming** - Real-time workshops
- **AI Assessments** - Automated testing
- **Certificates** - Digital credentials
- **Enterprise Features** - Team management

## 🛠️ Tech Stack

### Frontend
- **Framework**: React/Next.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand/Redux
- **UI Components**: Custom component library
- **Build Tool**: Webpack/Vite

### Backend
- **Runtime**: Node.js/Python
- **Framework**: Express/FastAPI
- **Database**: PostgreSQL + Redis
- **Authentication**: JWT + OAuth
- **File Storage**: AWS S3/CloudFlare R2
- **Email**: SendGrid/Mailgun

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway (Backend)
- **Database**: Supabase/PlanetScale
- **CDN**: CloudFlare
- **Monitoring**: Sentry + Analytics
- **CI/CD**: GitHub Actions

## 📋 Development Workflow

### 1. **Feature Development**
```bash
git checkout -b feature/feature-name
# Develop feature
git commit -m "feat: add feature description"
git push origin feature/feature-name
# Create Pull Request
```

### 2. **Code Quality**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Unit testing
- **Cypress** - E2E testing

### 3. **Deployment**
- **Staging**: Auto-deploy from `develop` branch
- **Production**: Manual deploy from `main` branch
- **Rollback**: Instant rollback capability

## 🎨 Design System

### **Brand Colors**
- **Primary**: `#8B5CF6` (Purple)
- **Secondary**: `#84CC16` (Green)
- **Accent**: `#C7F59B` (Light Green)
- **Neutral**: Gray scale

### **Typography**
- **Font**: Inter (Google Fonts)
- **Headings**: Light weight for large text
- **Body**: Regular weight
- **UI**: Medium weight for buttons

### **Components**
- **Buttons**: Rounded, hover effects
- **Cards**: Rounded corners with shadows
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed header with smooth scroll

## 📊 Analytics & Monitoring

### **User Analytics**
- Google Analytics 4
- Mixpanel/Amplitude
- User behavior tracking
- Conversion funnels

### **Technical Monitoring**
- Uptime monitoring
- Performance metrics
- Error tracking
- API response times

## 🔐 Security

### **Frontend**
- Content Security Policy
- XSS protection
- HTTPS enforcement
- Secure cookie handling

### **Backend**
- Input validation
- SQL injection prevention
- Rate limiting
- Authentication middleware

## 📈 Roadmap

### **Phase 1: MVP (Current)**
- ✅ Static website with all pages
- ✅ Interactive elements
- ✅ Responsive design
- ✅ Basic SEO optimization

### **Phase 2: User System**
- 🚧 User registration/login
- 🚧 Student dashboard
- 🚧 Course progress tracking
- 🚧 Payment integration

### **Phase 3: Content Platform**
- 📋 Video course player
- 📋 Live streaming
- 📋 Community features
- 📋 Advanced AI chat

### **Phase 4: Scale & Growth**
- 📋 Mobile applications
- 📋 Enterprise features
- 📋 Advanced analytics
- 📋 International expansion

## 🤝 Contributing

### **Getting Started**
1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create feature branch
5. Make changes
6. Submit Pull Request

### **Code Style**
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## 📞 Support

- **Documentation**: `/docs` folder
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@mediaschool.ai

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ in Prague** | **© 2025 Prague Media School** 