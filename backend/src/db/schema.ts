import { pgTable, text, timestamp, unique, boolean, varchar, integer, foreignKey } from "drizzle-orm/pg-core"




export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	isAnonymous: boolean("is_anonymous"),
	role: varchar({ length: 16 }).default('user').notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),
]);

export const course = pgTable("course", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "course_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	slug: varchar({ length: 32 }).notNull(),
	lang: varchar({ length: 3 }).default('ru').notNull(),
	published: timestamp({ withTimezone: true, mode: 'string' }),
	archived: timestamp({ withTimezone: true, mode: 'string' }),
	isLive: boolean("is-live").default(false).notNull(),
	updated: timestamp({ withTimezone: true, mode: 'string' }),
}, (table) => [
	unique("course_slug_key").on(table.slug),
]);

export const lesson = pgTable("lesson", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "lesson_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	slug: varchar({ length: 32 }).notNull(),
	courseId: integer("course_id"),
	weight: integer().default(500).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [course.id],
			name: "course_foreign"
		}),
]);

export const lessonLive = pgTable("lesson_live", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "lesson_live_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	lessonId: integer("lesson_id").notNull(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	liveId: text("live_id"),
	lastVideo: text("last_video"),
}, (table) => [
	foreignKey({
			columns: [table.lessonId],
			foreignColumns: [lesson.id],
			name: "lesson_foreign"
		}),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const courseDescription = pgTable("course_description", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "course_description_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	courseId: integer("course_id").notNull(),
	lang: varchar({ length: 7 }).notNull(),
	title: varchar({ length: 32 }).notNull(),
	description: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [course.id],
			name: "course_foreign"
		}),
	unique("course_description_title_key").on(table.title),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const lessonDescription = pgTable("lesson_description", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "lesson_description_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	lessonId: integer("lesson_id").notNull(),
	lang: varchar({ length: 7 }).notNull(),
	title: varchar({ length: 32 }).notNull(),
	description: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.lessonId],
			foreignColumns: [lesson.id],
			name: "lesson_foreign"
		}),
]);

export const subscription = pgTable("subscription", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	planType: varchar("plan_type", { length: 32 }).notNull(), // 'basic', 'pro', 'enterprise'
	status: varchar({ length: 32 }).default('active').notNull(), // 'active', 'cancelled', 'expired'
	startDate: timestamp("start_date", { withTimezone: true, mode: 'string' }).notNull(),
	endDate: timestamp("end_date", { withTimezone: true, mode: 'string' }),
	stripeSubscriptionId: text("stripe_subscription_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "subscription_user_id_fk"
	}).onDelete("cascade"),
]);

export const enrollment = pgTable("enrollment", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	courseId: integer("course_id").notNull(),
	enrolledAt: timestamp("enrolled_at", { withTimezone: true, mode: 'string' }).notNull(),
	completedAt: timestamp("completed_at", { withTimezone: true, mode: 'string' }),
	progress: integer().default(0).notNull(), // Percentage 0-100
}, (table) => [
	foreignKey({
		columns: [table.userId],
		foreignColumns: [user.id],
		name: "enrollment_user_id_fk"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.courseId],
		foreignColumns: [course.id],
		name: "enrollment_course_id_fk"
	}).onDelete("cascade"),
	unique("enrollment_user_course_unique").on(table.userId, table.courseId),
]);
