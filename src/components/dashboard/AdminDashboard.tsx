import React from 'react';
import { Users, BookOpen, BarChart3, Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { label: '👥 Total Users', value: '2,547', icon: Users, color: 'from-blue-400 to-purple-500', change: '+12%' },
    { label: '📚 Active Courses', value: '87', icon: BookOpen, color: 'from-green-400 to-blue-500', change: '+8%' },
    { label: '📊 System Health', value: '99.2%', icon: BarChart3, color: 'from-purple-400 to-pink-500', change: '+0.3%' },
    { label: '🔒 Security Score', value: 'A+', icon: Shield, color: 'from-orange-400 to-yellow-500', change: 'Excellent' },
  ];

  const systemAlerts = [
    { type: 'success', message: 'Daily backup completed successfully', time: '2 hours ago' },
    { type: 'warning', message: 'Server load at 85% - monitoring', time: '4 hours ago' },
    { type: 'info', message: '156 new user registrations today', time: '6 hours ago' }
  ];

  const recentActivities = [
    { activity: 'New teacher account created', user: 'Dr. Sarah Wilson', time: '1 hour ago' },
    { activity: 'Course "Advanced Math" published', user: 'Admin System', time: '3 hours ago' },
    { activity: 'System maintenance completed', user: 'IT Team', time: '1 day ago' }
  ];

  const quickStats = [
    { label: 'Students', value: '1,247', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Teachers', value: '89', color: 'text-green-600 dark:text-green-400' },
    { label: 'Parents', value: '1,156', color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Admins', value: '12', color: 'text-orange-600 dark:text-orange-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">⚙️</span>
              System Overview
            </h1>
            <p className="text-gray-300 text-xl">Monitor and manage the entire learning platform</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="font-bold">All Systems Operational</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <Shield className="w-12 h-12 mb-3 mx-auto" />
              <p className="text-lg font-bold text-center">🔒 Secure</p>
              <p className="text-sm text-center">Platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isUsers = stat.label.includes('Users');
          
          const StatCard = (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-gray-200 dark:border-gray-600 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-bold">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                <span className="text-sm font-bold text-green-600 dark:text-green-400">{stat.change}</span>
              </div>
            </div>
          );
          
          return isUsers ? (
            <Link key={stat.label} to="/users" className="block">
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
                <span className="text-3xl mr-3">🚨</span>
                System Alerts
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/80 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-600">
                  <div className={`p-3 rounded-full text-2xl ${
                    alert.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                    alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {alert.type === 'success' ? '✅' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{alert.message}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
            <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-3xl mr-3">📋</span>
                Recent Activities
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600">
                  <div className="p-3 rounded-full text-2xl bg-green-100 dark:bg-green-900/30">
                    🔄
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{activity.activity}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600">
            <div className="p-6 border-b-4 border-purple-200 dark:border-purple-600 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-2">👥</span>
                User Breakdown
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700/80 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-600">
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{stat.label}</span>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-orange-200 dark:border-orange-600">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Admin Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/users"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Users className="w-6 h-6" />
                  <span className="font-bold text-lg">👤 Manage Users</span>
                </Link>
                <Link
                  to="/reports"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span className="font-bold text-lg">📋 View Reports</span>
                </Link>
                <Link
                  to="/system"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Shield className="w-6 h-6" />
                  <span className="font-bold text-lg">⚙️ Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}