import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { BookOpen, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DiaryPage() {
  const { user } = useAuth();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.class?._id) {
      fetchDiaryEntries();
    }
  }, [user, selectedDate]);

  const fetchDiaryEntries = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/diary/class/${user.class._id}/date/${selectedDate}`
      );
      const data = await response.json();
      setDiaryEntries(data ? [data] : []);
    } catch (error) {
      console.error('Error fetching diary:', error);
      setDiaryEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <Layout><div className="flex justify-center items-center h-64">Loading diary...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-30 animate-bounce">📔</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-pulse">✏️</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    <span className="text-4xl mr-3">📔</span>
                    My Class Diary
                  </h1>
                  <p className="text-purple-100 text-xl font-medium">Daily updates from your teacher! 📝</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Select Date
            </h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Diary Content */}
        {diaryEntries.length > 0 ? (
          diaryEntries.map((entry, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-700 overflow-hidden">
              <div className="p-6 border-b-4 border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="text-3xl mr-3">📅</span>
                    {formatDate(entry.date)}
                  </h2>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Updated by: {entry.createdBy?.name || 'Teacher'}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Main Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="text-2xl mr-2">📖</span>
                    Today's Activities
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4">
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                {entry.subject && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="text-2xl mr-2">📚</span>
                      Subject Focus
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border-2 border-blue-200 dark:border-blue-700">
                      <p className="text-blue-700 dark:text-blue-300 font-medium text-lg">
                        {entry.subject.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Homework */}
                {entry.homework && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="text-2xl mr-2">📝</span>
                      Homework
                    </h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 border-2 border-yellow-200 dark:border-yellow-700">
                      <p className="text-yellow-700 dark:text-yellow-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {entry.homework}
                      </p>
                    </div>
                  </div>
                )}

                {/* Announcements */}
                {entry.announcements && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="text-2xl mr-2">📢</span>
                      Announcements
                    </h3>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 border-2 border-green-200 dark:border-green-700">
                      <p className="text-green-700 dark:text-green-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {entry.announcements}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="text-8xl mb-4">📔</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Diary Entry for {formatDate(selectedDate)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your teacher hasn't updated the class diary for this date yet.
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Check back later or select a different date!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}