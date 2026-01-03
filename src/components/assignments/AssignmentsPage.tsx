import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Filter, Star, Trophy, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export default function AssignmentsPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch dynamic data from our mock API service
      // We pass 'class2' to filter assignments specifically for Class 2
      const [classesResponse, assignmentsResponse] = await Promise.all([
        api.fetch('/api/classes'),
        api.fetch('/api/assignments')
      ]);

      const classesData = await classesResponse.json();
      const assignmentsData = await assignmentsResponse.json();

      // Get subjects from Class 2
      const class2Subjects = classesData.find(c => c._id === 'class2')?.subjects || [];

      // Filter assignments for Class 2
      const class2Assignments = assignmentsData.filter(a => a.class === 'class2');

      // Map subjects to the view format
      const dynamicSubjects = class2Subjects.map(subName => {
        const count = class2Assignments.filter(a => a.subject === subName).length;
        return {
          id: subName.toLowerCase(), // e.g. 'telugu'
          name: subName,
          assignments: count,
          emoji: getSubjectEmoji(subName),
          color: getSubjectColor(subName)
        };
      });

      setSubjects(dynamicSubjects);
      setAssignments(class2Assignments);
      setGrades([]); // Grades can be fetched similarly if needed
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
      'Hindi': 'from-red-400 to-pink-500',
      'Telugu': 'from-orange-400 to-yellow-500'
    };
    return colorMap[name] || 'from-gray-400 to-gray-500';
  };

  const oldAssignments = [
    {
      id: 1,
      title: '🌱 EVS: Our Body Parts',
      course: 'Environmental Studies 🌍',
      dueDate: '2025-01-28',
      submitted: false,
      grade: null,
      priority: 'high',
      description: 'Learn about internal and external organs of our body through fun activities!',
      attachments: ['body_parts_worksheet.pdf'],
      emoji: '🌱',
      color: 'from-green-400 to-blue-500',
      questions: {
        sectionA: [
          {
            question: 'Which is an internal organ?',
            options: ['skin', 'eyes', 'lungs'],
            correct: 2
          },
          {
            question: 'Which is an external organ?',
            options: ['stomach', 'kidneys', 'ears'],
            correct: 2
          },
          {
            question: 'Brain helps us to .......................... .......................... and .',
            options: ['think', 'act', 'both of these'],
            correct: 2
          }
        ],
        sectionB: [
          'What are sense organs?',
          'Name some external organs.',
          'What do we do with our eyes?',
          'What is the function of heart?'
        ],
        sectionC: {
          words: ['nose', 'five', 'kidney', 'brain'],
          blanks: [
            'We have _____________ sense organs.',
            '_____________ helps me to smell things.',
            '_____________ is located inside our head.',
            '_____________ is the internal organ.'
          ]
        }
      }
    },
    {
      id: 2,
      title: '🧪 Amazing Science Lab Report',
      course: 'Science Adventures 🔬',
      dueDate: '2025-01-25',
      submitted: false,
      grade: null,
      priority: 'high',
      description: 'Create a super cool report about your science experiments with colorful pictures!',
      attachments: ['lab_data.xlsx', 'fun_video.mp4'],
      emoji: '🧪',
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 3,
      title: '🔢 Math Magic Problems',
      course: 'Number Adventures 🧮',
      dueDate: '2025-01-27',
      submitted: false,
      grade: null,
      priority: 'medium',
      description: 'Solve 10 magical math problems and discover the hidden treasure!',
      attachments: ['math_treasure_map.pdf'],
      emoji: '🔢',
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 4,
      title: '📖 Creative Story Writing',
      course: 'Story Adventures 📚',
      dueDate: '2025-01-30',
      submitted: false,
      grade: null,
      priority: 'low',
      description: 'Write an amazing story about your favorite animal going on an adventure!',
      attachments: ['story_ideas.pdf', 'character_sheet.pdf'],
      emoji: '📖',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 5,
      title: '🎨 Art Masterpiece',
      course: 'Creative Arts 🎭',
      dueDate: '2025-01-20',
      submitted: true,
      grade: 95,
      priority: 'medium',
      description: 'Create a beautiful artwork using your favorite colors and shapes!',
      attachments: ['art_guide.pdf'],
      emoji: '🎨',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 6,
      title: '🌍 World Explorer Quiz',
      course: 'Geography Fun 🗺️',
      dueDate: '2025-01-18',
      submitted: true,
      grade: 88,
      priority: 'high',
      description: 'Take a fun quiz about different countries and their amazing cultures!',
      attachments: [],
      emoji: '🌍',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const totalAssignments = assignments?.length || 0;
  const completedAssignments = assignments?.filter(a => 
    a.submissions?.some(s => s.student === user?.id)
  ).length || 0;
  const pendingAssignments = totalAssignments - completedAssignments;
  const avgScore = grades?.length > 0 ? 
    Math.round(grades.reduce((sum, g) => sum + (g.score || 0), 0) / grades.length) : 0;

  if (loading) return <Layout><div className="flex justify-center items-center h-64">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6 relative overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute top-0 right-0 text-6xl opacity-20 animate-bounce pointer-events-none">📝</div>
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-pulse pointer-events-none">⭐</div>
        <div className="absolute bottom-20 right-20 text-5xl opacity-20 animate-bounce pointer-events-none">🏆</div>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-green-400 text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-4 right-4 text-6xl opacity-30 animate-spin" style={{ animationDuration: '10s' }}>📚</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-bounce">✨</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    <span className="text-4xl mr-3">📚</span>
                    My Subject Assignments!
                  </h1>
                  <p className="text-purple-100 text-xl font-medium">Choose a subject to see assignments! 🌟</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-300" />
                  <span className="font-bold">Fun Learning!</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-300" />
                  <span className="font-bold">Easy Tasks</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-110 transition-transform duration-300">
                <div className="text-6xl mb-3 text-center">🏆</div>
                <p className="text-lg font-bold text-center">Complete</p>
                <p className="text-sm text-center">& Win!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">📚 Total Tasks</p>
                <p className="text-4xl font-bold mt-2">{totalAssignments}</p>
              </div>
              <div className="text-6xl opacity-30">📝</div>
            </div>
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" />
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">⏰ To Do</p>
                <p className="text-4xl font-bold mt-2 text-yellow-200">
                  {pendingAssignments}
                </p>
              </div>
              <div className="text-6xl opacity-30">⏰</div>
            </div>
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" />
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">✅ Completed</p>
                <p className="text-4xl font-bold mt-2 text-green-200">
                  {completedAssignments}
                </p>
              </div>
              <div className="text-6xl opacity-30">✅</div>
            </div>
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" />
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl p-6 shadow-xl border-4 border-white text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold opacity-90">🌟 Avg Score</p>
                <p className="text-4xl font-bold mt-2 text-purple-200">
                  {avgScore}%
                </p>
              </div>
              <div className="text-6xl opacity-30">🏆</div>
            </div>
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" />
              ))}
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects?.map((subject) => (
            <Link
              key={subject.id}
              to={`/assignments/${subject.id}`}
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
                      <p className="text-lg opacity-90">Assignments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                      <span className="font-bold">{subject.assignments} Tasks</span>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 inline-flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span className="font-bold">Click to View!</span>
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
            My Assignment Journey!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-6 border-3 border-blue-200 dark:border-blue-700">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{subjects?.length || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Subjects</div>
            </div>
            <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-2xl p-6 border-3 border-green-200 dark:border-green-700">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalAssignments}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Assignments</div>
            </div>
            <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border-3 border-purple-200 dark:border-purple-700">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{avgScore}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}