import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Event {
  _id: string;
  title: string;
  description: string;
  type: 'exam' | 'assignment' | 'holiday' | 'meeting' | 'activity' | 'announcement';
  date: string;
  endDate?: string;
  isAllDay: boolean;
}

const CalendarComponent: React.FC = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const response = await fetch(
        `http://localhost:5000/api/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      exam: 'bg-red-500 text-white',
      assignment: 'bg-blue-500 text-white',
      holiday: 'bg-green-500 text-white',
      meeting: 'bg-purple-500 text-white',
      activity: 'bg-orange-500 text-white',
      announcement: 'bg-gray-500 text-white'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const getEventEmoji = (type: string) => {
    const emojis = {
      exam: '📝',
      assignment: '📚',
      holiday: '🎉',
      meeting: '👥',
      activity: '🎯',
      announcement: '📢'
    };
    return emojis[type as keyof typeof emojis] || '📅';
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

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-600"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border border-gray-200 dark:border-gray-600 p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
            isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' : ''
          } ${
            isSelected ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600' : ''
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                title={event.title}
              >
                {getEventEmoji(event.type)} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) return <div className="flex justify-center items-center h-64">Loading calendar...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          {(user?.role === 'teacher' || user?.role === 'administrator') && (
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-600">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="border-t border-gray-200 dark:border-gray-600 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-2">
            {getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate).map((event, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl">{getEventEmoji(event.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No events scheduled for this date
              </p>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="border-t border-gray-200 dark:border-gray-600 p-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Event Types</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries({
            exam: '📝 Exams',
            assignment: '📚 Assignments',
            holiday: '🎉 Holidays',
            meeting: '👥 Meetings',
            activity: '🎯 Activities',
            announcement: '📢 Announcements'
          }).map(([type, label]) => (
            <div key={type} className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded ${getEventTypeColor(type).split(' ')[0]}`}></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;