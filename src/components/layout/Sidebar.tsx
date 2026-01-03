import React from 'react';
import { 
  Home, BookOpen, FileText, Calendar, GraduationCap, 
  Settings, LogOut, MessageCircle, BarChart3, Users,
  Shield, FileBarChart, Star, Heart, Sparkles, X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: '🏠 My Dashboard', path: '/', emoji: '🏠' },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { icon: BookOpen, label: '📚 My Courses', path: '/courses', emoji: '📚' },
          { icon: FileText, label: '📝 Assignments', path: '/assignments', emoji: '📝' },
          { icon: GraduationCap, label: '🏆 My Grades', path: '/grades', emoji: '🏆' },
          { icon: Calendar, label: '📅 Calendar', path: '/calendar', emoji: '📅' },
          { icon: BookOpen, label: '📔 My Diary', path: '/diary', emoji: '📔' },
          { icon: MessageCircle, label: '🤖 AI Tutor', path: '/ai-tutor', emoji: '🤖' },
        ];
      
      case 'teacher':
        return [
          ...baseItems,
          { icon: BookOpen, label: '📖 My Classes', path: '/courses', emoji: '📖' },
          { icon: Users, label: '👥 Students', path: '/students', emoji: '👥' },
          { icon: FileText, label: '📋 Assignments', path: '/assignments', emoji: '📋' },
          { icon: BarChart3, label: '📊 Analytics', path: '/analytics', emoji: '📊' },
          { icon: Calendar, label: '🗓️ Schedule', path: '/calendar', emoji: '🗓️' },
        ];
      
      case 'parent':
        return [
          ...baseItems,
          { icon: Users, label: '👶 My Children', path: '/children', emoji: '👶' },
          { icon: GraduationCap, label: '📊 Report Cards', path: '/report-cards', emoji: '📊' },
          { icon: Calendar, label: '📅 School Calendar', path: '/school-calendar', emoji: '📅' },
          { icon: MessageCircle, label: '💬 Communication', path: '/communication', emoji: '💬' },
        ];
      
      case 'administrator':
        return [
          ...baseItems,
          { icon: Users, label: '👤 Users', path: '/users', emoji: '👤' },
          { icon: FileText, label: '👥 User Creation', path: '/bulk-upload', emoji: '👥' },
          { icon: Users, label: '👨👩👧👦 Parent Management', path: '/parent-management', emoji: '👨👩👧👦' },
          { icon: BookOpen, label: '📚 Courses', path: '/courses', emoji: '📚' },
          { icon: BarChart3, label: '📊 Analytics', path: '/analytics', emoji: '📊' },
          { icon: FileBarChart, label: '📋 Reports', path: '/reports', emoji: '📋' },
          { icon: Shield, label: '⚙️ Settings', path: '/system', emoji: '⚙️' },
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-overlay md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed md:relative inset-y-0 left-0 z-sidebar w-64 md:w-56 bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-purple-900/30 dark:to-blue-900/30 shadow-2xl border-r-4 border-purple-200 dark:border-purple-600 flex flex-col overflow-y-auto transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 text-6xl opacity-20 dark:opacity-10 transform rotate-12 animate-spin-slow">🌟</div>
      <div className="absolute bottom-20 left-0 text-4xl opacity-20 dark:opacity-10 transform -rotate-12 animate-bounce-slow">🎈</div>
      
      {/* Logo */}
      <div className="p-6 border-b-3 border-purple-200 dark:border-purple-600 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-gray-700 dark:to-purple-800/50 relative">
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden p-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
        >
          <X className="w-5 h-5 transition-transform duration-300" />
        </button>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🌟 Vijay School
            </h1>
            <p className="text-sm text-purple-600 dark:text-purple-300 font-bold capitalize flex items-center">
              <span className="text-lg mr-1">
                {user?.role === 'student' ? '🎓' : 
                 user?.role === 'teacher' ? '👨‍🏫' : 
                 user?.role === 'parent' ? '👨‍👩‍👧‍👦' : '⚙️'}
              </span>
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 font-bold text-lg ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white shadow-lg scale-105 translate-x-2'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 hover:shadow-md bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm'
              }`}
            >
              <div className={`p-2 rounded-xl ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-purple-100 dark:bg-purple-800/30'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <span>{item.label}</span>
              {isActive && <Star className="w-5 h-5 text-yellow-300 dark:text-yellow-400 animate-pulse-slow" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t-3 border-purple-200 dark:border-purple-600 space-y-3 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-gray-700 dark:to-purple-800/50">
        <Link
          to="/settings"
          onClick={onClose}
          className="flex items-center space-x-4 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 font-bold bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm"
        >
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-800/30">
            <Settings className="w-5 h-5" />
          </div>
          <span>⚙️ Settings</span>
        </Link>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-4 px-4 py-3 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 font-bold bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm"
        >
          <div className="p-2 rounded-xl bg-red-100 dark:bg-red-800/30">
            <LogOut className="w-5 h-5" />
          </div>
          <span>👋 Sign Out</span>
        </button>
      </div>

      {/* Fun Elements */}
      <div className="absolute bottom-2 right-2 flex space-x-1">
        <span className="text-2xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '0s' }}>🌈</span>
        <span className="text-2xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '0.5s' }}>⭐</span>
        <span className="text-2xl animate-bounce-slow opacity-80 dark:opacity-60" style={{ animationDelay: '1s' }}>🎨</span>
      </div>
    </div>
    </>
  );
}