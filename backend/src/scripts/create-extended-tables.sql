-- Create extended tables for MediaSchool.ai

-- Tutors table
CREATE TABLE IF NOT EXISTS tutor (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  bio TEXT,
  expertise JSONB DEFAULT '[]',
  languages JSONB DEFAULT '["en"]',
  hourly_rate DECIMAL(10, 2),
  availability JSONB,
  rating DECIMAL(3, 2),
  total_students INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS event (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('meetup', 'workshop', 'live_lesson', 'conference')),
  description TEXT,
  tutor_id TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location VARCHAR(255),
  is_online BOOLEAN DEFAULT false,
  meeting_url TEXT,
  max_attendees INTEGER,
  price DECIMAL(10, 2) DEFAULT 0,
  image_url TEXT,
  tags JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Event Registrations
CREATE TABLE IF NOT EXISTS event_registration (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  event_id TEXT NOT NULL REFERENCES event(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  registered_at TIMESTAMP DEFAULT NOW(),
  attended BOOLEAN DEFAULT false,
  cancelled_at TIMESTAMP,
  notes TEXT,
  UNIQUE(event_id, user_id)
);

-- Library Items
CREATE TABLE IF NOT EXISTS library_item (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  sanity_id VARCHAR(255),
  type TEXT NOT NULL CHECK (type IN ('article', 'video', 'tool', 'publication', 'case_study')),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT,
  thumbnail_url TEXT,
  category JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  author_id TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Library Bookmarks
CREATE TABLE IF NOT EXISTS library_bookmark (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL REFERENCES library_item(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, item_id)
);

-- Library Views
CREATE TABLE IF NOT EXISTS library_view (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT,
  item_id TEXT NOT NULL REFERENCES library_item(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP DEFAULT NOW(),
  duration INTEGER
);

-- Articles
CREATE TABLE IF NOT EXISTS article (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  sanity_id VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author_id TEXT NOT NULL,
  category VARCHAR(100),
  tags JSONB DEFAULT '[]',
  image_url TEXT,
  read_time INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CMS References
CREATE TABLE IF NOT EXISTS cms_reference (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  sanity_id VARCHAR(255) UNIQUE NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  local_id TEXT,
  last_synced TIMESTAMP DEFAULT NOW(),
  sync_status VARCHAR(20) DEFAULT 'synced',
  metadata JSONB
);

-- Course-Tutor relationships
CREATE TABLE IF NOT EXISTS course_tutor (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  course_id INTEGER NOT NULL REFERENCES course(id) ON DELETE CASCADE,
  tutor_id TEXT NOT NULL REFERENCES tutor(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'instructor',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(course_id, tutor_id)
);

-- User Profile Extensions
CREATE TABLE IF NOT EXISTS user_profile (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT UNIQUE NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  bio TEXT,
  interests JSONB DEFAULT '[]',
  preferred_language VARCHAR(5) DEFAULT 'en',
  timezone VARCHAR(50),
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  notifications JSONB DEFAULT '{"email": true, "events": true, "newsletter": true}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_start_date ON event(start_date);
CREATE INDEX IF NOT EXISTS idx_event_status ON event(status);
CREATE INDEX IF NOT EXISTS idx_library_item_type ON library_item(type);
CREATE INDEX IF NOT EXISTS idx_library_item_status ON library_item(status);
CREATE INDEX IF NOT EXISTS idx_article_status ON article(status);
CREATE INDEX IF NOT EXISTS idx_tutor_user_id ON tutor(user_id);