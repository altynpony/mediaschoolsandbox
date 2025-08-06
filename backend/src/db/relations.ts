import { relations } from "drizzle-orm/relations";
import { course, lesson, lessonLive, user, session, courseDescription, account, lessonDescription } from "./schema";

export const lessonRelations = relations(lesson, ({one, many}) => ({
	course: one(course, {
		fields: [lesson.courseId],
		references: [course.id]
	}),
	lessonLives: many(lessonLive),
	lessonDescriptions: many(lessonDescription),
}));

export const courseRelations = relations(course, ({many}) => ({
	lessons: many(lesson),
	courseDescriptions: many(courseDescription),
}));

export const lessonLiveRelations = relations(lessonLive, ({one}) => ({
	lesson: one(lesson, {
		fields: [lessonLive.lessonId],
		references: [lesson.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	accounts: many(account),
}));

export const courseDescriptionRelations = relations(courseDescription, ({one}) => ({
	course: one(course, {
		fields: [courseDescription.courseId],
		references: [course.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const lessonDescriptionRelations = relations(lessonDescription, ({one}) => ({
	lesson: one(lesson, {
		fields: [lessonDescription.lessonId],
		references: [lesson.id]
	}),
}));