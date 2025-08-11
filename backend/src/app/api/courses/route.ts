import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/index';
import { course, courseDescription } from '@/db/schema';
import { eq, and, isNull, or, gt } from 'drizzle-orm';

// GET /api/courses - Get all published courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    
    // Get published courses (not archived)
    const courses = await db
      .select({
        id: course.id,
        slug: course.slug,
        lang: course.lang,
        published: course.published,
        isLive: course.isLive,
        updated: course.updated,
        title: courseDescription.title,
        description: courseDescription.description,
      })
      .from(course)
      .leftJoin(courseDescription, eq(course.id, courseDescription.courseId))
      .where(
        and(
          or(isNull(course.archived), gt(course.archived, new Date().toISOString())),
          eq(courseDescription.lang, lang)
        )
      )
      .orderBy(course.published);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}