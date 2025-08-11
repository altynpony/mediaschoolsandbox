import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/index';
import { enrollment, subscription, course } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// POST /api/enroll - Enroll user in a course
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Check if user has active subscription
    const userSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, session.user.id))
      .limit(1);

    if (userSubscription.length === 0) {
      return NextResponse.json(
        { error: 'Active subscription required to enroll' },
        { status: 403 }
      );
    }

    const sub = userSubscription[0];
    const isActive = sub.status === 'active' && 
                    new Date(sub.endDate || '') > new Date();

    if (!isActive) {
      return NextResponse.json(
        { error: 'Active subscription required to enroll' },
        { status: 403 }
      );
    }

    // Check if course exists
    const courseExists = await db
      .select()
      .from(course)
      .where(eq(course.id, courseId))
      .limit(1);

    if (courseExists.length === 0) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await db
      .select()
      .from(enrollment)
      .where(
        and(
          eq(enrollment.userId, session.user.id),
          eq(enrollment.courseId, courseId)
        )
      )
      .limit(1);

    if (existingEnrollment.length > 0) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create enrollment
    const newEnrollment = await db
      .insert(enrollment)
      .values({
        id: nanoid(),
        userId: session.user.id,
        courseId,
        enrolledAt: new Date().toISOString(),
        progress: 0,
      })
      .returning();

    return NextResponse.json({ 
      success: true, 
      enrollment: newEnrollment[0],
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Error enrolling user:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}

// GET /api/enroll - Get user enrollments
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userEnrollments = await db
      .select({
        id: enrollment.id,
        courseId: enrollment.courseId,
        enrolledAt: enrollment.enrolledAt,
        completedAt: enrollment.completedAt,
        progress: enrollment.progress,
        courseSlug: course.slug,
        isLive: course.isLive,
      })
      .from(enrollment)
      .leftJoin(course, eq(enrollment.courseId, course.id))
      .where(eq(enrollment.userId, session.user.id))
      .orderBy(enrollment.enrolledAt);

    return NextResponse.json({ 
      enrollments: userEnrollments 
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}