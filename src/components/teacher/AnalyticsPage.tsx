import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Award, Calendar, Target, Brain, Zap, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [learningPatterns, setLearningPatterns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('overview');

  useEffect(() => {
    fetchAnalyticsData();
    if (user?.role === 'student') {
      fetchLearningPatterns();
    }
  }, [user]);

  const fetchAnalyticsData = async () => {
    try {
      let endpoint = '';
      if (user?.role === 'student') {
        endpoint = `/api/analytics/student/${user.id}`;
      } else if (user?.role === 'teacher') {
        endpoint = `/api/analytics/class/${user.class?._id}`;
      }
      
      if (endpoint) {
        const response = await fetch(`http://localhost:5000${endpoint}`);
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalyticsData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  const fetchLearningPatterns = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/patterns/${user.id}`);
      const data = await response.json();
      setLearningPatterns(data);
    } catch (error) {
      console.error('Error fetching learning patterns:', error);
    }
  };

  const getMockData = () => ({
    classStats: [
      { class: '2nd Grade A', students: 25, avgGrade: 87, attendance: 94 },
      { class: '2nd Grade B', students: 23, avgGrade: 82, attendance: 91 },
      { class: '3rd Grade A', students: 27, avgGrade: 89, attendance: 96 }
    ],
    subjectPerformance: [
      { subject: 'Math', avgScore: 85, improvement: '+5%', color: 'from-blue-400 to-purple-500' },
      { subject: 'Science', avgScore: 88, improvement: '+8%', color: 'from-green-400 to-blue-500' },
      { subject: 'Reading', avgScore: 92, improvement: '+3%', color: 'from-purple-400 to-pink-500' },
      { subject: 'Art', avgScore: 94, improvement: '+12%', color: 'from-pink-400 to-red-500' }
    ]
  });

  const renderLearningPatterns = () => {
    if (!learningPatterns) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600 p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            AI Learning Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <h4 className="text-lg font-bold mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Peak Study Time
              </h4>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {learningPatterns.studyPatterns.hourlyActivity.indexOf(Math.max(...learningPatterns.studyPatterns.hourlyActivity))}:00
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most active learning hour</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
              <h4 className="text-lg font-bold mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Learning Velocity
              </h4>
              <p className="text-3xl font-bold text-green-600 mb-2">{Math.round(learningPatterns.learningVelocity)}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average completion rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600 p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-green-600" />
            Personalized Recommendations
          </h3>
          <div className="space-y-3">
            {learningPatterns.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-green-50 dark:from-yellow-900/20 dark:to-green-900/20">
                <Target className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const data = analyticsData || getMockData();
  const { classStats, subjectPerformance } = data;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="text-5xl mr-4">📊</span>
              {user?.role === 'student' ? 'Learning Analytics' : 'Teaching Analytics'}
            </h1>
            <p className="text-purple-100 text-xl">
              {user?.role === 'student' ? 'Track your learning progress and patterns' : "Track your students' performance and progress"}
            </p>
          </div>
          {user?.role === 'student' && (
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="overview" className="text-gray-900">Overview</option>
              <option value="patterns" className="text-gray-900">AI Insights</option>
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-blue-200 dark:border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-bold">👥 Total Students</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">75</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-green-200 dark:border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-bold">📚 Subjects</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">4</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-purple-200 dark:border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-bold">🏆 Avg Grade</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">86%</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-orange-200 dark:border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-bold">📈 Improvement</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">+7%</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-500">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {viewType === 'patterns' && user?.role === 'student' ? (
        renderLearningPatterns()
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600">
              <div className="p-6 border-b-4 border-blue-200 dark:border-blue-600 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-3xl mr-3">🏫</span>
                  {user?.role === 'student' ? 'My Performance' : 'Class Performance'}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {classStats.map((classData, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/80 dark:to-blue-900/20 border-2 border-blue-200 dark:border-blue-600">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{classData.class}</h3>
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Students</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{classData.students}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Avg Grade</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{classData.avgGrade}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Attendance</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{classData.attendance}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
              <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-3xl mr-3">📈</span>
                  Subject Performance
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{subject.subject}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">{subject.improvement}</span>
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4 mr-4">
                        <div
                          className={`bg-gradient-to-r ${subject.color} h-4 rounded-full transition-all duration-500`}
                          style={{ width: `${subject.avgScore}%` }}
                        />
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{subject.avgScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="text-3xl mr-3">📅</span>
          Weekly Progress Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">This Week</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">87%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Average Performance</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Assignments</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">24</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Completed This Week</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
            <Award className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Top Performers</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">Students Above 90%</p>
          </div>
        </div>
      </div>
    </div>
  );
}