import React from 'react';
import Layout from '../layout/Layout';
import { BookOpen, Star, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoursesListPage() {
  const subjects = [
    { id: 'telugu', name: 'Telugu', emoji: '🅰️', color: 'from-red-400 to-pink-500' },
    { id: 'hindi', name: 'Hindi', emoji: '🇮🇳', color: 'from-orange-400 to-red-500' },
    { id: 'english', name: 'English', emoji: '🇬🇧', color: 'from-blue-400 to-purple-500' },
    { id: 'maths', name: 'Mathematics', emoji: '🔢', color: 'from-green-400 to-blue-500' },
    { id: 'science', name: 'Science', emoji: '🔬', color: 'from-purple-400 to-pink-500' },
    { id: 'social', name: 'Social Studies', emoji: '🌍', color: 'from-yellow-400 to-orange-500' },
    { id: 'evs', name: 'EVS', emoji: '🌱', color: 'from-green-400 to-teal-500' }
  ];

  return (
    <Layout>
      <div className="space-y-6 relative overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce pointer-events-none">📚</div>
        <div className="absolute top-20 left-4 text-3xl opacity-30 animate-pulse pointer-events-none">⭐</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-bounce pointer-events-none">🎓</div>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-green-400 text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-30 animate-spin" style={{ animationDuration: '10s' }}>✨</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-bounce">🚀</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    <span className="text-4xl mr-3">📚</span>
                    My Amazing Subjects!
                  </h1>
                  <p className="text-purple-100 text-xl font-medium">Choose a subject to start learning! 🌟</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="font-bold">Fun Learning!</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-300" />
                  <span className="font-bold">Easy & Exciting</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-110 transition-transform duration-300">
                <div className="text-6xl mb-3 text-center">🎓</div>
                <p className="text-lg font-bold text-center">Learn</p>
                <p className="text-sm text-center">& Grow!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/courses/${subject.id}`}
              className="group transform hover:scale-105 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${subject.color} rounded-3xl p-8 shadow-xl border-4 border-white text-white relative overflow-hidden`}>
                <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce">
                  {subject.emoji}
                </div>
                <div className="absolute bottom-4 left-4 text-3xl opacity-30 animate-pulse">
                  ✨
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">{subject.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{subject.name}</h3>
                      <p className="text-lg opacity-90">Click to explore!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                      <span className="font-bold">10 Units</span>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Fun Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-3xl mr-3">📊</span>
            My Learning Journey!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-6 border-3 border-blue-200 dark:border-blue-700">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{subjects.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Subjects to Learn</div>
            </div>
            <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-6 border-3 border-green-200 dark:border-green-700">
              <div className="text-4xl mb-2">📖</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">70</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Units</div>
            </div>
            <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border-3 border-purple-200 dark:border-purple-700">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fun Learning!</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}