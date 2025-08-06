# 🔧 MediaSchool.ai Backend

> API server and business logic for the MediaSchool.ai platform

## 🏗️ Planned Architecture

```
backend/
├── 📁 api/                 # REST API endpoints
│   ├── auth/              # Authentication routes
│   ├── courses/           # Course management
│   ├── users/             # User management
│   ├── payments/          # Payment processing
│   └── content/           # Content management
├── 📁 models/             # Database models
│   ├── User.js            # User model
│   ├── Course.js          # Course model
│   ├── Subscription.js    # Subscription model
│   └── Progress.js        # Learning progress
├── 📁 services/           # Business logic
│   ├── AuthService.js     # Authentication logic
│   ├── PaymentService.js  # Payment processing
│   ├── EmailService.js    # Email notifications
│   └── AIService.js       # AI chat integration
├── 📁 middleware/         # Express middleware
│   ├── auth.js            # Authentication middleware
│   ├── validation.js      # Input validation
│   └── rateLimit.js       # Rate limiting
├── 📁 utils/              # Helper functions
│   ├── database.js        # DB connection
│   ├── logger.js          # Logging utility
│   └── config.js          # Configuration
├── 📁 tests/              # Test files
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── 📄 package.json        # Dependencies
├── 📄 server.js           # Main server file
└── 📄 .env.example        # Environment variables template
```

## 🚀 Technology Stack

### **Runtime & Framework**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety (optional)

### **Database**
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Prisma/Sequelize** - ORM

### **Authentication**
- **JWT** - JSON Web Tokens
- **Passport.js** - Authentication strategies
- **bcrypt** - Password hashing

### **External Services**
- **Stripe** - Payment processing
- **SendGrid** - Email delivery
- **OpenAI API** - AI chat functionality
- **AWS S3** - File storage

## 🎯 Core Features

### **Authentication System**
```javascript
// User registration
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/refresh-token
```

### **Course Management**
```javascript
// Course CRUD operations
GET    /api/courses              # List courses
GET    /api/courses/:id          # Get course details
POST   /api/courses              # Create course (admin)
PUT    /api/courses/:id          # Update course (admin)
DELETE /api/courses/:id          # Delete course (admin)
```

### **User Progress**
```javascript
// Learning progress tracking
GET  /api/progress/:courseId     # Get course progress
POST /api/progress/:courseId     # Update progress
GET  /api/progress/user/:userId  # Get user's all progress
```

### **Subscription Management**
```javascript
// Subscription handling
GET  /api/subscriptions          # Get user subscriptions
POST /api/subscriptions          # Create subscription
PUT  /api/subscriptions/:id      # Update subscription
POST /api/subscriptions/cancel   # Cancel subscription
```

### **AI Chat System**
```javascript
// AI tutor chat
POST /api/chat/message           # Send message to AI
GET  /api/chat/history           # Get chat history
POST /api/chat/feedback          # Provide feedback
```

## 🛡️ Security Features

### **Authentication & Authorization**
- JWT token-based authentication
- Role-based access control (Student, Instructor, Admin)
- Password strength validation
- Account lockout after failed attempts

### **Data Protection**
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting per endpoint
- CORS configuration

### **Environment Security**
- Environment variables for secrets
- API key rotation
- Secure headers (Helmet.js)
- Request logging and monitoring

## 📊 Database Schema

### **Users Table**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    role ENUM('student', 'instructor', 'admin'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### **Courses Table**
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES users(id),
    price DECIMAL,
    duration_weeks INTEGER,
    difficulty ENUM('beginner', 'intermediate', 'advanced'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### **Subscriptions Table**
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    plan_type ENUM('basic', 'core', 'pro'),
    status ENUM('active', 'cancelled', 'expired'),
    stripe_subscription_id VARCHAR,
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP
);
```

## 🔧 Development Setup

### **Prerequisites**
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### **Installation**
```bash
cd backend/
npm install
cp .env.example .env
# Edit .env with your configuration
npm run migrate
npm run seed
npm run dev
```

### **Environment Variables**
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mediaschool
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# External Services
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....
OPENAI_API_KEY=sk-...

# Server
PORT=8000
NODE_ENV=development
```

## 🧪 Testing

### **Test Structure**
```bash
npm run test              # Run all tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests
npm run test:coverage     # Coverage report
```

### **Test Categories**
- **Unit Tests** - Individual functions/methods
- **Integration Tests** - API endpoints
- **Database Tests** - Model operations
- **Authentication Tests** - Auth flows

## 📈 Performance

### **Caching Strategy**
- Redis for session storage
- Course data caching
- API response caching
- Database query optimization

### **Monitoring**
- Request/response logging
- Error tracking (Sentry)
- Performance metrics
- Database query analysis

## 🚀 Deployment

### **Production Checklist**
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Load balancer configured

### **Deployment Options**
- **Railway** - Recommended for simplicity
- **Heroku** - Easy deployment
- **AWS ECS** - Scalable containers
- **DigitalOcean** - Cost-effective VPS

---

**Status**: 📋 Planning Phase - Implementation starts after frontend MVP 