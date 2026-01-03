import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { TrendingUp, Download, BookOpen, Trophy, Target, Star, Heart, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function GradesPage() {
  const { user } = useAuth();
  const [gradesData, setGradesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchGradesData();
    }
  }, [user]);

  const fetchGradesData = async () => {
    try {
      // Mock data for static version
      const mockData = {
        stats: {
          gpa: 3.8,
          totalSubjects: 7,
          completedAssignments: 23,
          averageGrade: 87
        },
        subjects: [
          { subject: { _id: '1', name: 'Mathematics' }, averageGrade: 92, assignments: 5 },
          { subject: { _id: '2', name: 'Science' }, averageGrade: 88, assignments: 4 },
          { subject: { _id: '3', name: 'English' }, averageGrade: 85, assignments: 6 },
          { subject: { _id: '4', name: 'Hindi' }, averageGrade: 90, assignments: 3 },
          { subject: { _id: '5', name: 'Social Studies' }, averageGrade: 83, assignments: 3 },
          { subject: { _id: '6', name: 'EVS' }, averageGrade: 94, assignments: 4 },
          { subject: { _id: '7', name: 'Art' }, averageGrade: 96, assignments: 2 }
        ]
      };
      setGradesData(mockData);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div className="flex justify-center items-center h-64">Loading...</div></Layout>;
  if (!gradesData) return <Layout><div className="text-center p-8">No grades data available</div></Layout>;

  const { stats, subjects } = gradesData;

  const getSubjectEmoji = (name) => {
    const emojiMap = {
      'Math': '🔢', 'Science': '🔬', 'English': '📚',
      'Art': '🎨', 'Music': '🎵', 'Physical Education': '⚽',
      'Social Studies': '🌍', 'Computer': '💻', 'Hindi': '🇮🇳'
    };
    return emojiMap[name] || '📝';
  };

  const getSubjectColor = (name) => {
    const colorMap = {
      'Math': 'from-green-400 to-blue-500', 'Science': 'from-purple-400 to-pink-500',
      'English': 'from-blue-400 to-purple-500', 'Art': 'from-pink-400 to-red-500',
      'Music': 'from-yellow-400 to-orange-500', 'Physical Education': 'from-green-400 to-teal-500',
      'Social Studies': 'from-orange-400 to-red-500', 'Computer': 'from-blue-400 to-indigo-500',
      'Hindi': 'from-red-400 to-pink-500'
    };
    return colorMap[name] || 'from-gray-400 to-gray-500';
  };

  const courses = subjects.map(subjectData => ({
    id: subjectData.subject._id,
    name: `${getSubjectEmoji(subjectData.subject.name)} ${subjectData.subject.name}`,
    instructor: 'Teacher',
    grade: subjectData.averageGrade,
    credits: 3,
    emoji: getSubjectEmoji(subjectData.subject.name),
    color: getSubjectColor(subjectData.subject.name),
    assignments: subjectData.assignments
  }));

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 dark:text-green-400';
    if (grade >= 80) return 'text-blue-600 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 97) return 'A+';
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    return 'C';
  };

  const getStarCount = (grade: number) => {
    return Math.floor(grade / 20);
  };

  return (
    <Layout>
      <div className="space-y-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
              <span className="text-5xl mr-4">🏆</span>
              My Amazing Progress!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-xl font-medium flex items-center">
              <span className="text-2xl mr-2">🌟</span>
              Look how awesome you're doing in all your subjects!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">🎯 My GPA</p>
                <p className="text-4xl font-bold mt-2">{stats.gpa}</p>
              </div>
              <div className="text-6xl opacity-30">🏆</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">📚 Fun Subjects</p>
                <p className="text-4xl font-bold mt-2">{stats.totalSubjects}</p>
              </div>
              <div className="text-6xl opacity-30">📚</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">✅ Tasks Done</p>
                <p className="text-4xl font-bold mt-2">{stats.completedAssignments}</p>
              </div>
              <div className="text-6xl opacity-30">✅</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">🌟 Avg Score</p>
                <p className="text-4xl font-bold mt-2">{stats.averageGrade}%</p>
              </div>
              <div className="text-6xl opacity-30">🌟</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 overflow-hidden">
          <div className="p-6 border-b-4 border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="text-3xl mr-3">📊</span>
              My Subject Report Cards!
            </h2>
          </div>
          
          <div className="divide-y-4 divide-purple-100 dark:divide-purple-800">
            {courses.map((course) => (
              <div key={course.id} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${course.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {course.emoji}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{course.name}</h3>
                      <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                        with {course.instructor} • {course.credits} credits
                      </p>
                    </div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/10 p-6 rounded-3xl border-3 border-purple-200 dark:border-purple-700 shadow-lg">
                    <p className={`text-4xl font-bold ${getGradeColor(course.grade)}`}>
                      {course.grade}%
                    </p>
                    <p className={`text-xl font-bold ${getGradeColor(course.grade)} mt-1`}>
                      {getGradeLetter(course.grade)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}