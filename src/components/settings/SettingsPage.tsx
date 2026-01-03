import React from 'react';
import Layout from '../layout/Layout';
import { User, Bell, Shield, Palette, Globe, HelpCircle, Star, Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const settingSections = [
    {
      title: '👤 My Profile',
      icon: User,
      color: 'from-blue-400 to-purple-500',
      items: [
        { label: 'Personal Info', description: 'Update your name, email, and fun profile picture! 📸', emoji: '📝' },
        { label: 'Learning Info', description: 'Manage your favorite subjects and learning goals! 🎯', emoji: '📚' },
        { label: 'Privacy Settings', description: 'Control who can see your awesome progress! 🔒', emoji: '🛡️' }
      ]
    },
    {
      title: '🔔 Fun Notifications',
      icon: Bell,
      color: 'from-green-400 to-blue-500',
      items: [
        { label: 'Email Updates', description: 'Get exciting updates about new assignments and grades! 📧', emoji: '📧' },
        { label: 'Push Alerts', description: 'Receive fun alerts and reminders on your device! 📱', emoji: '📱' },
        { label: 'Calendar Reminders', description: 'Never miss your favorite classes and activities! ⏰', emoji: '⏰' }
      ]
    },
    {
      title: '🛡️ Safety & Security',
      icon: Shield,
      color: 'from-purple-400 to-pink-500',
      items: [
        { label: 'Change Password', description: 'Keep your account super safe with a new password! 🔐', emoji: '🔐' },
        { label: 'Extra Security', description: 'Add extra protection to your learning account! 🛡️', emoji: '🛡️' },
        { label: 'Login History', description: 'See when and where you logged into your account! 👀', emoji: '👀' }
      ]
    },
    {
      title: '🎨 Make It Pretty',
      icon: Palette,
      color: 'from-pink-400 to-red-500',
      items: [
        { label: 'Theme Colors', description: 'Choose between bright day mode and cozy night mode! 🌙', emoji: '🌈' },
        { label: 'Language Fun', description: 'Select your favorite language for learning! 🌍', emoji: '🌍' },
        { label: 'Display Magic', description: 'Customize fonts and colors to make learning more fun! ✨', emoji: '✨' }
      ]
    }
  ];

  return (
    <Layout>
      <div className="space-y-6 relative overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute top-0 right-0 text-6xl opacity-20 animate-bounce pointer-events-none">⚙️</div>
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-pulse pointer-events-none">⭐</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-bounce pointer-events-none">🌟</div>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
            <span className="text-5xl mr-4">⚙️</span>
            My Fun Settings!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-xl font-medium flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            Make your learning experience exactly how you like it!
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-4xl opacity-30 animate-pulse">✨</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-30 animate-bounce">🎈</div>
          
          <div className="flex items-center space-x-6 relative z-10">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-300 dark:border-purple-600 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-lg">🌟</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-4xl mr-3">
                  {user?.role === 'student' ? '🎓' : 
                   user?.role === 'teacher' ? '👨‍🏫' : 
                   user?.role === 'parent' ? '👨‍👩‍👧‍👦' : '⚙️'}
                </span>
                {user?.name}
              </h2>
              <p className="text-xl text-purple-600 dark:text-purple-400 font-medium">{user?.email}</p>
              <p className="text-lg text-blue-600 dark:text-blue-400 capitalize font-bold flex items-center mt-2">
                <Star className="w-5 h-5 mr-2" />
                Super {user?.role}!
                <Heart className="w-5 h-5 ml-2 text-red-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className={`p-6 border-b-4 border-purple-200 dark:border-purple-700 bg-gradient-to-r ${section.color} text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/10 border-2 border-purple-200 dark:border-purple-700 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{item.emoji}</div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.label}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">{item.description}</p>
                        </div>
                      </div>
                      {section.title === '🎨 Make It Pretty' && item.label === 'Theme Colors' ? (
                        <button
                          onClick={toggleTheme}
                          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors transform hover:scale-110 duration-300 shadow-lg ${
                            theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                              theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
                            }`}
                          >
                            <span className="flex items-center justify-center h-full text-sm">
                              {theme === 'dark' ? '🌙' : '☀️'}
                            </span>
                          </span>
                        </button>
                      ) : (
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-bold py-2 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                          🎯 Setup
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help & Support */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-700 overflow-hidden">
          <div className="p-6 border-b-4 border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-400 to-green-500 text-white">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="text-3xl mr-3">🆘</span>
              Need Help? We're Here!
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10 border-2 border-blue-200 dark:border-blue-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">❓</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Help Center</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Find answers to all your questions! 🤔</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-lg font-bold py-2 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                🚀 Visit
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-2 border-purple-200 dark:border-purple-700 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">💬</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Chat with Us</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Talk to our friendly support team! 😊</p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-bold py-2 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                💬 Chat
              </button>
            </div>
          </div>
        </div>

        {/* Fun Achievement Section */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl shadow-xl border-4 border-white p-8 text-white text-center">
          <div className="text-8xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-4">🌟 You're Awesome! 🌟</h2>
          <p className="text-xl mb-6">Keep exploring and learning new things every day!</p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <p className="font-bold">Goal Setter</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌟</div>
              <p className="font-bold">Star Learner</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <p className="font-bold">Future Leader</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}