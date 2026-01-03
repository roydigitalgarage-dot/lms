import React from 'react';
import { Users, BookOpen, TrendingUp, Clock, Calendar, MessageCircle, Award, Bell, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const stats = [
    { label: '👥 Active Students', value: '156', icon: Users, color: 'from-blue-400 to-purple-500', emoji: '👥' },
    { label: '📚 Courses Teaching', value: '4', icon: BookOpen, color: 'from-green-400 to-blue-500', emoji: '📚' },
    { label: '📊 Avg. Class Score', value: '87%', icon: TrendingUp, color: 'from-purple-400 to-pink-500', emoji: '📊' },
    { label: '⏰ Hours This Week', value: '32', icon: Clock, color: 'from-orange-400 to-yellow-500', emoji: '⏰' },
  ];

  const upcomingClasses = [
    { subject: '🔢 Math - 2nd Grade', time: '09:00 AM', room: 'Room 101', students: 25 },
    { subject: '🧪 Science - 3rd Grade', time: '11:00 AM', room: 'Lab 1', students: 22 },
    { subject: '📖 Reading - 2nd Grade', time: '02:00 PM', room: 'Room 102', students: 28 }
  ];

  const recentActivities = [
    { activity: 'Math Quiz Graded', class: '2nd Grade A', time: '2 hours ago', type: 'grade' },
    { activity: 'New Assignment Posted', class: '3rd Grade', time: '4 hours ago', type: 'assignment' },
    { activity: 'Parent Message Received', class: 'Alex Johnson', time: '1 day ago', type: 'message' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl border-4 border-white dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">👩🏫</span>
              Welcome back, Dr. Wilson!
            </h1>
            <p className="text-green-100 text-xl font-medium">Ready to inspire minds today? 🌟</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="font-bold">Excellence Award Winner</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <Bell className="w-12 h-12 mb-3 mx-auto" />
              <p className="text-lg font-bold text-center">📢 3 New</p>
              <p className="text-sm text-center">Notifications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isStudents = stat.label.includes('Students');
          
          const StatCard = (
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-green-200 dark:border-green-600 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-bold">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
          
          return isStudents ? (
            <Link key={stat.label} to="/students" className="block">
              {StatCard}
            </Link>
          ) : (
            <div key={stat.label}>
              {StatCard}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800/90 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600">
            <div className="p-6 border-b-4 border-blue-200 dark:border-blue-600 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-3xl mr-3">📅</span>
                Today's Classes
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center space-x-6 p-6 rounded-3xl border-3 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800/80 dark:to-blue-900/20">
                  <div className="text-4xl">🏫</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{class_.subject}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <p className="text-blue-600 dark:text-blue-400 font-bold flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {class_.time}
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-bold">{class_.room}</p>
                      <p className="text-purple-600 dark:text-purple-400 font-bold">{class_.students} students</p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl font-bold hover:scale-105 transition-all duration-300">
                    🚀 Start Class
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800/90 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
            <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-2">📋</span>
                Recent Activities
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600">
                  <div className={`p-3 rounded-full text-2xl ${
                    activity.type === 'grade' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'assignment' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'grade' ? '📊' : activity.type === 'assignment' ? '📝' : '💬'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activity.activity}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">{activity.class}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/90 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/students"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">👥 Manage Students</span>
                </Link>
                <Link
                  to="/analytics"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-bold text-lg">📊 View Analytics</span>
                </Link>
                <Link
                  to="/calendar"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Calendar className="w-6 h-6" />
                  <span className="font-bold text-lg">📅 Schedule</span>
                </Link>
                <Link
                  to="/question-paper"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FileText className="w-6 h-6" />
                  <span className="font-bold text-lg">📝 Question Paper</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}