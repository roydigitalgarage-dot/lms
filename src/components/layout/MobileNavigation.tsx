import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, Calendar, User, Bot } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function MobileNavigation() {
  const { user } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { icon: Home, label: 'Home', path: '/', emoji: '🏠' },
      { icon: BookOpen, label: 'Courses', path: '/courses', emoji: '📚' },
      { icon: Bot, label: 'AI Tutor', path: '/ai-tutor', emoji: '🤖' },
      { icon: Calendar, label: 'Calendar', path: '/calendar', emoji: '📅' },
    ];

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { icon: User, label: 'Profile', path: '/settings', emoji: '👤' }
      ];
    }

    if (user?.role === 'teacher') {
      return [
        { icon: Home, label: 'Dashboard', path: '/', emoji: '🏠' },
        { icon: BookOpen, label: 'Students', path: '/students', emoji: '👥' },
        { icon: MessageCircle, label: 'Messages', path: '/messages', emoji: '💬' },
        { icon: Calendar, label: 'Calendar', path: '/calendar', emoji: '📅' },
        { icon: User, label: 'Profile', path: '/settings', emoji: '👤' }
      ];
    }

    if (user?.role === 'parent') {
      return [
        { icon: Home, label: 'Dashboard', path: '/', emoji: '🏠' },
        { icon: BookOpen, label: 'Children', path: '/children', emoji: '👶' },
        { icon: MessageCircle, label: 'Messages', path: '/messages', emoji: '💬' },
        { icon: Calendar, label: 'Calendar', path: '/school-calendar', emoji: '📅' },
        { icon: User, label: 'Profile', path: '/settings', emoji: '👤' }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-4 border-purple-200 dark:border-purple-600 shadow-2xl z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 transform ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 scale-110'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 text-sm">{item.emoji}</span>
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}