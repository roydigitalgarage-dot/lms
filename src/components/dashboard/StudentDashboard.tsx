import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Trophy, TrendingUp, Calendar, 
  MessageCircle, Play, FileText, CheckCircle, AlertCircle, Star, Heart, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardData {
  student: {
    name: string;
    class: string;
    email: string;
  };
  subjects: number;
  recentProgress: any[];
  upcomingAssignments: any[];
  recentGrades: any[];
  upcomingEvents: any[];
  stats: {
    completedLessons: number;
    averageGrade: number;
    totalTimeSpent: number;
  };
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data for static version
      const data = {
        student: {
          name: user?.name || 'Alex Smith',
          class: user?.class?.name || 'Class 1',
          email: user?.email || 'student@funlearning.com'
        },
        subjects: 5,
        recentProgress: [],
        upcomingAssignments: [
          {
            _id: '1',
            title: 'Math Practice',
            subject: { name: 'Math' },
            dueDate: '2024-12-20'
          },
          {
            _id: '2',
            title: 'Body Parts Quiz',
            subject: { name: 'EVS' },
            dueDate: '2024-12-18'
          }
        ],
        recentGrades: [],
        upcomingEvents: [],
        stats: {
          completedLessons: 15,
          averageGrade: 87.5,
          totalTimeSpent: 120
        }
      };
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: 'Good morning', emoji: '🌅' };
    } else if (hour >= 12 && hour < 17) {
      return { text: 'Good afternoon', emoji: '☀️' };
    } else if (hour >= 17 && hour < 22) {
      return { text: 'Good evening', emoji: '🌆' };
    } else {
      return { text: 'Good night', emoji: '🌙' };
    }
  };

  const greeting = getGreeting();

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (!dashboardData) return <div>Error loading dashboard</div>;
  
  const stats = [
    { label: '🏫 My Classroom', value: dashboardData.student.class, icon: BookOpen, color: 'from-blue-400 to-purple-500', emoji: '🏫' },
    { label: '⏰ Learning Hours', value: `${dashboardData.stats.totalTimeSpent}min`, icon: Clock, color: 'from-green-400 to-blue-500', emoji: '⏰' },
    { label: '🏆 Completed Lessons', value: dashboardData.stats.completedLessons.toString(), icon: Trophy, color: 'from-purple-400 to-pink-500', emoji: '🏆' },
    { label: '📈 Average Grade', value: `${dashboardData.stats.averageGrade.toFixed(1)}%`, icon: TrendingUp, color: 'from-yellow-400 to-orange-500', emoji: '📈' },
  ];

  const upcomingAssignments = dashboardData.upcomingAssignments.map((assignment, index) => ({
    id: assignment._id || index,
    title: `${getSubjectEmoji(assignment.subject?.name)} ${assignment.title}`,
    course: assignment.subject?.name || 'General',
    dueDate: new Date(assignment.dueDate).toLocaleDateString(),
    priority: getDaysUntilDue(assignment.dueDate) <= 2 ? 'high' : getDaysUntilDue(assignment.dueDate) <= 5 ? 'medium' : 'low',
    emoji: getSubjectEmoji(assignment.subject?.name)
  }));

  function getSubjectEmoji(subject: string) {
    const emojiMap: { [key: string]: string } = {
      'Math': '🔢',
      'Science': '🧪',
      'English': '📖',
      'Art': '🎨',
      'Music': '🎵',
      'Physical Education': '⚽',
      'Social Studies': '🌍',
      'Computer': '💻',
      'Hindi': '📚'
    };
    return emojiMap[subject] || '📝';
  }

  function getDaysUntilDue(dueDate: string) {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const recentCourses = [
    { 
      id: 1, 
      name: '🎨 Art & Creativity', 
      progress: 75, 
      image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      emoji: '🎨',
      color: 'from-pink-400 to-purple-500'
    },
    { 
      id: 2, 
      name: '📚 Fun Reading Adventures', 
      progress: 60, 
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      emoji: '📚',
      color: 'from-blue-400 to-green-500'
    },
    { 
      id: 3, 
      name: '🔬 Science Explorers', 
      progress: 40, 
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      emoji: '🔬',
      color: 'from-green-400 to-blue-500'
    },
  ];

  const upcomingClasses = [
    { id: 1, subject: '🎨 Art Time', time: '09:00 AM', room: 'Art Room 🎭', emoji: '🎨' },
    { id: 2, subject: '🔢 Math Fun', time: '11:00 AM', room: 'Math Lab 🧮', emoji: '🔢' },
    { id: 3, subject: '🌍 World Explorer', time: '02:00 PM', room: 'Discovery Room 🗺️', emoji: '🌍' },
  ];

  return (
    <div className="space-y-4 md:space-y-6 relative overflow-hidden px-2 md:px-0">
      {/* Floating Decorations - Hidden on mobile */}
      <div className="hidden md:block absolute top-0 right-0 text-6xl opacity-20 dark:opacity-10 animate-bounce-slow pointer-events-none">🎈</div>
      <div className="hidden md:block absolute top-20 left-10 text-4xl opacity-20 dark:opacity-10 animate-pulse-slow pointer-events-none">⭐</div>
      <div className="hidden md:block absolute bottom-20 right-20 text-5xl opacity-20 dark:opacity-10 animate-bounce-slow pointer-events-none">🌈</div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-green-400 dark:from-purple-600 dark:via-pink-600 dark:via-blue-600 dark:to-green-600 text-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-white dark:border-gray-600 relative overflow-hidden">
        <div className="hidden md:block absolute top-4 right-4 text-6xl opacity-30 dark:opacity-20 animate-spin-slow">🌟</div>
        <div className="hidden md:block absolute bottom-4 left-4 text-4xl opacity-30 dark:opacity-20 animate-bounce-slow">🎉</div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 flex items-center">
              <span className="text-3xl md:text-5xl mr-2 md:mr-4 animate-bounce-slow">{greeting.emoji}</span>
              <span className="hidden sm:inline">{greeting.text}, </span>{dashboardData.student.name}!
            </h1>
            <div className="flex items-center mb-3">
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center mr-4">
                <span className="text-2xl mr-2">🎓</span>
                <span className="font-bold text-lg">{dashboardData.student.class}</span>
              </div>
            </div>
            <p className="text-purple-100 dark:text-purple-200 text-base md:text-xl font-medium flex items-center">
              <span className="text-xl md:text-2xl mr-2">🚀</span>
              <span className="hidden sm:inline">Ready for another amazing learning adventure?</span>
              <span className="sm:hidden">Let's learn!</span>
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-300 dark:text-yellow-400" />
                <span className="font-bold">Level 5 Learner!</span>
              </div>
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-300 dark:text-red-400" />
                <span className="font-bold">{dashboardData.stats.completedLessons} Lessons Done</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-110 transition-all duration-300">
              <MessageCircle className="w-12 h-12 mb-3 mx-auto" />
              <p className="text-lg font-bold text-center">🤖 AI Buddy</p>
              <p className="text-sm text-center">Ready to Help!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isClassroom = stat.label.includes('My Classroom');
          
          const StatCard = (
            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-xl border-2 md:border-4 border-purple-200 dark:border-purple-600 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-1 right-1 md:top-2 md:right-2 text-2xl md:text-3xl opacity-20 dark:opacity-15">{stat.emoji}</div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg font-bold">{stat.label}</p>
                  <p className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1 md:mt-2">{stat.value}</p>
                </div>
                <div className={`p-2 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg transform hover:rotate-12 transition-all duration-300`}>
                  <Icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
              </div>
              <div className="mt-2 md:mt-4 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < 4 ? 'text-yellow-400 dark:text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" />
                ))}
              </div>
            </div>
          );
          
          return isClassroom ? (
            <Link key={stat.label} to="/courses" className="block">
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
        {/* My Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600 overflow-hidden">
            <div className="p-6 border-b-4 border-purple-200 dark:border-purple-600 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-3xl mr-3">🏫</span>
                  My Classroom
                </h2>
                <Link to="/courses" className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white px-4 py-2 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg">
                  📚 View All Subjects
                </Link>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {recentCourses.map((course) => (
                <Link key={course.id} to="/courses" className="block group">
                  <div className="flex items-center space-x-6 p-6 rounded-3xl border-3 border-gray-200 dark:border-gray-600 group-hover:border-purple-300 dark:group-hover:border-purple-500 transition-all duration-300 transform group-hover:scale-105 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800/80 dark:to-purple-900/20 backdrop-blur-sm">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-20 h-20 rounded-2xl object-cover border-3 border-purple-300"
                      />
                      <div className="absolute -top-2 -right-2 text-3xl">{course.emoji}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {course.name}
                      </h3>
                      <div className="flex items-center mt-3">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4 relative overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${course.color} h-4 rounded-full transition-all duration-500 relative`}
                            style={{ width: `${course.progress}%` }}
                          >
                            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs">⭐</div>
                          </div>
                        </div>
                        <span className="ml-4 text-lg font-bold text-purple-600 dark:text-purple-300">
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl group-hover:scale-125 transition-all duration-300">
                      🎮
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Assignments */}
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-orange-200 dark:border-orange-600">
            <div className="p-6 border-b-4 border-orange-200 dark:border-orange-600 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-2">📝</span>
                Fun Tasks Ahead!
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-700/80 dark:to-orange-900/20 border-2 border-orange-200 dark:border-orange-600 backdrop-blur-sm">
                  <div className={`p-3 rounded-full text-2xl ${
                    assignment.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                    assignment.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {assignment.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{assignment.title}</h3>
                    <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">{assignment.course}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <span className="mr-1">📅</span>
                      Due: {assignment.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Classes */}
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
            <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-2">🕐</span>
                Today's Fun Classes!
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingClasses.map((class_) => (
                <div key={class_.id} className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600 backdrop-blur-sm">
                  <div className="text-3xl">{class_.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{class_.subject}</h3>
                    <p className="text-sm text-green-600 dark:text-green-300 font-medium">{class_.time} • {class_.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Quick Fun Actions!
              </h2>
              <div className="space-y-3">
                <Link
                  to="/ai-tutor"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 text-white hover:from-blue-500 hover:to-purple-600 dark:hover:from-blue-600 dark:hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="text-2xl">🤖</span>
                  <span className="font-bold text-lg">Chat with AI Buddy</span>
                  <Sparkles className="w-6 h-6" />
                </Link>
                <Link
                  to="/calendar"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-600 text-white hover:from-green-500 hover:to-blue-600 dark:hover:from-green-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="text-2xl">📅</span>
                  <span className="font-bold text-lg">My Fun Calendar</span>
                  <Calendar className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}