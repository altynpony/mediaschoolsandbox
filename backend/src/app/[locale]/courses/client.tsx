"use client";

import { Link } from "@/i18n/navigation";
import { CustomButton } from "@/components/ui/custom-button";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";

type Course = {
  id: number;
  slug: string;
  isLive: boolean;
  updated: string | null;
  published: string | null;
  title: string;
  description: string;
};

interface CoursesClientProps {
  courses: Course[];
  locale: string;
}

export function CoursesClient({ courses, locale }: CoursesClientProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'recorded'>('all');
  const { data: session } = authClient.useSession();
  const [userEnrollments, setUserEnrollments] = useState<{courseId: number, id: string}[]>([]);

  // Fetch user enrollments if authenticated
  useEffect(() => {
    if (session?.user) {
      fetch('/api/enroll', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.enrollments) {
          setUserEnrollments(data.enrollments);
        }
      })
      .catch(err => console.error('Failed to fetch enrollments:', err));
    }
  }, [session]);

  useEffect(() => {
    let filtered = courses;
    
    if (activeFilter === 'live') {
      filtered = courses.filter(course => course.isLive);
    } else if (activeFilter === 'recorded') {
      filtered = courses.filter(course => !course.isLive);
    }
    
    setFilteredCourses(filtered);
  }, [courses, activeFilter]);

  const isEnrolled = (courseId: number) => {
    return userEnrollments.some(enrollment => enrollment.courseId === courseId);
  };

  const handleEnroll = async (courseId: number) => {
    if (!session?.user) {
      // Redirect to sign in
      window.location.href = `/${locale}/signin`;
      return;
    }

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Refresh enrollments
        const enrollResponse = await fetch('/api/enroll', { credentials: 'include' });
        const enrollData = await enrollResponse.json();
        if (enrollData.enrollments) {
          setUserEnrollments(enrollData.enrollments);
        }
      } else if (response.status === 403) {
        // Need subscription
        window.location.href = `/${locale}/subscription`;
      } else {
        alert(data.error || 'Failed to enroll in course');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll in course');
    }
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Available</h3>
          <p className="text-gray-600 mb-6">
            We&apos;re working on adding new courses. Check back soon!
          </p>
          <CustomButton variant="primary" href={`/${locale}/subscription`}>
            Get Early Access
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-brand-purple text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveFilter('live')}
          className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
            activeFilter === 'live'
              ? 'bg-brand-green text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="w-2 h-2 bg-current rounded-full"></div>
          Live ({courses.filter(c => c.isLive).length})
        </button>
        <button
          onClick={() => setActiveFilter('recorded')}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeFilter === 'recorded'
              ? 'bg-gray-800 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Recorded ({courses.filter(c => !c.isLive).length})
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card-hover bg-white border border-gray-200 rounded-2xl overflow-hidden group">
            {/* Course Image/Icon */}
            <div className="relative h-48 bg-gradient-to-br from-brand-light-purple to-brand-light-green p-8 flex items-center justify-center">
              {course.isLive && (
                <div className="absolute top-4 left-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Live
                </div>
              )}
              {isEnrolled(course.id) && (
                <div className="absolute top-4 right-4 bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                  Enrolled
                </div>
              )}
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-purple transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {course.description}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <Link href={`/${locale}/courses/${course.slug}`} className="flex-1">
                  <CustomButton variant="outline" size="sm" className="w-full">
                    Learn More
                  </CustomButton>
                </Link>
                {isEnrolled(course.id) ? (
                  <Link href={`/${locale}/courses/${course.slug}`}>
                    <CustomButton variant="primary" size="sm">
                      Continue
                    </CustomButton>
                  </Link>
                ) : (
                  <CustomButton 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Match Your Filter</h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different filter to see more courses.
            </p>
            <CustomButton variant="outline" onClick={() => setActiveFilter('all')}>
              Show All Courses
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}