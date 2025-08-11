import { NextResponse } from 'next/server';
import { db } from '@/index';
import { subscription } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // Get the session from Better Auth
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Query subscription from database
    const userSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, session.user.id))
      .limit(1);

    if (userSubscription.length === 0) {
      return NextResponse.json({ subscription: null });
    }

    return NextResponse.json({ subscription: userSubscription[0] });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}