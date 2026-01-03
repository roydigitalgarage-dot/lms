import React from 'react';
import { Bell, Search, Moon, Sun, Star, Heart, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import NotificationCenter from './NotificationCenter';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-purple-900/50 dark:to-blue-900/50 shadow-lg border-b-4 border-purple-200 dark:border-purple-600 px-4 md:px-6 py-3 md:py-4 relative overflow-hidden transition-colors duration-500 z-header">
      {/* Decorative Elements */}
      <div className="absolute top-2 right-20 text-3xl opacity-30 dark:opacity-20 animate-pulse-slow">✨</div>
      <div className="absolute top-1 left-1/3 text-2xl opacity-30 dark:opacity-20 animate-bounce-slow">🌟</div>
      
      <div className="flex items-center justify-between relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className={`md:hidden p-3 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 rounded-2xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm ${
            sidebarOpen ? 'rotate-90 scale-110' : 'rotate-0'
          }`}
        >
          <Menu className="w-6 h-6 transition-transform duration-300" />
        </button>
        
        {/* Search */}
        <div className="flex-1 max-w-sm md:max-w-md ml-2 md:ml-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 Search for fun courses, games, or ask AI tutor..."
              className="w-full pl-12 pr-4 py-3 border-3 border-purple-300 dark:border-purple-500 rounded-2xl focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700/80 text-gray-900 dark:text-white transition-all duration-300 text-lg font-medium shadow-lg placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl">🎯</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 rounded-2xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 shadow-lg bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-1">
              {theme === 'light' ? (
                <>
                  <Moon className="w-6 h-6" />
                  <span className="text-lg">🌙</span>
                </>
              ) : (
                <>
                  <Sun className="w-6 h-6" />
                  <span className="text-lg">☀️</span>
                </>
              )}
            </div>
          </button>

          {/* Notifications */}
          <NotificationCenter />

          {/* User Profile */}
          <div className="flex items-center space-x-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border-2 border-purple-200 dark:border-purple-600">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover border-3 border-purple-300 dark:border-purple-600"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">🌟</span>
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-xl mr-2">
                  {user?.role === 'student' ? '🎓' : 
                   user?.role === 'teacher' ? '👨‍🏫' : 
                   user?.role === 'parent' ? '👨‍👩‍👧‍👦' : '⚙️'}
                </span>
                {user?.name}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-300 font-bold capitalize flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Super {user?.role}!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Progress Bar */}
      <div className="hidden md:block mt-3 md:mt-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-2 md:p-3 shadow-lg border-2 border-purple-200 dark:border-purple-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-purple-600 dark:text-purple-300 flex items-center">
            <span className="text-lg mr-2">🏆</span>
            Daily Learning Progress
          </span>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-300">75% Complete!</span>
        </div>
        <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1" style={{ width: '75%' }}>
            <span className="text-xs">🌟</span>
          </div>
        </div>
      </div>
    </header>
  );
}