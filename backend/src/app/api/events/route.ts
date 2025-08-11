import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/index';
import { event, eventRegistration } from '@/db/schema-extended';
import { eq, gte, and, sql } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type'); // 'meetup', 'workshop', 'live_lesson', 'conference'
  const upcoming = searchParams.get('upcoming') === 'true';
  const userId = searchParams.get('userId');

  try {
    // Build query conditions
    const conditions = [];
    
    // Filter by status (only show published events)
    conditions.push(eq(event.status, 'published'));
    
    // Filter by type if specified
    if (type) {
      conditions.push(eq(event.type, type));
    }
    
    // Filter for upcoming events only
    if (upcoming) {
      conditions.push(gte(event.startDate, new Date().toISOString()));
    }

    // Get events with registration counts
    const events = await db
      .select({
        id: event.id,
        title: event.title,
        slug: event.slug,
        type: event.type,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        isOnline: event.isOnline,
        meetingUrl: event.meetingUrl,
        maxAttendees: event.maxAttendees,
        price: event.price,
        imageUrl: event.imageUrl,
        tags: event.tags,
        registrationCount: sql<number>`
          (SELECT COUNT(*) FROM event_registration 
           WHERE event_registration.event_id = ${event.id}
           AND event_registration.cancelled_at IS NULL)::integer
        `
      })
      .from(event)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(event.startDate);

    // If userId is provided, get user's registrations
    let userRegistrations: string[] = [];
    if (userId) {
      const session = await auth.api.getSession({
        headers: request.headers
      });
      
      if (session?.user?.id === userId) {
        const registrations = await db
          .select({ eventId: eventRegistration.eventId })
          .from(eventRegistration)
          .where(
            and(
              eq(eventRegistration.userId, userId),
              sql`${eventRegistration.cancelledAt} IS NULL`
            )
          );
        
        userRegistrations = registrations.map(r => r.eventId);
      }
    }

    // Format response
    const formattedEvents = events.map(e => ({
      ...e,
      spotsLeft: e.maxAttendees ? Math.max(0, e.maxAttendees - e.registrationCount) : null,
      isRegistered: userRegistrations.includes(e.id),
      attendees: e.registrationCount
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Check if event exists and has spots available
    const [targetEvent] = await db
      .select({
        id: event.id,
        maxAttendees: event.maxAttendees,
        registrationCount: sql<number>`
          (SELECT COUNT(*) FROM event_registration 
           WHERE event_registration.event_id = ${event.id}
           AND event_registration.cancelled_at IS NULL)::integer
        `
      })
      .from(event)
      .where(eq(event.id, eventId));

    if (!targetEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if spots are available
    if (targetEvent.maxAttendees && targetEvent.registrationCount >= targetEvent.maxAttendees) {
      return NextResponse.json(
        { error: 'Event is full' },
        { status: 400 }
      );
    }

    // Check if user is already registered
    const existingRegistration = await db
      .select()
      .from(eventRegistration)
      .where(
        and(
          eq(eventRegistration.eventId, eventId),
          eq(eventRegistration.userId, session.user.id)
        )
      );

    if (existingRegistration.length > 0) {
      // If cancelled, reactivate
      if (existingRegistration[0].cancelledAt) {
        await db
          .update(eventRegistration)
          .set({ cancelledAt: null })
          .where(eq(eventRegistration.id, existingRegistration[0].id));
        
        return NextResponse.json({ 
          message: 'Registration reactivated',
          registration: existingRegistration[0] 
        });
      }
      
      return NextResponse.json(
        { error: 'Already registered for this event' },
        { status: 400 }
      );
    }

    // Create new registration
    const [registration] = await db
      .insert(eventRegistration)
      .values({
        id: crypto.randomUUID(),
        eventId,
        userId: session.user.id,
        registeredAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json({
      message: 'Successfully registered',
      registration
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    );
  }
}

// Cancel registration
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Update registration to cancelled
    const [updated] = await db
      .update(eventRegistration)
      .set({ cancelledAt: new Date().toISOString() })
      .where(
        and(
          eq(eventRegistration.eventId, eventId),
          eq(eventRegistration.userId, session.user.id),
          sql`${eventRegistration.cancelledAt} IS NULL`
        )
      )
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Registration cancelled',
      registration: updated
    });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    return NextResponse.json(
      { error: 'Failed to cancel registration' },
      { status: 500 }
    );
  }
}