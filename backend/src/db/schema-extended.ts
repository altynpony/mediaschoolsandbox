import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, decimal } from 'drizzle-orm/pg-core';

// Tutors table
export const tutor = pgTable("tutor", {
  id: text().primaryKey().notNull(),
  userId: text("user_id").notNull(),
  bio: text(),
  expertise: jsonb("expertise").default([]),
  languages: jsonb("languages").default(['en']),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  availability: jsonb("availability"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  totalStudents: integer("total_students").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow()
});

// Events table
export const event = pgTable("event", {
  id: text().primaryKey().notNull(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique().notNull(),
  type: text("type").notNull(), // 'meetup', 'workshop', 'live_lesson', 'conference'
  description: text().notNull().default(''),
  tutorId: text("tutor_id"),
  startDate: timestamp("start_date", { mode: 'string' }).notNull(),
  endDate: timestamp("end_date", { mode: 'string' }),
  location: varchar({ length: 255 }).notNull().default('Online'),
  isOnline: boolean("is_online").notNull().default(false),
  meetingUrl: text("meeting_url"),
  maxAttendees: integer("max_attendees"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default('0'),
  imageUrl: text("image_url"),
  tags: jsonb("tags").default([]),
  status: text("status").default('draft'), // 'draft', 'published', 'archived'
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow()
});

// Event Registrations
export const eventRegistration = pgTable("event_registration", {
  id: text().primaryKey().notNull(),
  eventId: text("event_id").notNull(),
  userId: text("user_id").notNull(),
  registeredAt: timestamp("registered_at", { mode: 'string' }).defaultNow(),
  attended: boolean("attended").default(false),
  cancelledAt: timestamp("cancelled_at", { mode: 'string' }),
  notes: text()
});

// Library Items (hybrid with CMS)
export const libraryItem = pgTable("library_item", {
  id: text().primaryKey().notNull(),
  sanityId: varchar("sanity_id", { length: 255 }),
  type: text("type").notNull(), // 'article', 'video', 'tool', 'publication', 'case_study'
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).unique().notNull(),
  summary: text(),
  thumbnailUrl: text("thumbnail_url"),
  category: jsonb("category").default([]),
  tags: jsonb("tags").default([]),
  authorId: text("author_id"),
  isFeatured: boolean("is_featured").default(false),
  isPremium: boolean("is_premium").default(false),
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  status: text("status").default('published'), // 'draft', 'published', 'archived'
  publishedAt: timestamp("published_at", { mode: 'string' }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow()
});

// User interactions with library items
export const libraryBookmark = pgTable("library_bookmark", {
  id: text().primaryKey().notNull(),
  userId: text("user_id").notNull(),
  itemId: text("item_id").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const libraryView = pgTable("library_view", {
  id: text().primaryKey().notNull(),
  userId: text("user_id"),
  itemId: text("item_id").notNull(),
  viewedAt: timestamp("viewed_at", { mode: 'string' }).defaultNow(),
  duration: integer("duration")
});

// Articles (can be stored in CMS or database)
export const article = pgTable("article", {
  id: text().primaryKey().notNull(),
  sanityId: varchar("sanity_id", { length: 255 }),
  slug: varchar({ length: 255 }).unique().notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text(),
  authorId: text("author_id").notNull(),
  category: varchar({ length: 100 }),
  tags: jsonb("tags").default([]),
  imageUrl: text("image_url"),
  readTime: integer("read_time"),
  status: text("status").default('draft'), // 'draft', 'published', 'archived'
  publishedAt: timestamp("published_at", { mode: 'string' }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow()
});

// CMS Content References (for syncing)
export const cmsReference = pgTable("cms_reference", {
  id: text().primaryKey().notNull(),
  sanityId: varchar("sanity_id", { length: 255 }).unique().notNull(),
  contentType: varchar("content_type", { length: 50 }).notNull(),
  localId: text("local_id"),
  lastSynced: timestamp("last_synced", { mode: 'string' }).defaultNow(),
  syncStatus: varchar("sync_status", { length: 20 }).default('synced'),
  metadata: jsonb("metadata")
});

// Course-Tutor relationships
export const courseTutor = pgTable("course_tutor", {
  id: text().primaryKey().notNull(),
  courseId: integer("course_id").notNull(),
  tutorId: text("tutor_id").notNull(),
  role: varchar({ length: 50 }).default('instructor'),
  createdAt: timestamp("created_at").defaultNow()
});

// User Profile Extensions
export const userProfile = pgTable("user_profile", {
  id: text().primaryKey().notNull(),
  userId: text("user_id").unique().notNull(),
  bio: text(),
  interests: jsonb("interests").default([]),
  preferredLanguage: varchar("preferred_language", { length: 5 }).default('en'),
  timezone: varchar({ length: 50 }),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  websiteUrl: text("website_url"),
  notifications: jsonb("notifications").default({
    email: true,
    events: true,
    newsletter: true
  }),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow()
});