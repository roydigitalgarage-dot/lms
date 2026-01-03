import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Play, Star, Heart, Smile, BookOpen, Award, Volume2, RotateCcw } from 'lucide-react';

export default function ChildrenCoursePage() {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(1);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [stars, setStars] = useState(12);

  const course = {
    id: 1,
    name: 'Fun with Reading! 📚',
    teacher: 'Ms. Sarah',
    description: 'Let\'s learn to read together with fun stories and colorful pictures!',
    progress: 60,
    totalLessons: 8,
    completedLessons: 5,
    grade: '2nd Grade',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2'
  };

  const modules = [
    {
      id: 1,
      title: '🌟 Getting Started',
      color: 'from-pink-400 to-purple-500',
      lessons: [
        { id: 1, title: 'Welcome to Reading!', duration: '3 min', completed: true, type: 'story', emoji: '👋' },
        { id: 2, title: 'Meet the Letters', duration: '5 min', completed: true, type: 'activity', emoji: '🔤' },
        { id: 3, title: 'My First Words', duration: '4 min', completed: true, type: 'game', emoji: '📝' },
      ]
    },
    {
      id: 2,
      title: '🐻 Animal Stories',
      color: 'from-green-400 to-blue-500',
      lessons: [
        { id: 4, title: 'The Happy Bear', duration: '6 min', completed: true, type: 'story', emoji: '🐻' },
        { id: 5, title: 'Bunny\'s Adventure', duration: '7 min', completed: true, type: 'story', emoji: '🐰' },
        { id: 6, title: 'Animal Sounds Game', duration: '5 min', completed: false, type: 'game', emoji: '🔊' },
      ]
    },
    {
      id: 3,
      title: '🌈 Colors and Shapes',
      color: 'from-yellow-400 to-orange-500',
      lessons: [
        { id: 7, title: 'Rainbow Story', duration: '5 min', completed: false, type: 'story', emoji: '🌈' },
        { id: 8, title: 'Shape Detective', duration: '6 min', completed: false, type: 'game', emoji: '🔍' },
      ]
    }
  ];

  const currentLesson = modules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.id === activeLesson);

  const completeActivity = (activityId: number) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      setStars(stars + 2);
    }
  };

  const readingContent = {
    1: {
      title: "Welcome to Reading! 👋",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center">
            <div class="text-6xl mb-4">📚</div>
            <h2 class="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">Hello, Little Reader!</h2>
            <p class="text-lg text-purple-600 dark:text-purple-300">Welcome to our magical reading adventure!</p>
          </div>
          
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border-2 border-yellow-200 dark:border-yellow-800">
            <h3 class="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
              <span class="text-2xl mr-2">🎯</span>
              What will you learn today?
            </h3>
            <ul class="space-y-2 text-yellow-700 dark:text-yellow-300">
              <li class="flex items-center"><span class="text-xl mr-2">✨</span> How to read new words</li>
              <li class="flex items-center"><span class="text-xl mr-2">🎨</span> Fun stories with pictures</li>
              <li class="flex items-center"><span class="text-xl mr-2">🎮</span> Cool reading games</li>
              <li class="flex items-center"><span class="text-xl mr-2">⭐</span> Earn stars for learning!</li>
            </ul>
          </div>
        </div>
      `
    },
    4: {
      title: "The Happy Bear 🐻",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6">
            <div class="text-center mb-6">
              <div class="text-8xl mb-4">🐻</div>
              <h2 class="text-3xl font-bold text-green-800 dark:text-green-200">The Happy Bear</h2>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div class="text-lg leading-relaxed space-y-4 text-gray-800 dark:text-gray-200">
                <p class="flex items-start">
                  <span class="text-2xl mr-3">🌲</span>
                  <span>Once upon a time, in a <strong class="text-green-600 dark:text-green-400">green forest</strong>, lived a happy bear named <strong class="text-blue-600 dark:text-blue-400">Benny</strong>.</span>
                </p>
                
                <p class="flex items-start">
                  <span class="text-2xl mr-3">☀️</span>
                  <span>Every <strong class="text-yellow-600 dark:text-yellow-400">morning</strong>, Benny would wake up and stretch his big, furry arms.</span>
                </p>
                
                <p class="flex items-start">
                  <span class="text-2xl mr-3">🍯</span>
                  <span>He loved to eat <strong class="text-orange-600 dark:text-orange-400">honey</strong> and play with his forest friends.</span>
                </p>
                
                <p class="flex items-start">
                  <span class="text-2xl mr-3">🦋</span>
                  <span>One day, Benny met a <strong class="text-purple-600 dark:text-purple-400">butterfly</strong> who was lost.</span>
                </p>
                
                <p class="flex items-start">
                  <span class="text-2xl mr-3">❤️</span>
                  <span>"Don't worry," said Benny with a <strong class="text-red-600 dark:text-red-400">kind smile</strong>. "I will help you find your way home!"</span>
                </p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border-2 border-pink-200 dark:border-pink-800">
              <h3 class="text-lg font-bold text-pink-800 dark:text-pink-200 mb-2 flex items-center">
                <span class="text-xl mr-2">📖</span>
                New Words
              </h3>
              <div class="space-y-2">
                <span class="inline-block bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full text-sm font-medium">forest</span>
                <span class="inline-block bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full text-sm font-medium ml-2">morning</span>
                <span class="inline-block bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full text-sm font-medium">butterfly</span>
              </div>
            </div>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
              <h3 class="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                <span class="text-xl mr-2">🎨</span>
                Colors in the Story
              </h3>
              <div class="space-y-2">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-blue-700 dark:text-blue-300">Green forest</span>
                </div>
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span class="text-blue-700 dark:text-blue-300">Yellow sun</span>
                </div>
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                  <span class="text-blue-700 dark:text-blue-300">Orange honey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  const activities = [
    {
      id: 1,
      title: "Find the Animals! 🔍",
      description: "Click on all the animals you can find!",
      color: "from-green-400 to-blue-500"
    },
    {
      id: 2,
      title: "Color Match Game 🌈",
      description: "Match the colors with their names!",
      color: "from-pink-400 to-purple-500"
    },
    {
      id: 3,
      title: "Word Builder 🔤",
      description: "Build words with letter blocks!",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <Layout>
      <div className="flex gap-6 h-full">
        {/* Colorful Sidebar */}
        <div className="w-80 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <h2 className="text-lg font-bold">{course.name}</h2>
                <p className="text-purple-100 text-sm">with {course.teacher}</p>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Your Progress</span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {stars} stars
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-yellow-300 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                  style={{ width: `${course.progress}%` }}
                >
                  <span className="text-xs">🌟</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-300px)] p-4">
            {modules.map((module) => (
              <div key={module.id} className="mb-4">
                <div className={`bg-gradient-to-r ${module.color} text-white rounded-xl p-4 mb-2`}>
                  <h3 className="font-bold text-lg">{module.title}</h3>
                </div>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                        activeLesson === lesson.id 
                          ? 'bg-white dark:bg-gray-800 shadow-lg border-2 border-purple-300 dark:border-purple-600' 
                          : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          lesson.completed 
                            ? 'bg-green-100 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700' 
                            : 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600'
                        }`}>
                          {lesson.completed ? '✅' : lesson.emoji}
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold text-sm ${
                            activeLesson === lesson.id 
                              ? 'text-purple-600 dark:text-purple-400' 
                              : 'text-gray-800 dark:text-gray-200'
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                            <span className="mr-2">⏰</span>
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
          {currentLesson ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{currentLesson.emoji}</div>
                    <div>
                      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                      <p className="text-blue-100">Let's learn together!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: readingContent[activeLesson as keyof typeof readingContent]?.content || 
                    `<div class="text-center py-12">
                      <div class="text-6xl mb-4">🎮</div>
                      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Fun Activity Coming Soon!</h2>
                      <p class="text-gray-600 dark:text-gray-400">This lesson will have exciting games and activities!</p>
                    </div>` 
                  }}
                />

                {/* Interactive Activities */}
                {activeLesson === 1 && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                      <span className="text-3xl mr-2">🎮</span>
                      Fun Activities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {activities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => completeActivity(activity.id)}
                          className={`p-6 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                            completedActivities.includes(activity.id)
                              ? 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center text-2xl text-white mx-auto mb-3`}>
                            {completedActivities.includes(activity.id) ? '✅' : '🎯'}
                          </div>
                          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{activity.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                          {completedActivities.includes(activity.id) && (
                            <div className="mt-3 flex items-center justify-center text-green-600 dark:text-green-400">
                              <Award className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Completed! +2 ⭐</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completion Button */}
                {!currentLesson.completed && (
                  <div className="mt-8 text-center">
                    <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                      <span className="flex items-center">
                        <Heart className="w-6 h-6 mr-2" />
                        I Finished This Lesson!
                        <Star className="w-6 h-6 ml-2" />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">📚</div>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">Pick a lesson to start learning!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}