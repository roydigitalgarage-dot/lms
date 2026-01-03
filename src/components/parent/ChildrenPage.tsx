import React, { useState } from 'react';
import { Users, TrendingUp, Calendar, BookOpen, Award, Clock, MessageCircle } from 'lucide-react';

export default function ChildrenPage() {
  const [selectedChild, setSelectedChild] = useState(0);

  const children = [
    {
      id: 1,
      name: 'Alex Johnson',
      grade: '2nd Grade',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      overallGrade: 'A',
      attendance: 95,
      subjects: [
        { name: 'Math', grade: 'A-', progress: 88, teacher: 'Ms. Smith' },
        { name: 'Science', grade: 'A', progress: 92, teacher: 'Mr. Johnson' },
        { name: 'Reading', grade: 'A+', progress: 96, teacher: 'Ms. Davis' },
        { name: 'Art', grade: 'A', progress: 90, teacher: 'Mr. Wilson' }
      ],
      recentActivities: [
        { activity: 'Completed Math Quiz', date: '2025-01-20', score: '95%' },
        { activity: 'Science Project Submitted', date: '2025-01-19', score: 'A' },
        { activity: 'Reading Assignment', date: '2025-01-18', score: '100%' }
      ],
      upcomingEvents: [
        { event: 'Math Test', date: '2025-01-25', type: 'test' },
        { event: 'Science Fair', date: '2025-01-28', type: 'event' },
        { event: 'Parent-Teacher Meeting', date: '2025-01-30', type: 'meeting' }
      ]
    },
    {
      id: 2,
      name: 'Emma Johnson',
      grade: '4th Grade',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      overallGrade: 'B+',
      attendance: 92,
      subjects: [
        { name: 'Math', grade: 'B+', progress: 85, teacher: 'Ms. Brown' },
        { name: 'Science', grade: 'A-', progress: 89, teacher: 'Mr. Lee' },
        { name: 'English', grade: 'B', progress: 82, teacher: 'Ms. Taylor' },
        { name: 'History', grade: 'A', progress: 91, teacher: 'Mr. Clark' }
      ],
      recentActivities: [
        { activity: 'History Essay', date: '2025-01-20', score: 'A-' },
        { activity: 'Math Homework', date: '2025-01-19', score: '88%' },
        { activity: 'Science Lab Report', date: '2025-01-18', score: 'B+' }
      ],
      upcomingEvents: [
        { event: 'English Presentation', date: '2025-01-26', type: 'test' },
        { event: 'Field Trip', date: '2025-01-29', type: 'event' }
      ]
    }
  ];

  const currentChild = children[selectedChild];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="text-5xl mr-4">👶</span>
          My Children
        </h1>
        <p className="text-purple-100 text-xl">Monitor your children's academic journey</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">👨👩👧👦</span>
              Select Child
            </h2>
            <div className="space-y-3">
              {children.map((child, index) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(index)}
                  className={`w-full p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    selectedChild === index
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-800/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="text-left">
                      <p className="font-bold text-lg">{child.name}</p>
                      <p className={`text-sm ${selectedChild === index ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'}`}>
                        {child.grade}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-3/4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-blue-200 dark:border-blue-600 p-6">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={currentChild.avatar}
                alt={currentChild.name}
                className="w-20 h-20 rounded-full border-4 border-blue-300"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{currentChild.name}</h2>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-bold">{currentChild.grade}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="font-bold text-green-600 dark:text-green-400">Grade: {currentChild.overallGrade}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="font-bold text-purple-600 dark:text-purple-400">Attendance: {currentChild.attendance}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentChild.subjects.map((subject, index) => (
                <div key={index} className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-200 dark:border-blue-600">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{subject.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 my-2">{subject.grade}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold">{subject.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-green-200 dark:border-green-600">
              <div className="p-6 border-b-4 border-green-200 dark:border-green-600 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">📚</span>
                  Recent Activities
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {currentChild.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700/80 dark:to-green-900/20 border-2 border-green-200 dark:border-green-600">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{activity.activity}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">{activity.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-orange-200 dark:border-orange-600">
              <div className="p-6 border-b-4 border-orange-200 dark:border-orange-600 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="text-2xl mr-2">📅</span>
                  Upcoming Events
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {currentChild.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-700/80 dark:to-orange-900/20 border-2 border-orange-200 dark:border-orange-600">
                    <div className={`p-3 rounded-full text-2xl ${
                      event.type === 'test' ? 'bg-red-100 dark:bg-red-900/30' :
                      event.type === 'event' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      {event.type === 'test' ? '📝' : event.type === 'event' ? '🎉' : '👥'}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">{event.event}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-purple-200 dark:border-purple-600 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold">📧 Message Teacher</span>
              </button>
              <button className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span className="font-bold">📅 Schedule Meeting</span>
              </button>
              <button className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">📊 View Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}