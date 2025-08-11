import { db } from '../index';
import { course, courseDescription, lesson, lessonDescription } from '../db/schema';

const sampleCourses = [
  {
    slug: 'ai-content-creation',
    isLive: false,
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
    descriptions: [
      {
        lang: 'en',
        title: 'AI Content Creation Fundamentals',
        description: 'Master the art of creating compelling content using cutting-edge AI tools. Learn to write, design, and produce multimedia content that engages your audience while maintaining authenticity and creativity.'
      },
      {
        lang: 'ru', 
        title: 'Основы создания контента с ИИ',
        description: 'Освойте искусство создания привлекательного контента с помощью передовых инструментов ИИ. Научитесь писать, проектировать и создавать мультимедийный контент, который увлекает вашу аудиторию, сохраняя при этом аутентичность и креативность.'
      }
    ],
    lessons: [
      {
        slug: 'introduction-to-ai-tools',
        weight: 100,
        descriptions: [
          { lang: 'en', title: 'Introduction to AI Tools', description: 'Overview of popular AI content creation tools' },
          { lang: 'ru', title: 'Знакомство с инструментами ИИ', description: 'Обзор популярных инструментов для создания контента с ИИ' }
        ]
      },
      {
        slug: 'writing-with-ai',
        weight: 200,
        descriptions: [
          { lang: 'en', title: 'Writing with AI Assistance', description: 'Best practices for AI-assisted writing' },
          { lang: 'ru', title: 'Писательство с помощью ИИ', description: 'Лучшие практики для письма с помощью ИИ' }
        ]
      }
    ]
  },
  {
    slug: 'ai-video-production',
    isLive: true,
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
    descriptions: [
      {
        lang: 'en',
        title: 'AI Video Production Workshop',
        description: 'Create professional videos using AI-powered editing tools, automated subtitles, and intelligent scene composition. Perfect for content creators, marketers, and educators.'
      },
      {
        lang: 'ru',
        title: 'Видео с ИИ: воркшоп', 
        description: 'Создавайте профессиональные видео с помощью инструментов редактирования на основе ИИ, автоматических субтитров и интеллектуальной композиции сцен. Идеально для создателей контента, маркетологов и преподавателей.'
      }
    ],
    lessons: [
      {
        slug: 'ai-video-editing-basics',
        weight: 100,
        descriptions: [
          { lang: 'en', title: 'AI Video Editing Basics', description: 'Learn the fundamentals of AI-powered video editing' },
          { lang: 'ru', title: 'Основы редактирования видео с ИИ', description: 'Изучите основы редактирования видео на основе ИИ' }
        ]
      }
    ]
  },
  {
    slug: 'ai-journalism-ethics',
    isLive: false,
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
    descriptions: [
      {
        lang: 'en',
        title: 'AI in Journalism',
        description: 'Navigate the ethical considerations of using AI in journalism. Learn how to maintain integrity while leveraging AI for research, fact-checking, and story development.'
      },
      {
        lang: 'ru',
        title: 'ИИ в журналистике',
        description: 'Разберитесь с этическими соображениями использования ИИ в журналистике. Научитесь сохранять честность, используя ИИ для исследований, проверки фактов и развития сюжета.'
      }
    ],
    lessons: [
      {
        slug: 'ethical-ai-guidelines',
        weight: 100,
        descriptions: [
          { lang: 'en', title: 'Ethical AI Guidelines', description: 'Understanding ethical boundaries in AI journalism' },
          { lang: 'ru', title: 'Этические принципы ИИ', description: 'Понимание этических границ в журналистике с ИИ' }
        ]
      },
      {
        slug: 'ai-fact-checking',
        weight: 200,
        descriptions: [
          { lang: 'en', title: 'AI-Powered Fact Checking', description: 'Using AI tools for verification and fact-checking' },
          { lang: 'ru', title: 'Проверка фактов с помощью ИИ', description: 'Использование инструментов ИИ для верификации и проверки фактов' }
        ]
      }
    ]
  }
];

async function seedCourses() {
  console.log('🌱 Starting to seed courses...');
  
  try {
    for (const courseData of sampleCourses) {
      // Insert course
      const [insertedCourse] = await db.insert(course).values({
        slug: courseData.slug,
        isLive: courseData.isLive,
        published: courseData.published,
        updated: courseData.updated,
        lang: 'en' // Default language
      }).returning({ id: course.id });

      console.log(`✅ Created course: ${courseData.slug} (ID: ${insertedCourse.id})`);

      // Insert course descriptions
      for (const desc of courseData.descriptions) {
        await db.insert(courseDescription).values({
          courseId: insertedCourse.id,
          lang: desc.lang,
          title: desc.title,
          description: desc.description
        });
      }

      console.log(`📝 Added ${courseData.descriptions.length} descriptions for ${courseData.slug}`);

      // Insert lessons
      for (const lessonData of courseData.lessons) {
        const [insertedLesson] = await db.insert(lesson).values({
          slug: lessonData.slug,
          courseId: insertedCourse.id,
          weight: lessonData.weight
        }).returning({ id: lesson.id });

        // Insert lesson descriptions
        for (const desc of lessonData.descriptions) {
          await db.insert(lessonDescription).values({
            lessonId: insertedLesson.id,
            lang: desc.lang,
            title: desc.title,
            description: desc.description
          });
        }

        console.log(`📚 Added lesson: ${lessonData.slug} to course ${courseData.slug}`);
      }
    }

    console.log('🎉 Successfully seeded all courses!');
    console.log(`📊 Total courses created: ${sampleCourses.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    throw error;
  }
}

// Run the seed function
seedCourses()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));