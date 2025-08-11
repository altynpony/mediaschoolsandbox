import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/index';
import { course, courseDescription, lesson, lessonDescription } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// GET /api/courses/[slug] - Get course by slug with lessons
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';

    // Get course details
    const courseData = await db
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
          eq(course.slug, slug),
          eq(courseDescription.lang, lang)
        )
      )
      .limit(1);

    if (courseData.length === 0) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    const courseInfo = courseData[0];

    // Get lessons for this course
    const lessons = await db
      .select({
        id: lesson.id,
        slug: lesson.slug,
        weight: lesson.weight,
        title: lessonDescription.title,
        description: lessonDescription.description,
      })
      .from(lesson)
      .leftJoin(lessonDescription, eq(lesson.id, lessonDescription.lessonId))
      .where(
        and(
          eq(lesson.courseId, courseInfo.id),
          eq(lessonDescription.lang, lang)
        )
      )
      .orderBy(lesson.weight);

    return NextResponse.json({
      course: {
        ...courseInfo,
        lessons
      }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}