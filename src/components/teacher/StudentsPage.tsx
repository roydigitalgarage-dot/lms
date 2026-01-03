import React, { useState } from 'react';
import { Users, Search, Filter, Mail, TrendingUp, Award, Clock } from 'lucide-react';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@school.com',
      class: '2nd Grade',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      grade: 'A',
      attendance: 95,
      assignments: { completed: 18, total: 20 },
      lastActive: '2 hours ago',
      subjects: ['Math', 'Science', 'Reading']
    },
    {
      id: 2,
      name: 'Emma Davis',
      email: 'emma.davis@school.com',
      class: '2nd Grade',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      grade: 'B+',
      attendance: 88,
      assignments: { completed: 16, total: 20 },
      lastActive: '1 day ago',
      subjects: ['Math', 'Art', 'Reading']
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@school.com',
      class: '3rd Grade',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      grade: 'A-',
      attendance: 92,
      assignments: { completed: 19, total: 20 },
      lastActive: '30 minutes ago',
      subjects: ['Math', 'Science', 'History']
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="text-5xl mr-4">👥</span>
          My Students
        </h1>
        <p className="text-green-100 text-xl">Manage and track your students' progress</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-green-200 dark:border-green-600">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="pl-12 pr-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-bold"
            >
              <option value="all">📚 All Classes</option>
              <option value="2nd Grade">🎓 2nd Grade</option>
              <option value="3rd Grade">🎓 3rd Grade</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-blue-200 dark:border-blue-600 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-300"
                />
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{student.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold">{student.class}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {student.lastActive}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="font-bold text-gray-700 dark:text-gray-300">Grade</span>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">{student.grade}</span>
              </div>

              <div className="p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                    Assignments
                  </span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {student.assignments.completed}/{student.assignments.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(student.assignments.completed / student.assignments.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                📧 Message
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                📊 Progress
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}