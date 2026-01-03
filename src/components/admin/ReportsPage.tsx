import React, { useState } from 'react';
import { FileBarChart, Download, Calendar, TrendingUp, Users, BookOpen, Award, BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: '📊 System Overview', icon: BarChart3 },
    { id: 'academic', name: '🎓 Academic Performance', icon: Award },
    { id: 'attendance', name: '📅 Attendance Report', icon: Calendar },
    { id: 'users', name: '👥 User Activity', icon: Users }
  ];

  const systemStats = [
    { label: 'Total Students', value: '1,247', change: '+12%', color: 'from-blue-400 to-purple-500' },
    { label: 'Active Teachers', value: '89', change: '+5%', color: 'from-green-400 to-blue-500' },
    { label: 'Courses Offered', value: '156', change: '+8%', color: 'from-purple-400 to-pink-500' },
    { label: 'Avg Attendance', value: '94.2%', change: '+2.1%', color: 'from-orange-400 to-yellow-500' }
  ];

  const academicData = [
    { grade: '1st Grade', students: 180, avgScore: 87, topSubject: 'Reading' },
    { grade: '2nd Grade', students: 195, avgScore: 85, topSubject: 'Math' },
    { grade: '3rd Grade', students: 210, avgScore: 89, topSubject: 'Science' },
    { grade: '4th Grade', students: 188, avgScore: 91, topSubject: 'Art' },
    { grade: '5th Grade', students: 174, avgScore: 88, topSubject: 'History' }
  ];

  const monthlyTrends = [
    { month: 'Jan', students: 1200, attendance: 92, performance: 85 },
    { month: 'Feb', students: 1215, attendance: 94, performance: 87 },
    { month: 'Mar', students: 1230, attendance: 93, performance: 86 },
    { month: 'Apr', students: 1247, attendance: 95, performance: 89 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">📋</span>
              System Reports
            </h1>
            <p className="text-indigo-100 text-xl">Comprehensive analytics and insights</p>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg">
            <Download className="w-5 h-5" />
            <span>📥 Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-indigo-200 dark:border-indigo-600 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">📊</span>
            Report Types
          </h2>
          <div className="space-y-3">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    selectedReport === report.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-800/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6" />
                    <span className="font-bold text-left">{report.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              📅 Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold"
            >
              <option value="week">📅 This Week</option>
              <option value="month">📅 This Month</option>
              <option value="quarter">📅 This Quarter</option>
              <option value="year">📅 This Year</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedReport === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemStats.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-blue-200 dark:border-blue-600">
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{stat.label}</h3>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <div className="flex items-center justify-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-1" />
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600">
                <div className="p-6 border-b-4 border-purple-200 dark:border-purple-600 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <span className="text-3xl mr-3">📈</span>
                    Monthly Trends
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {monthlyTrends.map((trend, index) => (
                      <div key={index} className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700/80 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-600">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">{trend.month}</h4>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Students</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{trend.students}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Attendance</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{trend.attendance}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Performance</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{trend.performance}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedReport === 'academic' && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
              <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-3xl mr-3">🎓</span>
                  Academic Performance by Grade
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {academicData.map((grade, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{grade.grade}</h4>
                      <span className="text-2xl">🏫</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                        <Users className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Students</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{grade.students}</p>
                      </div>
                      <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                        <Award className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Avg Score</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{grade.avgScore}%</p>
                      </div>
                      <div className="text-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Top Subject</p>
                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{grade.topSubject}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReport === 'attendance' && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-orange-200 dark:border-orange-600 p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📅</span>
                Attendance Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Overall Rate</h4>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">94.2%</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Perfect Attendance</h4>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">156</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Improvement</h4>
                  <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">+2.1%</p>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'users' && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600 p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">👥</span>
                User Activity Report
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Daily Active</h4>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">892</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Course Access</h4>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">1,247</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <FileBarChart className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Assignments</h4>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">456</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30">
                  <Award className="w-12 h-12 mx-auto mb-4 text-orange-600 dark:text-orange-400" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Achievements</h4>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">89</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}