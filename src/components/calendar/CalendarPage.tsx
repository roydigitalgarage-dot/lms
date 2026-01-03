import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Star, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function CalendarPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      // Mock events for static version
      const mockEvents = [
        {
          id: '1',
          title: 'Math Quiz',
          date: '2024-12-20',
          time: '10:00 AM',
          type: 'exam',
          emoji: '📝',
          color: 'from-red-400 to-pink-500'
        },
        {
          id: '2',
          title: 'Science Project',
          date: '2024-12-22',
          time: '2:00 PM',
          type: 'assignment',
          emoji: '🔬',
          color: 'from-blue-400 to-purple-500'
        },
        {
          id: '3',
          title: 'Art Competition',
          date: '2024-12-25',
          time: '11:00 AM',
          type: 'activity',
          emoji: '🎨',
          color: 'from-yellow-400 to-orange-500'
        },
        {
          id: '4',
          title: 'Parent Meeting',
          date: '2024-12-28',
          time: '3:00 PM',
          type: 'meeting',
          emoji: '👥',
          color: 'from-purple-400 to-pink-500'
        }
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const getEventEmoji = (type) => {
    const emojiMap = {
      exam: '📝',
      assignment: '📚',
      holiday: '🎉',
      meeting: '👥',
      activity: '🎯',
      announcement: '📢'
    };
    return emojiMap[type] || '📅';
  };

  const getEventTypeColor = (type) => {
    const colorMap = {
      exam: 'from-red-400 to-pink-500',
      assignment: 'from-blue-400 to-purple-500',
      holiday: 'from-green-400 to-blue-500',
      meeting: 'from-purple-400 to-pink-500',
      activity: 'from-yellow-400 to-orange-500',
      announcement: 'from-gray-400 to-gray-500'
    };
    return colorMap[type] || 'from-gray-400 to-gray-500';
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-gradient-to-r from-blue-400 to-purple-500 text-white border-blue-300';
      case 'assignment': return 'bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-300';
      case 'exam': return 'bg-gradient-to-r from-purple-400 to-blue-500 text-white border-purple-300';
      case 'study': return 'bg-gradient-to-r from-green-400 to-blue-500 text-white border-green-300';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-300';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (loading) return <Layout><div className="flex justify-center items-center h-64">Loading calendar...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
              <span className="text-5xl mr-4">📅</span>
              My Fun Calendar!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-xl font-medium flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Keep track of all your awesome activities and classes!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 overflow-hidden">
              <div className="p-6 border-b-4 border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="text-3xl mr-3">🗓️</span>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg bg-white/50 dark:bg-gray-800/50"
                    >
                      <ChevronLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </button>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg bg-white/50 dark:bg-gray-800/50"
                    >
                      <ChevronRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={day} className="p-3 text-center text-lg font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    const dayEvents = getEventsForDay(day);
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[120px] p-3 border-3 rounded-2xl transition-all duration-300 ${
                          day ? 'bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700 shadow-lg' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                        } ${isToday(day) ? 'ring-4 ring-yellow-400 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20' : ''}`}
                      >
                        {day && (
                          <>
                            <div className={`text-lg font-bold mb-2 flex items-center justify-center ${
                              isToday(day) ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'
                            }`}>
                              {isToday(day) && <span className="text-xl mr-1">🌟</span>}
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-2 rounded-xl border-2 truncate font-bold shadow-lg ${getEventColor(event.type)}`}
                                  title={event.title}
                                >
                                  <span className="text-sm mr-1">{event.emoji}</span>
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-purple-600 dark:text-purple-400 font-bold bg-purple-100 dark:bg-purple-900/20 p-1 rounded-lg text-center">
                                  +{dayEvents.length - 2} more! 🎉
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-700">
              <div className="p-6 border-b-4 border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Coming Up Soon!
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/10 border-2 border-blue-200 dark:border-blue-700">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${event.color} shadow-lg`}>
                      <span className="text-2xl">{event.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 mt-1 font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(event.date)} • {event.time}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-4">No upcoming events</p>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-700">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  This Month's Events!
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-2xl border-2 border-red-200 dark:border-red-700">
                    <span className="text-lg text-red-700 dark:text-red-300 font-bold flex items-center">
                      <span className="text-xl mr-2">📝</span>
                      Exams
                    </span>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      {events.filter(e => e.type === 'exam').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
                    <span className="text-lg text-blue-700 dark:text-blue-300 font-bold flex items-center">
                      <span className="text-xl mr-2">📚</span>
                      Assignments
                    </span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {events.filter(e => e.type === 'assignment').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl border-2 border-green-200 dark:border-green-700">
                    <span className="text-lg text-green-700 dark:text-green-300 font-bold flex items-center">
                      <span className="text-xl mr-2">🎉</span>
                      Activities
                    </span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      {events.filter(e => e.type === 'activity').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}