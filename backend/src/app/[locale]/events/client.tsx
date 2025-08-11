"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";

type Event = {
  id: string;
  title: string;
  slug: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string | null;
  location: string;
  isOnline: boolean;
  meetingUrl: string | null;
  maxAttendees: number | null;
  price: string;
  imageUrl: string | null;
  tags: string[];
  spotsLeft: number | null;
  isRegistered: boolean;
  attendees: number;
};

interface EventsClientProps {
  initialEvents: Event[];
  locale: string;
}

export function EventsClient({ initialEvents, locale }: EventsClientProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(initialEvents);
  const [activeFilter, setActiveFilter] = useState<'all' | 'meetup' | 'workshop' | 'live_lesson'>('all');
  const [loading, setLoading] = useState<string | null>(null);
  const { data: session } = authClient.useSession();

  const t = {
    ru: {
      register: 'Записаться',
      cancel: 'Отменить',
      online: 'Онлайн',
      spots: 'мест',
      attendees: 'участников',
      full: 'Мест нет',
      registered: 'Вы записаны',
      free: 'Бесплатно',
      filters: {
        all: 'Все события',
        meetup: 'Встречи',
        workshop: 'Воркшопы',
        live_lesson: 'Живые уроки'
      }
    },
    en: {
      register: 'Register',
      cancel: 'Cancel',
      online: 'Online',
      spots: 'spots left',
      attendees: 'attendees',
      full: 'Full',
      registered: 'Registered',
      free: 'Free',
      filters: {
        all: 'All Events',
        meetup: 'Meetups',
        workshop: 'Workshops',
        live_lesson: 'Live Lessons'
      }
    }
  };

  const content = t[locale as 'ru' | 'en'];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(e => e.type === activeFilter));
    }
  }, [events, activeFilter]);

  // Refresh events with user registration status
  useEffect(() => {
    if (session?.user) {
      fetch(`/api/events?upcoming=true&userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          setEvents(data);
        })
        .catch(err => console.error('Failed to refresh events:', err));
    }
  }, [session]);

  const handleRegister = async (eventId: string) => {
    if (!session?.user) {
      window.location.href = `/${locale}/signin`;
      return;
    }

    setLoading(eventId);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh events list
        const refreshResponse = await fetch(`/api/events?upcoming=true&userId=${session.user.id}`);
        const refreshedEvents = await refreshResponse.json();
        setEvents(refreshedEvents);
      } else {
        alert(data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register for event');
    } finally {
      setLoading(null);
    }
  };

  const handleCancel = async (eventId: string) => {
    if (!session?.user) return;

    setLoading(eventId);

    try {
      const response = await fetch(`/api/events?eventId=${eventId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Refresh events list
        const refreshResponse = await fetch(`/api/events?upcoming=true&userId=${session.user.id}`);
        const refreshedEvents = await refreshResponse.json();
        setEvents(refreshedEvents);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to cancel registration');
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      alert('Failed to cancel registration');
    } finally {
      setLoading(null);
    }
  };

  const getEventTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'meetup':
        return 'bg-brand-light-purple text-brand-purple';
      case 'workshop':
        return 'bg-brand-light-green text-brand-green';
      case 'live_lesson':
        return 'bg-blue-100 text-blue-700';
      case 'conference':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatEventType = (type: string) => {
    switch (type) {
      case 'meetup': return 'MEETUP';
      case 'workshop': return 'WORKSHOP';
      case 'live_lesson': return 'LIVE LESSON';
      case 'conference': return 'CONFERENCE';
      default: return type.toUpperCase();
    }
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-brand-purple text-white'
              : 'border border-gray-300 text-gray-700 hover:border-brand-purple'
          }`}
        >
          {content.filters.all}
        </button>
        <button
          onClick={() => setActiveFilter('meetup')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'meetup'
              ? 'bg-brand-purple text-white'
              : 'border border-gray-300 text-gray-700 hover:border-brand-purple'
          }`}
        >
          {content.filters.meetup}
        </button>
        <button
          onClick={() => setActiveFilter('live_lesson')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'live_lesson'
              ? 'bg-brand-purple text-white'
              : 'border border-gray-300 text-gray-700 hover:border-brand-purple'
          }`}
        >
          {content.filters.live_lesson}
        </button>
        <button
          onClick={() => setActiveFilter('workshop')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'workshop'
              ? 'bg-brand-purple text-white'
              : 'border border-gray-300 text-gray-700 hover:border-brand-purple'
          }`}
        >
          {content.filters.workshop}
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all">
            {/* Event Type Badge & Online indicator */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeBadgeStyle(event.type)}`}>
                {formatEventType(event.type)}
              </span>
              {event.isOnline && (
                <span className="text-xs text-gray-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {content.online}
                </span>
              )}
            </div>

            {/* Event Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {event.title}
            </h3>

            {/* Event Details */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(event.startDate).toLocaleDateString(locale, { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(event.startDate).toLocaleTimeString(locale, { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            {/* Price & Registration */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {event.price === '0' ? (
                  <span className="text-brand-green font-medium">{content.free}</span>
                ) : (
                  <span className="text-gray-900 font-semibold">${event.price}</span>
                )}
                {event.maxAttendees && (
                  <span className="text-gray-500 ml-2">
                    {event.spotsLeft && event.spotsLeft > 0 ? (
                      <span className="text-brand-green">
                        {event.spotsLeft} {content.spots}
                      </span>
                    ) : (
                      <span className="text-gray-400">{content.full}</span>
                    )}
                  </span>
                )}
              </div>
              
              {event.isRegistered ? (
                <div className="flex gap-2">
                  <span className="text-sm text-brand-green font-medium px-3 py-1">
                    ✓ {content.registered}
                  </span>
                  <CustomButton
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancel(event.id)}
                    disabled={loading === event.id}
                  >
                    {content.cancel}
                  </CustomButton>
                </div>
              ) : (
                <CustomButton
                  variant={event.spotsLeft === 0 ? "outline" : "primary"}
                  size="sm"
                  onClick={() => handleRegister(event.id)}
                  disabled={loading === event.id || event.spotsLeft === 0}
                >
                  {loading === event.id ? '...' : content.register}
                </CustomButton>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-6">
              Check back soon for new events or try a different filter.
            </p>
            <CustomButton variant="outline" onClick={() => setActiveFilter('all')}>
              Show All Events
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}