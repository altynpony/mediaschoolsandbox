import { db } from '../index';
import { event } from '../db/schema-extended';

const sampleEvents = [
  {
    title: 'AI Tools Meetup Prague',
    slug: 'ai-tools-meetup-prague-dec',
    type: 'meetup',
    description: 'Join us for hands-on exploration of the latest AI tools for creative professionals. Network with fellow creators and learn practical applications.',
    startDate: new Date('2024-12-20T18:00:00'),
    endDate: new Date('2024-12-20T20:00:00'),
    location: 'Prague Media School Hub',
    isOnline: false,
    maxAttendees: 30,
    price: '0',
    tags: ['ai-tools', 'networking', 'prague'],
    status: 'published'
  },
  {
    title: 'Live: Advanced Prompt Engineering',
    slug: 'live-advanced-prompt-engineering',
    type: 'live_lesson',
    description: 'Master the art of prompt engineering with our expert instructors in this interactive session. Learn advanced techniques for GPT-4, Claude, and Midjourney.',
    startDate: new Date('2024-12-22T14:00:00'),
    endDate: new Date('2024-12-22T16:00:00'),
    location: 'Online',
    isOnline: true,
    meetingUrl: 'https://meet.mediaschool.ai/prompt-engineering',
    maxAttendees: 100,
    price: '29',
    tags: ['prompt-engineering', 'gpt-4', 'claude', 'live'],
    status: 'published'
  },
  {
    title: 'AI Video Production Workshop',
    slug: 'ai-video-production-workshop-dec',
    type: 'workshop',
    description: 'Full-day workshop on creating professional videos with AI-powered tools. Cover scripting, editing, voice synthesis, and automated subtitles.',
    startDate: new Date('2024-12-28T10:00:00'),
    endDate: new Date('2024-12-28T17:00:00'),
    location: 'Prague Media School Studio',
    isOnline: false,
    maxAttendees: 15,
    price: '149',
    tags: ['video-production', 'ai-editing', 'workshop'],
    status: 'published'
  },
  {
    title: 'Ethics in AI Journalism Panel',
    slug: 'ethics-ai-journalism-panel',
    type: 'conference',
    description: 'Panel discussion with leading journalists on ethical AI use in modern journalism. Topics include fact-checking, bias, and maintaining authenticity.',
    startDate: new Date('2025-01-05T17:00:00'),
    endDate: new Date('2025-01-05T19:00:00'),
    location: 'Online',
    isOnline: true,
    meetingUrl: 'https://meet.mediaschool.ai/ethics-panel',
    maxAttendees: 500,
    price: '0',
    tags: ['journalism', 'ethics', 'panel', 'free'],
    status: 'published'
  },
  {
    title: 'Creative AI Tools Showcase',
    slug: 'creative-ai-tools-showcase',
    type: 'workshop',
    description: 'Discover and test the latest AI tools for design, writing, and multimedia creation. Hands-on demos with Midjourney, Runway, ElevenLabs and more.',
    startDate: new Date('2025-01-10T13:00:00'),
    endDate: new Date('2025-01-10T17:00:00'),
    location: 'Prague Media School Hub',
    isOnline: false,
    maxAttendees: 25,
    price: '89',
    tags: ['ai-tools', 'midjourney', 'runway', 'design'],
    status: 'published'
  },
  {
    title: 'AI Music Production Masterclass',
    slug: 'ai-music-production-masterclass',
    type: 'workshop',
    description: 'Learn to create professional music using AI tools. Cover composition, mixing, mastering, and vocal synthesis.',
    startDate: new Date('2025-01-15T14:00:00'),
    endDate: new Date('2025-01-15T18:00:00'),
    location: 'Online',
    isOnline: true,
    meetingUrl: 'https://meet.mediaschool.ai/music-masterclass',
    maxAttendees: 50,
    price: '79',
    tags: ['music', 'ai-audio', 'production'],
    status: 'published'
  },
  {
    title: 'Building AI-Powered Apps Without Code',
    slug: 'no-code-ai-apps',
    type: 'workshop',
    description: 'Create your own AI-powered applications without writing code. Use tools like Bubble, Zapier, and OpenAI API.',
    startDate: new Date('2025-01-20T10:00:00'),
    endDate: new Date('2025-01-20T13:00:00'),
    location: 'Prague Media School Hub',
    isOnline: false,
    maxAttendees: 20,
    price: '99',
    tags: ['no-code', 'app-development', 'openai'],
    status: 'published'
  },
  {
    title: 'AI for Social Media Content',
    slug: 'ai-social-media-content',
    type: 'live_lesson',
    description: 'Streamline your social media content creation with AI. Learn to generate posts, images, and videos that engage.',
    startDate: new Date('2025-01-25T15:00:00'),
    endDate: new Date('2025-01-25T17:00:00'),
    location: 'Online',
    isOnline: true,
    meetingUrl: 'https://meet.mediaschool.ai/social-media',
    maxAttendees: 75,
    price: '39',
    tags: ['social-media', 'content-creation', 'marketing'],
    status: 'published'
  }
];

async function seedEvents() {
  console.log('🎯 Starting to seed events...');
  
  try {
    for (const eventData of sampleEvents) {
      const [insertedEvent] = await db.insert(event).values({
        title: eventData.title,
        slug: eventData.slug,
        type: eventData.type,
        description: eventData.description,
        startDate: eventData.startDate.toISOString(),
        endDate: eventData.endDate ? eventData.endDate.toISOString() : null,
        location: eventData.location,
        isOnline: eventData.isOnline,
        meetingUrl: eventData.meetingUrl || null,
        maxAttendees: eventData.maxAttendees,
        price: eventData.price,
        tags: eventData.tags,
        status: eventData.status,
        imageUrl: null,
        tutorId: null
      }).returning({ id: event.id });

      console.log(`✅ Created event: ${eventData.title} (ID: ${insertedEvent.id})`);
    }

    console.log('🎉 Successfully seeded all events!');
    console.log(`📊 Total events created: ${sampleEvents.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding events:', error);
    throw error;
  }
}

// Run the seed function
seedEvents()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));