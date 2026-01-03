import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import ChildrenCoursePage from './ChildrenCoursePage';
import { useAuth } from '../../contexts/AuthContext';
import { Play, FileText, Clock, Users, CheckCircle, Lock } from 'lucide-react';

export default function CoursePage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading and handle any initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [courseId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
            <Link to="/courses" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Back to Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!courseId) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Course not found</p>
            <Link to="/courses" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Back to Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }


  const subjectData = {
    telugu: { name: 'Telugu', emoji: '🅰️', color: 'from-red-400 to-pink-500' },
    hindi: { name: 'Hindi', emoji: '🇮🇳', color: 'from-orange-400 to-red-500' },
    english: { name: 'English', emoji: '🇬🇧', color: 'from-blue-400 to-purple-500' },
    maths: { name: 'Mathematics', emoji: '🔢', color: 'from-green-400 to-blue-500' },
    mathematics: { name: 'Mathematics', emoji: '🔢', color: 'from-green-400 to-blue-500' },
    science: { name: 'Science', emoji: '🔬', color: 'from-purple-400 to-pink-500' },
    social: { name: 'Social Studies', emoji: '🌍', color: 'from-yellow-400 to-orange-500' },
    'social-studies': { name: 'Social Studies', emoji: '🌍', color: 'from-yellow-400 to-orange-500' },
    evs: { name: 'EVS', emoji: '🌱', color: 'from-green-400 to-teal-500' }
  };
  
  const subject = subjectData[courseId as keyof typeof subjectData] || {
    name: courseId ? courseId.charAt(0).toUpperCase() + courseId.slice(1) : 'Course',
    emoji: '📚',
    color: 'from-blue-400 to-purple-500'
  };
  
  // Check if this is a children's course
  const isChildrensCourse = courseId === '2' || (user?.role === 'student' && courseId === 'children');
  
  if (isChildrensCourse) {
    return <ChildrenCoursePage />;
  }

  const course = {
    id: courseId,
    name: `${subject.name} ${subject.emoji}`,
    instructor: 'Ms. Priya Teacher',
    description: `Learn ${subject.name} through fun activities and interactive lessons designed for young learners!`,
    progress: Math.floor(Math.random() * 100),
    totalLessons: 80,
    completedLessons: Math.floor(Math.random() * 50) + 20,
    duration: '1 Year',
    students: Math.floor(Math.random() * 200) + 50,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2'
  };

  const getVideoPath = (courseId: string, unitNumber: number) => {
    // Video mapping for all subjects
    const videoMap: { [key: string]: { [key: number]: string } } = {
      'telugu': {
        1: '/videos/Telugu/2nd class telugu Allo Neredallo అల్లో నేరెడల్లో _Bathukamma _telugu song _ Bathukamma song.mp4',
        2: '/videos/Telugu/2nd class telugu bathukamma adudham  బతుకమ్మ ఆడుదాం _ telugu Songs _  Bathukamma song _ Bathukamma.mp4',
        3: '/videos/Telugu/2nd class telugu Bathukamma perudham బతుకమ్మ పేరుద్దాం !_ Bathukamma _ bathukamma songs.mp4',
        4: '/videos/Telugu/2nd class telugu Erra dabbala bandi  ఎర్రా డబ్బల బండి _Bathukamma _ bathukamma song.mp4',
        5: '/videos/Telugu/2nd class telugu kalla gajja కాళ్ళ గజ్జా telugu rhymes.mp4',
        6: '/videos/Telugu/2nd class telugu Muthyla chmma chekka ముత్యాల చెమ్మ చెక్క  _ telugu rhymes.mp4',
        7: '/videos/Telugu/2nd class telugu O Lachha gummadi  ఓ లచ్చా గుమ్మడి _ Bathukamma _ Bathukamma song.mp4',
        8: '/videos/Telugu/2nd class telugu poyira gouramma  పోయిరా గౌరమ్మ  _ Bathukamma _ Bathukamma song.mp4',
        9: '/videos/Telugu/2nd class telugu Rangurangula pulu  రంగురంగుల పూలు _ bathukamma _ bathukamma song.mp4'
      },
      'hindi': {
        1: '/videos/Hindi/घर कविता कक्षा दो _ Ghar Kavita _ Class 2nd Poem Hindi _ New NCERT Hindi Book Poem With Music.mp4',
        2: '/videos/Hindi/चींटा चींटा _ Cheenta Cheenta Class 2 Poem_ Hindi Kavita New NCERT Hindi Book  #learnwithmusic.mp4',
        3: '/videos/Hindi/टिल्लू जी कविता _ Tillu Ji Hindi Poem Class 2 _ Chapter 7 _ New NCERT 2023 _#learnwithmusic __.mp4',
        4: '/videos/Hindi/माँ कविता कक्षा दो _ Maa Poem Hindi CLASS 2 _ NCERT NEW BOOK _ Maa Tum Kitni Bholi Bhali Hindi poem.mp4'
      },
      'english': {
        1: '/videos/English/Class 2 English (Mridang) - Syllabus Overview.mp4'
      },
      'maths': {
        1: '/videos/Mathematics/videoplayback.mp4'
      },
      'mathematics': {
        1: '/videos/Mathematics/videoplayback.mp4'
      },
      'science': {
        1: '/videos/Science/videoplayback.mp4'
      },
      'social': {
        1: '/videos/Social-Studies/videoplayback.mp4'
      },
      'social-studies': {
        1: '/videos/Social-Studies/videoplayback.mp4'
      },
      'evs': {
        1: '/videos/EVS/videoplayback.mp4',
        2: '/videos/2nd-unit.mp4',
        3: '/videos/3rd unit.mp4',
        4: '/videos/4th unit.mp4'
      }
    };
    
    return videoMap[courseId]?.[unitNumber] || null;
  };

  const getUnitTitle = (unitId: number) => {
    if (courseId === 'evs') {
      const evsUnits = [
        'About Me',
        'Uses of Body Parts',
        'Growing Older',
        'My Family',
        'Food We Eat',
        'Clothes We Wear',
        'Our Houses',
        'Safety Habits',
        'Places in My Neighbourhood',
        'Unit 10'
      ];
      return evsUnits[unitId - 1] || `Unit ${unitId}`;
    }
    return `Unit ${unitId}`;
  };

  const units = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: getUnitTitle(i + 1),
    description: `${subject.name} fundamentals and concepts`,
    videoPath: getVideoPath(courseId, i + 1),
    lessons: [
      { id: i * 8 + 1, title: `${subject.name} Basics`, duration: '15:00', completed: i < 3, type: 'video', videoPath: getVideoPath(courseId, i + 1) },
      { id: i * 8 + 2, title: 'Practice Exercises', duration: '20:00', completed: i < 2, type: 'assignment' },
      { id: i * 8 + 3, title: 'Fun Activities', duration: '12:00', completed: i < 2, type: 'reading' },
      { id: i * 8 + 4, title: 'Review & Quiz', duration: '10:00', completed: i < 1, type: 'assignment' }
    ]
  }));



  try {
    return (
      <Layout>
        <div className="flex gap-6 h-full">
          {/* Sidebar */}
          <div className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{course.name}</h2>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {units.map((unit) => (
                <Link
                  key={unit.id}
                  to={`/courses/${courseId}/unit/${unit.id}`}
                  className="block w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-r ${subject.color}`}>
                      {unit.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold truncate text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {subject.emoji} {unit.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {unit.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <div className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {unit.lessons.length} lessons
                        </div>
                        {unit.videoPath && (
                          <div className="flex items-center text-blue-600 dark:text-blue-400">
                            <Play className="w-3 h-3 mr-1" />
                            <span>Video</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {unit.lessons.some(l => l.completed) && (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className={`w-24 h-24 bg-gradient-to-r ${subject.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                <span className="text-4xl">{subject.emoji}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to {subject.name}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Select a unit from the sidebar to start learning. Each unit contains engaging lessons and activities designed just for you!
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  📚 Course Overview
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• 10 comprehensive units</li>
                  <li>• Interactive lessons and activities</li>
                  <li>• {units.filter(u => u.videoPath).length} units with video content 🎥</li>
                  <li>• Progress tracking and achievements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch (err) {
    console.error('CoursePage error:', err);
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Something went wrong loading this course.</p>
            <Link to="/courses" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Back to Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}