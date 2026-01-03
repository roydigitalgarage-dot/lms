import React from 'react';
import { Users, GraduationCap, Calendar, TrendingUp, MessageCircle, Bell, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ParentDashboard() {
  const stats = [
    { label: '👶 Children', value: '2', icon: Users, color: 'from-blue-400 to-purple-500' },
    { label: '📚 Total Courses', value: '12', icon: GraduationCap, color: 'from-green-400 to-blue-500' },
    { label: '📅 Upcoming Events', value: '5', icon: Calendar, color: 'from-purple-400 to-pink-500' },
    { label: '📈 Average Grade', value: '88%', icon: TrendingUp, color: 'from-orange-400 to-yellow-500' },
  ];

  const children = [
    { name: 'Alex Johnson', grade: '2nd Grade', avgGrade: 'A', attendance: 95, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { name: 'Emma Johnson', grade: '4th Grade', avgGrade: 'B+', attendance: 92, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }
  ];

  const recentUpdates = [
    { child: 'Alex', update: 'Math Quiz - 95%', time: '2 hours ago', type: 'grade' },
    { child: 'Emma', update: 'Science Project Submitted', time: '1 day ago', type: 'assignment' },
    { child: 'Alex', update: 'Parent-Teacher Meeting Scheduled', time: '2 days ago', type: 'meeting' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 text-white rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">👨👩👧👦</span>
              Hello, Michael!
            </h1>
            <p className="text-purple-100 text-xl">Stay connected with your children's learning journey</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="font-bold">Engaged Parent Award</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <Bell className="w-12 h-12 mb-3 mx-auto" />
              <p className="text-lg font-bold text-center">📢 2 New</p>
              <p className="text-sm text-center">Updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isChildren = stat.label.includes('Children');
          
          const StatCard = (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-purple-200 dark:border-purple-600 transform hover:scale-105 transition-all duration-300">
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
          
          return isChildren ? (
            <Link key={stat.label} to="/children" className="block">
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
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600">
            <div className="p-6 border-b-4 border-blue-200 dark:border-blue-600 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-3xl mr-3">👶</span>
                My Children
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {children.map((child, index) => (
                <Link key={index} to="/children" className="block">
                  <div className="flex items-center space-x-6 p-6 rounded-3xl border-3 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800/80 dark:to-purple-900/20 transform hover:scale-105">
                    <img src={child.avatar} alt={child.name} className="w-16 h-16 rounded-full border-4 border-purple-300" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{child.name}</h3>
                      <p className="text-purple-600 dark:text-purple-400 font-bold">{child.grade}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Grade</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{child.avgGrade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Attendance</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{child.attendance}%</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
            <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-2">📋</span>
                Recent Updates
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600">
                  <div className={`p-3 rounded-full text-2xl ${
                    update.type === 'grade' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    update.type === 'assignment' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {update.type === 'grade' ? '📊' : update.type === 'assignment' ? '📝' : '👥'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{update.update}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">{update.child}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-orange-200 dark:border-orange-600">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/children"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">👶 View Children</span>
                </Link>
                <Link
                  to="/messages"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">💬 Messages</span>
                </Link>
                <Link
                  to="/calendar"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Calendar className="w-6 h-6" />
                  <span className="font-bold text-lg">📅 Calendar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}