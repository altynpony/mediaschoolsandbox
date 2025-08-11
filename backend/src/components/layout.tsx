'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { User } from './user';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/assets/images/PSM-Logo.png" 
                alt="MediaSchool.ai" 
                width={48} 
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-black transition-colors font-medium">
              Courses
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-black transition-colors">
              Events
            </Link>
            <Link href="/library" className="text-gray-700 hover:text-black transition-colors">
              Library
            </Link>
            {/* Chat with AI-Tutor Button */}
            <Link 
              href="/chat" 
              className="bg-gradient-to-r from-brand-purple to-brand-green text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
            >
              Chat with AI-Tutor
            </Link>
          </div>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/en" className="text-gray-600 hover:text-black transition-colors">EN</Link>
              <span className="text-gray-300">|</span>
              <Link href="/ru" className="text-gray-600 hover:text-black transition-colors">RU</Link>
            </div>
            
            <User />
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-4 space-y-4">
              <Link href="/courses" className="block text-gray-700 hover:text-black transition-colors">
                Courses
              </Link>
              <Link href="/events" className="block text-gray-700 hover:text-black transition-colors">
                Events
              </Link>
              <Link href="/library" className="block text-gray-700 hover:text-black transition-colors">
                Library
              </Link>
              <Link 
                href="/chat" 
                className="block bg-gradient-to-r from-brand-purple to-brand-green text-white px-4 py-2 rounded-full text-center font-medium"
              >
                Chat with AI-Tutor
              </Link>
              {/* Mobile Language Switcher */}
              <div className="flex justify-center items-center space-x-4 pt-2">
                <Link href="/en" className="text-gray-600 hover:text-black transition-colors">English</Link>
                <Link href="/ru" className="text-gray-600 hover:text-black transition-colors">Русский</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Image 
                  src="/assets/images/PSM-Logo.png" 
                  alt="MediaSchool.ai" 
                  width={40} 
                  height={40}
                  className="h-10 w-auto mr-3"
                />
                <span className="text-xl font-bold">MediaSchool.ai</span>
              </div>
              <p className="text-gray-400 mb-4">
                Human-centered AI learning for professionals, creators and curious minds.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/library" className="hover:text-white transition-colors">Library</Link></li>
                <li><Link href="/subscription" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/chat" className="hover:text-white transition-colors">AI Assistant</Link></li>
                <li><Link href="/profile" className="hover:text-white transition-colors">My Account</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediaSchool.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}