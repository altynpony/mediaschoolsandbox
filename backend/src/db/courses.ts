"use server";

import { eq, gt, isNull, or, sql } from "drizzle-orm";
import { db } from "..";
import { course, courseDescription, lessonDescription, lessonLive } from "./schema";

export async function courseLessons(courseSlug: string, locale: string) {
  return db.query.course.findFirst({
    where: eq(course.slug, courseSlug),
    with: {
      lessons: {
        with: {
          lessonDescriptions: {
            where: eq(lessonDescription.lang, locale),
            limit: 1
          }
        }
      }
    }
  })
}

export async function coursesSlugs() {
  return db.query.course.findMany({
    where: or(isNull(course.archived), gt(course.archived, sql`now()`)),
    columns: {
      slug: true
    }
  })
}

export async function coursesListLocale(locale: string) {
  return db.query.course.findMany({
    where: or(isNull(course.archived), gt(course.archived, sql`now()`)),
    columns: {
      slug: true,
      isLive: true,
      updated: true,
    },
    with: {
      courseDescriptions: {
        where: eq(courseDescription.lang, locale),
        columns: {
          title: true,
          description: true
        },
        limit: 1
      },
      lessons: {
        columns: {
          slug: true,
          weight: true,
        },
        with: {
          lessonDescriptions: {
            where: eq(lessonDescription.lang, locale),
            columns: {
              title: true,
            },
            limit: 1
          },
          lessonLives: {
            where: gt(lessonLive.timestamp, sql`now()`),
            columns: {
              timestamp: true
            }
          }
        }
      }
    }
  })
}
