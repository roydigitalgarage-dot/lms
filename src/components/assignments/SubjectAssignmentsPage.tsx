import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Calendar, Star, ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export default function SubjectAssignmentsPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const subjectData = {
    telugu: { name: 'Telugu', emoji: '🅰️', color: 'from-orange-400 to-yellow-500' },
    hindi: { name: 'Hindi', emoji: '🇮🇳', color: 'from-red-400 to-pink-500' },
    english: { name: 'English', emoji: '🇬🇧', color: 'from-blue-400 to-purple-500' },
    mathematics: { name: 'Math', emoji: '🔢', color: 'from-green-400 to-blue-500' }, // URL param might be 'mathematics' or 'math'
    math: { name: 'Math', emoji: '🔢', color: 'from-green-400 to-blue-500' },
    science: { name: 'Science', emoji: '🔬', color: 'from-purple-400 to-pink-500' },
    social: { name: 'Social Studies', emoji: '🌍', color: 'from-yellow-400 to-orange-500' },
    evs: { name: 'EVS', emoji: '🌱', color: 'from-green-400 to-teal-500' }
  };

  // Safe fallback for subject
  const subjectKey = subjectId?.toLowerCase() || 'english';
  const subject = subjectData[subjectKey as keyof typeof subjectData] || subjectData.english;

  useEffect(() => {
    fetchAssignments();
  }, [subjectId, subject.name]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await api.fetch('/api/assignments');
      const allAssignments = await response.json() as any[];
      
      // Filter for current subject (case-insensitive check) and specifically Class 2
      const subjectAssignments = allAssignments.filter((a: any) => 
        a.class === 'class2' && 
        a.subject.toLowerCase() === subject.name.toLowerCase()
      );
      
      setAssignments(subjectAssignments);
    } catch (error) {
      console.error('Failed to fetch assignments', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'pending') return assignment.status !== 'completed';
    if (filter === 'submitted') return assignment.status === 'completed';
    if (filter === 'graded') return assignment.grade !== undefined; // Check if grade exists
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-400 to-pink-500 text-white';
      case 'medium': return 'from-yellow-400 to-orange-500 text-white';
      case 'low': return 'from-green-400 to-blue-500 text-white';
      default: return 'from-gray-400 to-gray-500 text-white';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return <Layout><div className="flex justify-center items-center h-64">Loading...</div></Layout>;
  }
  return (
    <Layout>
      <div className="space-y-6 relative overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce pointer-events-none">{subject.emoji}</div>
        <div className="absolute top-20 left-4 text-3xl opacity-30 animate-pulse pointer-events-none">⭐</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-30 animate-bounce pointer-events-none">🏆</div>

        {/* Header */}
        <div className={`bg-gradient-to-r ${subject.color} text-white rounded-3xl p-8 shadow-2xl border-4 border-white relative overflow-hidden`}>
          <div className="absolute top-4 right-4 text-6xl opacity-30 animate-spin" style={{ animationDuration: '10s' }}>{subject.emoji}</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-30 animate-bounce">✨</div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <Link
                to="/assignments"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 mb-4 inline-flex"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">📚 Back to All Subjects</span>
              </Link>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{subject.emoji}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold flex items-center">
                    {subject.name} Assignments!
                  </h1>
                  <p className="text-white/90 text-xl font-medium">Complete your {subject.name} tasks! 🌟</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-110 transition-transform duration-300">
                <div className="text-6xl mb-3 text-center">📝</div>
                <p className="text-lg font-bold text-center">Learn</p>
                <p className="text-sm text-center">& Practice!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border-4 border-purple-200 dark:border-purple-700 rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🌟 All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                filter === 'pending' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              ⏰ To Do
            </button>
            <button
              onClick={() => setFilter('submitted')}
              className={`px-4 py-2 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                filter === 'submitted' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              ✅ Done
            </button>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-700 overflow-hidden">
          <div className="p-6 border-b-4 border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="text-3xl mr-3">{subject.emoji}</span>
              {subject.name} Assignments
            </h2>
          </div>
          
          <div className="divide-y-4 divide-purple-100 dark:divide-purple-800">
            {filteredAssignments.map((assignment) => {
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);
              
              return (
                <div key={assignment._id || assignment.id} className="p-6 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/10 dark:hover:to-pink-900/10 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {assignment.unit || '1'}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {assignment.title}
                          </h3>
                          <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">Unit {assignment.unit || '1'}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-2xl text-sm font-bold bg-gradient-to-r ${getPriorityColor(assignment.priority || 'medium')} shadow-lg`}>
                          {(assignment.priority || 'medium') === 'high' ? '🔥 Important!' :
                           (assignment.priority || 'medium') === 'medium' ? '⚡ Medium!' : '😊 Easy!'}
                        </span>
                        {assignment.status === 'completed' && (
                          <span className="px-4 py-2 rounded-2xl text-sm font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
                            ✅ Completed!
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed">{assignment.description}</p>
                      
                      <div className="flex items-center space-x-6 text-lg text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-2xl">
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">Due: {assignment.dueDate}</span>
                          {assignment.status !== 'completed' && (
                            <span className={`ml-2 font-bold ${
                              daysUntilDue <= 1 ? 'text-red-600 dark:text-red-400' :
                              daysUntilDue <= 3 ? 'text-orange-600 dark:text-orange-400' :
                              'text-green-600 dark:text-green-400'
                            }`}>
                              ({daysUntilDue > 0 ? `${daysUntilDue} days left! ⏰` : 'Overdue! 🚨'})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 ml-6">
                      {assignment.grade && (
                        <div className="text-center bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-3xl border-3 border-purple-200 dark:border-purple-700">
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">🏆 Score</p>
                          <p className={`text-3xl font-bold ${
                            assignment.grade >= 90 ? 'text-green-600 dark:text-green-400' :
                            assignment.grade >= 80 ? 'text-blue-600 dark:text-blue-400' :
                            assignment.grade >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {assignment.grade}%
                          </p>
                          <div className="flex justify-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(assignment.grade / 20) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => {
                          if (subjectId === 'evs') {
                            if (assignment.unit === 1) navigate('/assignments/evs-body-parts');
                            else if (assignment.unit === 2) navigate('/assignments/evs-unit2-quiz');
                            else alert(`Assignment for ${subject.name} Unit ${assignment.unit} is coming soon! 🚀`);
                          } else if (subjectId === 'mathematics' || subjectId === 'math') {
                            navigate('/assignments/math-basics');
                          } else if (subjectId === 'english') {
                            navigate('/assignments/english-grammar');
                          } else if (subjectId === 'hindi') {
                            navigate('/assignments/hindi-basics');
                          } else if (subjectId === 'telugu') {
                            navigate('/assignments/telugu-basics');
                          } else {
                            alert(`Assignment for ${subject.name} is coming soon! 🚀`);
                          }
                        }}
                        className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg bg-gradient-to-r ${subject.color} text-white hover:opacity-90`}
                      >
                        {assignment.status === 'completed' ? '👀 View Work' : '🚀 Start!'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}