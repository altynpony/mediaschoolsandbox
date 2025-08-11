import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/index';
import { subscription } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

// POST /api/subscribe - Create or update subscription
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

    const { planType, stripeSubscriptionId } = await request.json();

    if (!planType || !['basic', 'pro', 'enterprise'].includes(planType)) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      );
    }

    // Check if user already has a subscription
    const existingSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, session.user.id))
      .limit(1);

    const now = new Date().toISOString();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    if (existingSubscription.length > 0) {
      // Update existing subscription
      const updated = await db
        .update(subscription)
        .set({
          planType,
          status: 'active',
          endDate: endDate.toISOString(),
          stripeSubscriptionId: stripeSubscriptionId || existingSubscription[0].stripeSubscriptionId,
          updatedAt: now,
        })
        .where(eq(subscription.userId, session.user.id))
        .returning();

      return NextResponse.json({ 
        success: true, 
        subscription: updated[0],
        message: 'Subscription updated successfully'
      });
    } else {
      // Create new subscription
      const newSubscription = await db
        .insert(subscription)
        .values({
          id: nanoid(),
          userId: session.user.id,
          planType,
          status: 'active',
          startDate: now,
          endDate: endDate.toISOString(),
          stripeSubscriptionId,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return NextResponse.json({ 
        success: true, 
        subscription: newSubscription[0],
        message: 'Subscription created successfully'
      });
    }
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

// GET /api/subscribe - Get user subscription status
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

    const userSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, session.user.id))
      .limit(1);

    if (userSubscription.length === 0) {
      return NextResponse.json({ 
        hasSubscription: false,
        subscription: null 
      });
    }

    const sub = userSubscription[0];
    const isActive = sub.status === 'active' && 
                    new Date(sub.endDate || '') > new Date();

    return NextResponse.json({ 
      hasSubscription: true,
      isActive,
      subscription: sub
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}