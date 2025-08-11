import { Layout } from "@/components/layout";
import { routing } from "@/i18n/routing";
import { EventsClient } from "./client";
import { db } from "@/index";
import { event } from "@/db/schema-extended";
import { eq, sql } from "drizzle-orm";

export const revalidate = 3600; // 1 hour
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getEvents() {
  try {
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
      .where(
        eq(event.status, 'published')
      )
      .orderBy(event.startDate);

    return events.map(e => ({
      ...e,
      tags: Array.isArray(e.tags) ? e.tags : [],
      spotsLeft: e.maxAttendees ? Math.max(0, e.maxAttendees - (e.registrationCount || 0)) : null,
      isRegistered: false,
      attendees: e.registrationCount || 0
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function EventsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const events = await getEvents();

  const content = {
    ru: {
      title: 'События',
      subtitle: 'Присоединяйтесь к живым урокам, воркшопам и встречам от Prague Media School.'
    },
    en: {
      title: 'Events',
      subtitle: 'Join live lessons, workshops, and meetups from Prague Media School.'
    }
  };

  const t = content[locale as 'ru'|'en'];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <section className="pt-24 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl">
              {t.subtitle}
            </p>

            <EventsClient initialEvents={events} locale={locale} />
          </div>
        </section>
      </div>
    </Layout>
  );
}